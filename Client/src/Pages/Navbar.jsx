import { NavLink } from "react-router-dom";
import { useAuth } from "./auth";
// import "./Navbar.css";

export const Navbar = () => {

  const { isLoggedIn } = useAuth()
  console.log("Navbar", isLoggedIn)
  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">ThapaTechnical</NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register"> Register </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login"> Login </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink to="/service"> Service </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};