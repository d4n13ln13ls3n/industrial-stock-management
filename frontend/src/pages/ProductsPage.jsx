import { useCrud } from "../hooks/useCrud";
import { useForm } from "../hooks/useForm";
import { toast } from "react-toastify";
import "./ProductsPage.css";

export default function ProductsPage() {
    const { items: products, loading, create, update, remove } = useCrud("products");
    const { form, setForm, editingId, setEditingId, handleChange, resetForm } = useForm({
    code: "",
    name: "",
    price: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            price: Number(form.price)
        };

        try {
            if (editingId !== null) {
                await update(editingId, payload);
                toast.success("Product updated successfully.");
            } else {
                await create(payload);
                toast.success("Product created successfully.");
            }

            resetForm();
        } catch (error) {
            toast.error("Failed to save product.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await remove(id);
            toast.success("Product deleted successfully.");
        } catch (error) {
            if (error.response?.status === 409) {
                toast.error(
                    "Cannot delete product because it is associated with raw materials. Remove the associations in Production first."
                );
            } else {
                toast.error("Failed to delete product.");
            }
        }
    };

    const handleEdit = (product) => {
        setForm({
            code: product.code,
            name: product.name,
            price: product.price
        });
        setEditingId(product.id);
    };

    return (
        <div className="products-container">
            <h2>Products</h2>

            <div className="products-form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label>Code</label>
                        <input
                            name="code"
                            value={form.code}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <label>Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <label>Price</label>
                        <input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="primary-button">
                        {editingId ? "Update Product" : "Add Product"}
                    </button>
                </form>
            </div>

            <div className="products-list">
                {loading && <p>Loading...</p>}

                {products.map(product => (
                    <div key={product.id} className="product-row">
                        <div className="product-info">
                            <strong>{product.name}</strong>
                            <span>({product.code})</span>
                            <span>${Number(product.price).toFixed(2)}</span>
                        </div>

                        <div className="product-actions">
                            <button
                                onClick={() => handleEdit(product)}
                                className="secondary-button"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(product.id)}
                                className="danger-button"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}