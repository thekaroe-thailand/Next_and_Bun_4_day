import { useState, useEffect } from "react";

export const UseEffectExample = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        console.log('name changed', name);
    }, [name]);

    return (
        <>
            <div>Name: {name}</div>
            <input value={name}
                onChange={(e) => setName(e.target.value)} />
        </>
    )
}