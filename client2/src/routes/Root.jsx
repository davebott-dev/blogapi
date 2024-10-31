import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../App.css";

const Root = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api");
      const data = await response.json();
      setUser(data);
    };
    fetchData();
  }, []);
  return (
    <div className="rootContainer">
      <nav>
        <div>
          <NavLink to="/">Mojos Blog Editor</NavLink>
          <NavLink to= "posts">Create a Post</NavLink>
        </div>
        <div>
          {user.name ? (
            <a href="/api/logout">Logout</a>
          ) : (
            <NavLink to="home">Login</NavLink>
          )}
        </div>
      </nav>
      <Outlet context= {[user]} />

      <footer>
        <div>Made with ❤️ by David Bottenberg</div>
        <a href="https://github.com/davebott-dev">
          <GitHubIcon />
        </a>
      </footer>
    </div>
  );
};

export default Root;
