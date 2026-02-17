import api from "../api/api";
import { useEffect, useState } from "react";

export function useCrud(endpoint) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const load = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/${endpoint}`);
            setItems(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const create = async (data) => {
        try {
            await api.post(`/${endpoint}`, data);
            await load();
        } catch (error) {
            console.error(error);
        }
    };

    const update = async (id, data) => {
        try {
            await api.put(`/${endpoint}/${id}`, data);
            await load();
        } catch (error) {
            console.error(error);
        }
    }

    const remove = async (id) => {
        try {
            await api.delete(`/${endpoint}/${id}`);
            await load();
        } catch (error) {
            console.error(error);
            throw error; // 👈 ESSENCIAL
        }
    };

    useEffect(() => {
        load();
    }, []);

    return {
        items,
        loading,
        load,
        create,
        update,
        remove
    }
}