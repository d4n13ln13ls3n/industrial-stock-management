import { useCrud } from "../hooks/useCrud";
import { useForm } from "../hooks/useForm";
import "./RawMaterialsPage.css";

export default function RawMaterialsPage() {
    const { items: materials, loading, create, update, remove } = useCrud("raw-materials");

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

        if (editingId !== null) {
            await update(editingId, payload);
        } else {
            await create(payload);
        }

        resetForm();
    };

    const handleDelete = async (id) => {
        await remove(id);
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