import { useSearchParams } from "react-router";

// http://localhost:5173/query-string?name=kob&age=40
export default function QueryStringExample() {
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    const age = searchParams.get('age');

    return (
        <div>
            <h1>Query String Example</h1>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
        </div>
    )
}