import { useCrud } from "../hooks/useCrud";
import { useForm } from "../hooks/useForm";
import { toast } from "react-toastify";
import "./RawMaterialsPage.css";

export default function RawMaterialsPage() {
    const { items: materials, loading, create, update, remove } = useCrud("raw-materials");

    text
    const { form, setForm, editingId, setEditingId, handleChange, resetForm } = useForm({
        code: "",
        name: "",
        stockQuantity: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            stockQuantity: parseInt(form.stockQuantity, 10)
        };

        try {
            if (editingId !== null) {
                await update(editingId, payload);
                toast.success("Raw material updated successfully.");
            } else {
                await create(payload);
                toast.success("Raw material created successfully.");
            }

            resetForm();
        } catch (error) {
            toast.error("Failed to save raw material.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await remove(id);
            toast.success("Raw material deleted successfully.");
        } catch (error) {
            if (error.response?.status === 409) {
                toast.error(
                    "Cannot delete raw material because it is associated with products. Remove the associations in Production first."
                );
            } else {
                toast.error("Failed to delete raw material.");
            }
        }
    };

    const handleEdit = (material) => {
        setForm({
            code: material.code,
            name: material.name,
            stockQuantity: material.stockQuantity
        });
        setEditingId(material.id);
    };

    return (
        <div className="raw-container">
            <h2>Raw Materials</h2>

            <div className="raw-form-card">
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
                        <label>Stock Quantity</label>
                        <input
                            name="stockQuantity"
                            type="number"
                            value={form.stockQuantity}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="primary-button">
                        {editingId ? "Update Raw Material" : "Add Raw Material"}
                    </button>
                </form>
            </div>

            <div className="raw-list">
                {loading && <p>Loading...</p>}

                {materials.map(material => (
                    <div key={material.id} className="raw-row">
                        <div className="raw-info">
                            <strong>{material.name}</strong>
                            <span>({material.code})</span>
                            <span>Stock: {material.stockQuantity}</span>
                        </div>

                        <div className="raw-actions">
                            <button
                                onClick={() => handleEdit(material)}
                                className="secondary-button"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(material.id)}
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