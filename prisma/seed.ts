import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  const products = [
    {
      name: 'Custom Tailored Suit',
      description: 'A fully customizable two-piece suit. Choose your fabric, lapel style, and fit.',
      basePrice: 5000000, // IDR
    },
    {
      name: 'Classic Oxford Shirt',
      description: 'Made to measure oxford shirt. Customize collar, cuffs, and monogram.',
      basePrice: 850000,
    },
    {
      name: 'Bespoke Trousers',
      description: 'Perfectly fitted trousers with your choice of pleats, cuffs, and adjusters.',
      basePrice: 1200000,
    }
  ]

  for (const p of products) {
    const product = await prisma.product.create({
      data: p,
    })
    console.log(`Created product with id: ${product.id}`)
  }
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
