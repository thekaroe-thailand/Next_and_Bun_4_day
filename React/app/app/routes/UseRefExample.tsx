import { useRef } from "react";

export const UseRefExample = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);

    const handleFocus = () => {
        inputRef.current?.focus();
    }

    const handleLabelChangeText = () => {
        if (labelRef.current) {
            labelRef.current.textContent = "New Text";
        }
    }

    return (
        <div>
            <label ref={labelRef}>Name</label>
            <input ref={inputRef} />
            <button onClick={handleFocus}>Focus</button>
            <button onClick={handleLabelChangeText}>Change Text</button>
        </div>
    )
}