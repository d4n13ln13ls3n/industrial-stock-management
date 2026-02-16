import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProductionPage from "./pages/ProductionPage";
import ProductsPage from "./pages/ProductsPage";
import RawMaterialsPage from "./pages/RawMaterialsPage";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <nav className="main-navbar">
                <div className="navbar-container">
                    <div className="logo">AutoFlex Stock</div>

                    <div className="nav-links">
                        <Link to="/" className="nav-link">Production</Link>
                        <Link to="/products" className="nav-link">Products</Link>
                        <Link to="/raw-materials" className="nav-link">Raw Materials</Link>
                    </div>
                </div>
            </nav>

            <div className="app-content">
                <Routes>
                    <Route path="/" element={<ProductionPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/raw-materials" element={<RawMaterialsPage />} />
                </Routes>
            </div>

            <ToastContainer position="top-center" autoClose={3000} />
        </BrowserRouter>
    );
}

export default App;