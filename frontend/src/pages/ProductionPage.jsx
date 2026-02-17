import { useEffect, useState } from "react";
import api from "../api/api";
import { useCrud } from "../hooks/useCrud";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import "./ProductionPage.css";

export default function ProductionPage() {
    const { items: materials } = useCrud("raw-materials");
    const { items: products } = useCrud("products");

    const [productId, setProductId] = useState("");
    const [rawMaterialId, setRawMaterialId] = useState("");
    const [requiredQuantity, setRequiredQuantity] = useState("");

    const [capacity, setCapacity] = useState([]);
    const [loadingCapacity, setLoadingCapacity] = useState(true);
    const [loadingMaterials, setLoadingMaterials] = useState({});
    const [productMaterialsMap, setProductMaterialsMap] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = capacity.slice(indexOfFirstProduct, indexOfLastProduct);
    
    useEffect(() => {
        setLoadingCapacity(true);
        api.get("/production/capacity")
            .then((response) => {
                setCapacity(response.data);
            })
            .catch((error) => {
                console.error("Error loading production capacity:", error);
                toast.error("Failed to load production capacity.");
            })
            .finally(() => {
                setLoadingCapacity(false);
            });
    }, []);

    const handleAssociate = async (e) => {
        e.preventDefault();

        if (!productId) {
            toast.error("Please select a product.");
            return;
        }

        if (!rawMaterialId) {
            toast.error("Please select a raw material.");
            return;
        }

        if (!requiredQuantity || isNaN(requiredQuantity) || requiredQuantity <= 0) {
            toast.error("Please enter a valid required quantity (greater than zero).");
            return;
        }

        const payload = {
            rawMaterialId: parseInt(rawMaterialId, 10),
            requiredQuantity: parseInt(requiredQuantity, 10),
        };

        try {
            await api.post(`/products/${productId}/materials`, payload);
            toast.success("Material associated successfully!");

            const response = await api.get("/production/capacity");
            setCapacity(response.data);

            setProductId("");
            setRawMaterialId("");
            setRequiredQuantity("");
        } catch (error) {
            console.error("Error associating material:", error);
            toast.error("Failed to associate material. Please check the console for details.");
        }
    };

    const fetchProductMaterials = async (productId) => {
        if (productMaterialsMap[productId]) {
            setProductMaterialsMap((prev) => {
                const updated = { ...prev };
                delete updated[productId];
                return updated;
            });
            return;
        }

        setLoadingMaterials((prev) => ({ ...prev, [productId]: true }));

        try {
            const response = await api.get(`/products/${productId}/materials`);
            setProductMaterialsMap((prevState) => ({
                ...prevState,
                [productId]: response.data,
            }));
        } catch (error) {
            toast.error("Failed to load materials.");
        } finally {
            setLoadingMaterials((prev) => ({ ...prev, [productId]: false }));
        }
    };

    const totalPages = Math.ceil(capacity.length / productsPerPage);

    return (
        <div className="production-container">
            <h2>Production Capacity</h2>

            {loadingCapacity ? (
                <Spinner />
            ) : (
                <>
                    {capacity.length === 0 ? (
                        <p>No production available</p>
                    ) : (
                        <div className="product-cards">
                            {currentProducts.map((item) => (
                                <div key={item.productId} className="product-card">
                                    <h3>{item.productName}</h3>
                                    <p><strong>Price:</strong> ${item.productPrice}</p>
                                    <p><strong>Producible quantity:</strong> {item.producibleQuantity}</p>
                                    <p>
                                        <strong>Total value:</strong> $
                                        {Number(item.totalValue).toLocaleString("en-US", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                        </p>

                                    <button
                                        className="view-materials-button"
                                        onClick={() => fetchProductMaterials(item.productId)}
                                    >
                                        {productMaterialsMap[item.productId] ? "Hide Materials" : "View Materials"}
                                    </button>

                                    {loadingMaterials[item.productId] && <Spinner />}

                                    {productMaterialsMap[item.productId] && productMaterialsMap[item.productId].length > 0 && (
                                        <ul className="materials-list">
                                            {productMaterialsMap[item.productId].map((pm) => (
                                                <li key={pm.rawMaterialId}>
                                                    {pm.rawMaterialName} (Required Quantity: {pm.requiredQuantity})
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {productMaterialsMap[item.productId] && productMaterialsMap[item.productId].length === 0 && (
                                        <p>No materials associated with this product.</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <nav>
                            <ul className="pagination">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                        <button onClick={() => setCurrentPage(number)} className="page-link">
                                            {number}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </>
            )}

            <hr />

            <div className="associate-form-container">
                <h3>Associate Raw Material to Product</h3>
                <form onSubmit={handleAssociate} style={{ marginBottom: "20px" }}>
                    <div>
                        <label>Product:</label>
                        <select
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        >
                            <option value="">Select Product</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Raw Material:</label>
                        <select
                            value={rawMaterialId}
                            onChange={(e) => setRawMaterialId(e.target.value)}
                        >
                            <option value="">Select Raw Material</option>
                            {materials.map((material) => (
                                <option key={material.id} value={material.id}>
                                    {material.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Required Quantity:</label>
                        <input
                            type="number"
                            placeholder="Required Quantity"
                            value={requiredQuantity}
                            onChange={(e) => setRequiredQuantity(e.target.value)}
                            min="1"
                        />
                    </div>

                    <button type="submit" className="associate-button">
                        Associate Material
                    </button>
                </form>
            </div>
        </div>
    );
}