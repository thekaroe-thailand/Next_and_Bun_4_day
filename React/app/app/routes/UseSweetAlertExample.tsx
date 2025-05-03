import Swal from "sweetalert2";
import { useState } from "react";

export default function UseSweetAlertExample() {
    const [age, setAge] = useState(0);
    const handleChange = (value: string) => {
        try {
            const ageValue = Number(value);
            if (isNaN(ageValue)) throw new Error('Invalid age');
            setAge(ageValue);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'please enter a valid age',
                icon: 'error'
            })
            setAge(0);
        }
    }

    return (
        <>
            <span>age</span>
            <input style={{ border: '1px solid black' }}
                value={age}
                onChange={(e) => handleChange(e.target.value)} />
            <span>{age}</span>
        </>
    )
}