import { useEffect, useState } from "react"
import { useAuth } from "./auth"
import {Link} from "react-router-dom"

export const Adminusers = () => {
    const [users, Setusers] = useState([])

    const {authorizationToken} = useAuth()

    const getAllusers = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            })
            const data = await response.json()
            console.log(`users ${data}`)
            Setusers(data)

        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async(id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            })
            const data = await response.json()
            console.log(`users  after delete: ${data}`)
            getAllusers()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllusers()
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {users.map((curuser, index) => {
                    return (
                        <tr key={index}>
                            <td>{curuser.username}</td>
                            <td>{curuser.email}</td>
                            <td>
                                <Link to={`/admin/users/${curuser._id}/edit`}>Edit</Link>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(curuser._id)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}