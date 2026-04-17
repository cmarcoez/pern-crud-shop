import { useEffect } from "react";
import { useProductStore } from "../tienda/useProductStore";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import ProductCard from "../componentes/ProductCard";
import AddProductModal from "../componentes/AddProductModal";
function HomePage() {
  const { productos, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <main className="max-w-7xl mx-auto px-2 py-8">
      <div className="flex justify-between items-center mb-8">
        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("add_product_modal").showModal()
          }
        >
          <PlusCircleIcon className="size-5 mr-2" />
          Añadir Producto
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      <AddProductModal />

      {error && <div className="alert alert-error mb-8">{error}</div>}

      {productos.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold">
              No se han encontrado productos
            </h3>
            <p className="text-gray-500 max-w-sm">
              Empieza por añadir tu primer producto al inventario
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </main>
  );
}

export default HomePage;
