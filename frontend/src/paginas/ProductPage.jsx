import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../tienda/useProductStore";
import { useEffect } from "react";
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";

function ProductPage() {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  const handleDelete = async () => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      await deleteProduct(id);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-4 mr-2" />
        Volver a los productos
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IMAGEN DEL PRODUCTO */}
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          <img
            src={currentProduct?.imagen}
            alt={currentProduct?.nombre}
            className="size-full object-cover"
          />
        </div>

        {/* FORM DEL PRODUCTO */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Editar Producto</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProduct(id);
              }}
              className="space-y-6"
            >
              {/* NOMBRE DEL PRODUCTO */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Nombre del Producto
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Introduce el nombre del producto"
                  className="input input-bordered w-full"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                />
              </div>

              {/* PRECIO DEL PRODUCTO */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Precio
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full"
                  value={formData.precio}
                  onChange={(e) =>
                    setFormData({ ...formData, precio: e.target.value })
                  }
                />
              </div>

              {/* IMAGEN DEL PRODUCTO */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Imagen URL
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="https://ejemplo.com/image.jpg"
                  className="input input-bordered w-full"
                  value={formData.imagen}
                  onChange={(e) =>
                    setFormData({ ...formData, imagen: e.target.value })
                  }
                />
              </div>

              {/* BOTONES DEL FORM */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-error"
                >
                  <Trash2Icon className="size-4 mr-2" />
                  Eliminar
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    loading ||
                    !formData.nombre ||
                    !formData.precio ||
                    !formData.imagen
                  }
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="size-4 mr-2" />
                      Guardar
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductPage;
