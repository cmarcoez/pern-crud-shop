import {
  EuroIcon,
  ImageIcon,
  Package2Icon,
  PlusCircleIcon,
} from "lucide-react";
import { useProductStore } from "../tienda/useProductStore";

function AddProductModal() {
  const { addProduct, formData, setFormData, loading } = useProductStore();

  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box">
        {/* BOTÓN PARA CERRAR */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            X
          </button>
        </form>

        {/* MODAL PARA AÑADIR PTODUCTOS */}
        <h3 className="font-bold text-xl mb-8">Añadir Nuevo Producto</h3>

        <form onSubmit={addProduct} className="space-y-6">
          <div className="grid gap-6">
            {/* INPUT DEL NOMBRE DEL PRODUCTO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Nombre del Producto
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="Introduce el nombre del producto"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                />
              </div>
            </div>

            {/* INPUT DEL PRECIO DEL PRODUCTO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Precio</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <EuroIcon className="size-5" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.precio}
                  onChange={(e) =>
                    setFormData({ ...formData, precio: e.target.value })
                  }
                />
              </div>
            </div>

            {/* IMAGEN DEL PRODUCTO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Imagen URL
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <ImageIcon className="size-5" />
                </div>
                <input
                  type="text"
                  placeholder="https://ejemplo.com/image.jpg"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.imagen}
                  onChange={(e) =>
                    setFormData({ ...formData, imagen: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* BOTONES DE LA VENTANA MODAL */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost">Cancelar</button>
            </form>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={
                !formData.nombre ||
                !formData.precio ||
                !formData.imagen ||
                loading
              }
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="size-5 mr-2" />
                  Añadir Producto
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
export default AddProductModal;
