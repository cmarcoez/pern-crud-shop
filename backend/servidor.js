import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import rutasProductos from "./rutas/rutasProductos.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json()); 
app.use(cors()); 
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
); 
app.use(morgan("dev"));

// Aplicar el radio-límite de arcject a todas las rutas
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // Cada request consume 1 token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({
          error: "Muchas Requests",
        });
      } else if (decision.reason.isBot()) {
        res.status(403).json({
          error: "Acceso bot denegado",
        });
      } else {
        res.status(403).json({
          error: "Forgotten",
        });
      }
      return;
    }

    // Comprobar los spoofed bots
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed(),
      )
    ) {
      res.status(403).json({ error: "Spoofed bot detectado" });
      return;
    }

    next();
  } catch (error) {
    console.log("Arcjet error", error);
    next(error);
  }
});

// Tomar rutas de la bd
app.use("/api/productos", rutasProductos);

// Renderizar nuestro proyecto React
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("/{/*path}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// FUNCIÓN PARA CREAR NUESTRA BASE DE DATOS
async function initDB() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS productos (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            imagen VARCHAR(255) NOT NULL,
            precio DECIMAL(10, 2) NOT NULL,
            creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

    console.log("Base de datos inicializada correctamente");
  } catch (error) {
    console.log("Error initDB", error);
  }
}

// INICIALIZAR LA BASE DE DATOS EN EL PUERTO DETERMINADO
initDB().then(() => {
  app.listen(PORT, () => {
    console.log("El servidor está corriendo en el puerto " + PORT);
  });
});
