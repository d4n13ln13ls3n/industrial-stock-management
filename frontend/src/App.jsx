import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductionPage from "./pages/ProductionPage";
import ProductsPage from "./pages/ProductsPage";
import RawMaterialsPage from "./pages/RawMaterialsPage";

function App() {
    return (
        <BrowserRouter>      
            <div>
                <nav>
                    <Link to="/">Production</Link> |{" "}
                    <Link to="/products">Products</Link> |{" "}
                    <Link to="/raw-materials">Raw Materials</Link> |{" "}
                </nav>

                <Routes>
                    <Route path="/" element={<ProductionPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/raw-materials" element={<RawMaterialsPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App
