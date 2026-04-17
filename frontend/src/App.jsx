import { Routes, Route } from "react-router-dom";
import HomePage from "./paginas/HomePage";
import ProductPage from "./paginas/ProductPage";
import Navbar from "./componentes/Navbar";
import { useThemeStore } from "./tienda/useThemeStore";
import { Toaster } from "react-hot-toast";

function App() {
  const { theme } = useThemeStore();
  return (
    <div
      className="min-h-screen bg-base-200 transition-colors duration-300"
      data-theme={theme}
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/producto/:id" element={<ProductPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
