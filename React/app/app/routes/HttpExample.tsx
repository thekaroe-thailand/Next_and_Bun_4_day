import axios from "axios";

export default function HttpExample() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const payload = {
        title: 'food',
        body: 'bar',
        userId: 1
    }
    const handleGet = async () => {
        const response = await axios.get(url);
        console.log(response.data);
    }
    const handlePost = async () => {
        const response = await axios.post(url, payload);
        console.log(response.data);
    }
    const handlePut = async () => {
        const response = await axios.put(url + '/1', payload);
        console.log(response.data);
    }
    const handleDelete = async () => {
        const response = await axios.delete(url + '/1');
        console.log(response.data);
    }

    return (
        <div>
            <h1>Http Example</h1>
            <button className="button" onClick={handleGet}>Get</button>
            <button className="button" onClick={handlePost}>Post</button>
            <button className="button" onClick={handlePut}>Put</button>
            <button className="button" onClick={handleDelete}>Delete</button>
        </div>
    )
}