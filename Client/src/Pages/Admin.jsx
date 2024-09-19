import { NavLink, Outlet } from "react-router-dom"

export const Admin = () => {
    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to = "/admin/users">users</NavLink>
                            </li>
                            <li>
                                <NavLink to = "/admin/services">services</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet/>
        </>
    )
}