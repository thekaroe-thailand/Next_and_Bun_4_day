import type { EmployeeInterface } from "~/interface/EmployeeInterface.";

export const ArrayAndMapExample = () => {
    const employees: EmployeeInterface[] = [
        { id: 1, name: 'John', age: 30 },
        { id: 2, name: 'Jane', age: 25 },
        { id: 3, name: 'Jim', age: 35 }
    ];

    return (
        <div>
            {employees.map((employee) => (
                <div key={employee.id}>
                    {employee.id} - {employee.name} - {employee.age}
                </div>
            ))}
        </div>
    )
}