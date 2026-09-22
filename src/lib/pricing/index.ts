/**
 * Dynamic Pricing Engine
 * Runs on server-side to validate and calculate final prices.
 * This prevents client-side manipulation of cart prices.
 */

// In a real database, we would query material prices
const MATERIAL_SURCHARGES: Record<string, number> = {
  cotton: 0,
  linen: 150000,
  silk: 500000,
};

export interface PricingRequestItem {
  productId: string;
  material: string;
  quantity?: number;
}

/**
 * Calculates the total price for an array of cart items securely on the server.
 */
export async function calculateTotalPrice(items: PricingRequestItem[]): Promise<number> {
  let total = 0;

  for (const item of items) {
    // 1. Fetch base price from Database using item.productId
    // Mocking DB fetch here for the proof of concept
    const basePrice = 1250000; // Assume every product is 1.25M base price for now

    // 2. Add material surcharge
    const surcharge = MATERIAL_SURCHARGES[item.material.toLowerCase()] || 0;
    
    // 3. Add to total
    const quantity = item.quantity || 1;
    total += (basePrice + surcharge) * quantity;
  }

  return total;
}
