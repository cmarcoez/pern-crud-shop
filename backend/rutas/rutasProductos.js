import express from "express";
import {
  tomarProductos,
  crearProducto,
  tomarProducto,
  actualizarProducto,
  eliminarProducto,
} from "../controladores/controladorProducto.js";

const router = express.Router();

router.get("/", tomarProductos); // Método GET
router.get("/:id", tomarProducto); // Método GET
router.post("/", crearProducto); // Método POST
router.put("/:id", actualizarProducto); // Método PUT
router.delete("/:id", eliminarProducto); // Método DELETE

export default router;
