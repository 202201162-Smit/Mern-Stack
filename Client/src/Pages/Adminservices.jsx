import { useEffect, useState } from "react"
import { useAuth } from "./auth"

export const Adminservices = () => {
    const [services, Setservice] = useState([])

    const {authorizationToken} = useAuth()

    const getAllservices = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/services", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            })
            const data = await response.json()
            console.log(`users ${data}`)
            Setservice(data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllservices()
    }, [])
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {services.map((curele, index) => {
                    return (
                        <tr key={index}>
                            <td>{curele.Name}</td>
                            <td>{curele.Surname}</td>
                            <td>
                                <button>Edit</button>
                            </td>
                            <td>
                                <button>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}