import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductionPage() {
    const [capacity, setCapacity] = useState([]);

    useEffect(() => {
        axios.get("/api/production/capacity")
        .then(response => {
            setCapacity(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <div>
            <h2>Production Capacity</h2>

            {capacity.length === 0 && <p> No production available</p>}

            {capacity.map(item => (
                <div key={item.productId}>
                    <h3>{item.productName}</h3>
                    <p>Price: {item.productPrice}</p>
                    <p>Producible quantity: {item.producibleQuantity}</p>
                    <p>Total value: {item.totalValue}</p>
                </div>
            ))}
        </div>
    )
}