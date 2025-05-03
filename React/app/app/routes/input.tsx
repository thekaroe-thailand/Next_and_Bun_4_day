import { useState } from "react";

export default function Input() {
    const [name, setName] = useState('');

    return (
        <>
            <input onChange={(e) => setName(e.target.value)} />
            <p>{name}</p>
        </>
    )
}