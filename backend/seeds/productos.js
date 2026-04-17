import { sql } from "../config/db.js";

const SAMPLE_PRODUCTS = [
  {
    nombre: "Premium Wireless Headphones",
    precio: 299.99,
    imagen:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
  },
  {
    nombre: "Mechanical Gaming Keyboard",
    precio: 159.99,
    imagen:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&auto=format&fit=crop&q=60",
  },
  {
    nombre: "Smart Watch Pro",
    precio: 249.99,
    imagen:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=60",
  },
  {
    nombre: "4K Ultra HD Camera",
    precio: 899.99,
    imagen:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60",
  },
  {
    nombre: "Minimalist Backpack",
    precio: 79.99,
    imagen:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60",
  },
  {
    nombre: "Wireless Gaming Mouse",
    precio: 89.99,
    imagen:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&auto=format&fit=crop&q=60",
  },
  {
    nombre: "Smart Home Speaker",
    precio: 159.99,
    imagen:
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&auto=format&fit=crop&q=60",
  },
  {
    nombre: "LED Gaming Monitor",
    precio: 449.99,
    imagen:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=60",
  },
];

async function seedDatabase() {
  try {
    // first, clear existing data
    await sql`TRUNCATE TABLE productos RESTART IDENTITY`;

    // insert all products
    for (const producto of SAMPLE_PRODUCTS) {
      await sql`
        INSERT INTO productos (nombre, precio, imagen)
        VALUES (${producto.nombre}, ${producto.precio}, ${producto.imagen})
      `;
    }

    console.log("Base de datos seeded correctamente");
    process.exit(0); // success code
  } catch (error) {
    console.error("Error seeding base de datos", error);
    process.exit(1); // failure code
  }
}

seedDatabase();
