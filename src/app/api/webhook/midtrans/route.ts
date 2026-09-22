import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Verify Signature Key
    const { order_id, status_code, gross_amount, signature_key, transaction_status } = body;
    const serverKey = process.env.MIDTRANS_SERVER_KEY || '';
    const hash = crypto
      .createHash('sha512')
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest('hex');

    if (hash !== signature_key) {
      return NextResponse.json({ error: 'Invalid Signature' }, { status: 403 });
    }

    // 2. Update Database based on transaction status
    let paymentStatus = 'UNPAID';
    let orderStatus = 'PENDING';

    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      paymentStatus = 'PAID';
      orderStatus = 'PAYMENT_RECEIVED';
    } else if (transaction_status === 'pending') {
      paymentStatus = 'PENDING';
    } else if (
      transaction_status === 'deny' ||
      transaction_status === 'cancel' ||
      transaction_status === 'expire'
    ) {
      paymentStatus = 'FAILED';
      orderStatus = 'CANCELLED';
    }

    // Update order in database
    await prisma.order.update({
      where: { id: order_id },
      data: {
        paymentStatus,
        status: orderStatus,
      },
    });

    return NextResponse.json({ status: 'OK' });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
