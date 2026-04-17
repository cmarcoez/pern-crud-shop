import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

// URL BASE DINÁMICA DEPENDIENDO DEL ENTORNO
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set, get) => ({
  // Estado de los productos
  productos: [],
  loading: false,
  error: null,
  currentProduct: null,

  // Estado del form
  formData: {
    nombre: "",
    precio: "",
    imagen: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { nombre: "", precio: "", imagen: "" } }),


// FUNCIÓN PARA AÑADIR PRODUCTOS
  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/productos`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Producto añadido correctamente");
      document.getElementById("add_product_modal").close();
    } catch (error) {
      console.log("Error en la función addProduct", error);
      toast.error("Algo ha ido mal");
    } finally {
      set({ loading: false });
    }
  },

// FUNCIÓN PARA CARGAR LOS PRODUCTOS
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/productos`);
      set({ productos: response.data.data, error: null });
    } catch (err) {
      if (err.status == 429)
        set({ error: "Rango límite excedido", productos: [] });
      else set({ error: "Algo ha ido mal", productos: [] });
    } finally {
      set({ loading: false });
    }
  },

// FUNCIÓN PARA ELIMINAR PRODUCTOS
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/productos/${id}`);
      set((prev) => ({
        productos: prev.productos.filter((producto) => producto.id !== id),
      }));
      toast.success("Producto eliminado exitosamente");
    } catch (error) {
      console.log("Error en la función deleteProduct", error);
      toast.error("Algo ha ido mal");
    } finally {
      set({ loading: false });
    }
  },

// FUNCIÓN PARA CARGAR UN PRODUCTO DE MANERA INDIVIDUAL
  fetchProduct: async (id) => {
    set({ loading: true });

    try {
      const response = await axios.get(`${BASE_URL}/api/productos/${id}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data, 
        error: null,
      });
    } catch (error) {
      console.log("Error en la función fetchProduct", error);
      set({ error: "Algo ha ido mal", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },

// FUNCIÓN PARA ACTUALIZAR LOS PRODUCTOS  
  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(
        `${BASE_URL}/api/productos/${id}`,
        formData,
      );
      set({ currentProduct: response.data.data });
      toast.success("Producto actualizado exitosamente");
    } catch (error) {
      toast.error("Algo ha ido mal");
      console.log("Error en la función updateProduct", error);
    } finally {
      set({ loading: false });
    }
  },
}));
