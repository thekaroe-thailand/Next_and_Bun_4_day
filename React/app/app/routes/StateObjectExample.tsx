import { useState } from 'react'

export const StateObjectExample = () => {
    const [employee, setEmployee] = useState({
        name: '',
        salary: 0
    })

    return (
        <>
            <div>Employee</div>
            <div>
                <span>Name:</span>
                <input onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
                <span>{employee.name}</span>
            </div>
            <div>
                <span>Salary:</span>
                <input onChange={(e) => setEmployee({ ...employee, salary: parseInt(e.target.value) })} />
                <span>{employee.salary}</span>
            </div>
        </>
    )
}