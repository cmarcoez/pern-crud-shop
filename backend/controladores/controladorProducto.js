import { sql } from "../config/db.js";


// FUNCIÓN PARA CAPTURAR LOS PRODUCTOS DE LA BASE DE DATOS
export const tomarProductos = async (req, res) => {
  try {
    const productos = await sql`
        SELECT * FROM productos
        ORDER BY creado_en DESC
        `;

    console.log("Productos captados ", productos);
    res.status(200).json({ success: true, data: productos });
  } catch (error) {
    console.log("Error en la función tomarProductos ", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

// FUNCIÓN PARA CREAR/AÑADIR PRODUCTOS
export const crearProducto = async (req, res) => {
  const { nombre, precio, imagen } = req.body;

  if (!nombre || !precio || !imagen) {
    return res
      .status(400)
      .json({ success: false, message: "Se requieren todos los campos" });
  }

  try {
    const nuevoProducto = await sql`
    INSERT INTO productos (nombre,precio,imagen)
    VALUES (${nombre},${precio},${imagen})
    RETURNING *
    `;

    res.status(201).json({ success: true, data: nuevoProducto[0] });
  } catch (error) {
    console.log("Error en la función crearProducto", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

// FUNCIÓN PARA SELECCIONAR UN PRODUCTO DE LA BASE DE DATOS
export const tomarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await sql`
        SELECT * FROM productos WHERE id=${id}
        `;

    res.status(200).json({ success: true, data: producto[0] });
  } catch (error) {
    console.log("Error en la función tomarProducto");
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

// FUNCIÓN PARA ACTUALIZAR LOS DATOS DEL PRODUCTO
export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, imagen } = req.body;

  try {
    const productoActualizado = await sql`
        UPDATE productos
        SET nombre=${nombre}, precio=${precio}, imagen=${imagen}
        WHERE id=${id}
        RETURNING *
        `;

    if (productoActualizado.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });
    }

    res.status(200).json({ success: true, data: productoActualizado[0] });
  } catch (error) {
    console.log("Error en la función actualizarProducto ", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

// FUNCIÓN PARA ELIMINAR LOS PRODUCTOS
export const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const productoEliminado = await sql`
        DELETE FROM productos WHERE id=${id} RETURNING *
        `;

    if (productoEliminado.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });
    }

    res.status(200).json({ success: true, data: productoEliminado[0] });
  } catch (error) {
    console.log("Error en la función eliminarProducto");
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};
