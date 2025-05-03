import { useState, useEffect } from "react";

export const UseEffectExample2 = () => {
    const [totalItems, setTotalItems] = useState(0);
    const [items, setItems] = useState<string[]>([]);

    useEffect(() => {
        setTotalItems(items.length);
    }, [items])

    const addItem = () => {
        setItems([...items, "item"]);
    }

    const clearItems = () => {
        setItems([]);
    }

    return (
        <>
            <div>Total Items: {totalItems}</div>
            <div>Items Length: {items.length}</div>
            <div>
                <button onClick={addItem}>Add Item</button>
                <button onClick={clearItems}>Clear Items</button>
            </div>
        </>
    )
}