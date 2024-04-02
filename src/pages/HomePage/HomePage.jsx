import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();
    const navigateToRegisterPage = () => {
        navigate("/register");
    };

    return <div>
        <span>Home Page</span>
        <button onClick={navigateToRegisterPage}>Register</button>
    </div>
}

export default HomePage;