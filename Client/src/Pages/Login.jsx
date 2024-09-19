import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";

export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { storeTokenInLS } = useAuth()
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                alert("Login successful")
                const responsedata = await response.json();
                storeTokenInLS(responsedata.token);
                navigate("/");
            }
            else if (response.status === 401) {
                // This will catch Unauthorized responses (Invalid credentials)
                alert("Invalid Credentials");
            }
            else {
                // Handle other possible errors
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            alert("Invalid Credentials")
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email:"
                    value={user.email}
                    onChange={handleInput}
                />
                <br />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password:"
                    value={user.password}
                    onChange={handleInput}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
