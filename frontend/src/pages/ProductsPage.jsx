import { useCrud } from "../hooks/useCrud";
import { useForm } from "../hooks/useForm";

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

    const handleEdit = async (product) => {
        setForm({
            code: product.code,
            name: product.name,
            price: product.price
        });
        setEditingId(product.id);
    };

    return (
        <div>
            <h2>Products</h2>

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
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{editingId ? "Update Product" : "Add Product"}</button>
            </form>

            <hr />

            {loading && <p>Loading...</p>}

            {products.map(product => (
                <div key={product.id}>
                    <strong>{product.name}</strong> ({product.code}) - ${product.price}
                    <button onClick={() => handleEdit(product)}>
                    Edit
                    </button>
                    <button onClick={() => handleDelete(product.id)}>
                    Delete
                    </button>
                </div>
            ))}
        </div>
    );
}