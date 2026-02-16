import { useState } from "react";

export function useForm(initialValues) {
    const [form, setForm] = useState(initialValues);
    const [editingId, setEditingId] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setForm(initialValues);
        setEditingId(null);
    };

    return {
        form,
        setForm,
        editingId,
        setEditingId,
        handleChange,
        resetForm
    };
}