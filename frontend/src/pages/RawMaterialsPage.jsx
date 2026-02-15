import { useCrud } from "../hooks/useCrud";
import { useForm } from "../hooks/useForm";

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
        }

        if(editingId !== null){
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
    }

    return (
        <div>
            <h2>Raw Materials</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="code"
                    placeholder="Code"
                    value={form.code}
                    onChange={handleChange}
                    required
                />
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    name="stockQuantity"
                    type="number"
                    placeholder="StockQuantity"
                    value={form.stockQuantity}
                    onChange={handleChange}
                    required
                />
                <button type="submit">
                    {editingId ? 'Update Raw Material' : 'Add Raw Material'}
                </button>
            </form>

            <hr />

            {loading && <p>Loading...</p>}

            {materials.map(material => (
                <div key={material.id}>
                    <strong>{material.name}</strong> ({material.code}) - {material.stockQuantity}
                    <button onClick={() => handleEdit(material)}>
                        Edit
                    </button>
                    <button onClick={() => handleDelete(material.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}