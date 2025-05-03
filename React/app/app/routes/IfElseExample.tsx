import { useState } from "react";

export const IfElseExample = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isLoggedInText = () => {
        if (isLoggedIn) {
            return "welcome to the app";
        } else {
            return "please log in";
        }
    }

    return (
        <div>
            <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
                {isLoggedIn ? 'Logout' : 'Login'}
            </button>

            <div>{isLoggedInText()}</div>
        </div>
    )
}