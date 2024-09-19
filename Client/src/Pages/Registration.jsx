import { useState } from "react"
import { useNavigate } from "react-router-dom"
export const Registration = () => {

    const [user, setUser] = useState({
        username : "",
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    const handleinput = (e) => {
        let name = e.target.name
        let value = e.target.value

        setUser({
            ...user,
            [name] : value
        })
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        console.log(user)
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {"Content-Type" : "application/json",},
                body: JSON.stringify(user),
            })

            console.log("response", response)

            if(response.ok){
                const responsedata = await response.json()
                setUser({
                    username : "",
                    email: "",
                    password: "",
                })
                console.log(responsedata)
                navigate("/")
            }

        } catch (error) {
            console.log("Here is error")
            console.log(error);
        }
    }


    return <>
        <div className="container">
            <form onSubmit={handlesubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder="Enter your username" value={user.username} onChange={handleinput}/>
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter your email" value={user.email} onChange={handleinput}/>
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter your Password" value={user.password} onChange={handleinput}/>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    </>
}
