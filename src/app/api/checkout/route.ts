import { NextRequest, NextResponse } from 'next/server';
import { calculateTotalPrice, PricingRequestItem } from '@/lib/pricing';
import { snap } from '@/lib/midtrans';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, shippingDetails } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // 1. Calculate price securely on the backend
    const pricingItems: PricingRequestItem[] = items.map((item: any) => ({
      productId: item.productId,
      material: item.material,
      quantity: 1, // Defaulting to 1 as per cart structure
    }));

    const totalAmount = await calculateTotalPrice(pricingItems);

    // 2. Create Order in Database
    // Using a simple format for order items serialization since our schema is minimal
    const order = await prisma.order.create({
      data: {
        totalAmount,
        status: 'PENDING',
        paymentStatus: 'UNPAID',
        customerName: shippingDetails?.name || 'Guest',
        customerEmail: shippingDetails?.email || 'guest@example.com',
      },
    });

    // 3. Prepare Midtrans Transaction
    const transactionDetails = {
      transaction_details: {
        order_id: order.id,
        gross_amount: totalAmount,
      },
      customer_details: {
        first_name: shippingDetails?.name || 'Guest',
        email: shippingDetails?.email || 'guest@example.com',
        billing_address: {
          address: shippingDetails?.address,
          city: shippingDetails?.city,
        },
        shipping_address: {
          address: shippingDetails?.address,
          city: shippingDetails?.city,
        }
      },
      item_details: items.map((item: any) => ({
        id: item.productId || 'item_1',
        price: totalAmount / items.length, // Rough fallback, ideally each item gets calculated individually
        quantity: 1,
        name: `${item.productName} - ${item.material}`,
      }))
    };

    // 4. Create Snap Transaction
    const snapResponse = await snap.createTransaction(transactionDetails);
    
    // 5. Update Order with Token
    await prisma.order.update({
      where: { id: order.id },
      data: { snapToken: snapResponse.token }
    });

    return NextResponse.json({
      token: snapResponse.token,
      orderId: order.id,
    });
  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
