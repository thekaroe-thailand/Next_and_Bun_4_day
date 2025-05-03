import { Config } from "~/config";

export default function UseConfig() {
    return (
        <>
            <div>api url = {Config.apiUrl}</div>
            <div>secret = {Config.secretKey}</div>
        </>
    )
}