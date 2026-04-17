import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";

import "dotenv/config";

// Inicializar Arcjet
export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    // Protección de ataques comunes como SQL injection, XSS...
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      // Bloquea todos los bots excepto los motores de búsqueda
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    // Límite de radio

    tokenBucket({
      mode: "LIVE",
      refillRate: 30,
      interval: 5,
      capacity: 20,
    }),
  ],
});
