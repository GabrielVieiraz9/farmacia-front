import "./App.css";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListaCategorias from "./components/categorias/listaCategoria/ListaCategoria";
import CriarCategoria from "./components/categorias/criarCategoria/CriarCategoria";
import DeletarCategoria from "./components/categorias/deletarCategoria/DeletarCategoria";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-[85.7vh]">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/categorias" element={<ListaCategorias />} />
            <Route path="/cadastroCategoria" element={<CriarCategoria />} />
            <Route path="/editarCategoria/:id" element={<CriarCategoria />} />
            <Route
              path="/deletarCategoria/:id"
              element={<DeletarCategoria />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
