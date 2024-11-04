import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import '../App.css';

const Root = () => {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  return (
    <div className= "rootContainer">
        <nav>
          <div>
              <NavLink to="/">Mojos Blog</NavLink>
              <NavLink to="posts">Posts</NavLink>
              <NavLink to="register">Register</NavLink>
              <NavLink to="login">Login</NavLink>
          </div>
          <div>
          <NavLink to="profile">Profile</NavLink>
              <a href="/api/logout">Logout</a>
          </div>
        </nav>
        <Outlet context={[user,posts,setUser,setPosts]}/>

        <footer>
          <div>Made with ❤️ by David Bottenberg</div>
          <a href="https://github.com/davebott-dev"><GitHubIcon/></a>
        </footer>
    </div>
  );
};

export default Root;
