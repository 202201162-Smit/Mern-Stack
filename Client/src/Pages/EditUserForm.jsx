import { useEffect, useState } from "react";
import { useAuth } from "./auth";
import { useParams, useNavigate } from "react-router-dom";

export const EditUserForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        // Add other fields as needed
    });
    const { id } = useParams(); // Extract user ID from URL parameters
    const { authorizationToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data to populate the form
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    },
                });
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserData();
    }, [id, authorizationToken]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log("User updated:", result);
            navigate("/admin/users"); // Redirect to user list after update
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>
            {/* Add other fields as needed */}
            <button type="submit">Update</button>
        </form>
    );
};
