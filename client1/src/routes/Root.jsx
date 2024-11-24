import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import '../App.css';

const Root = () => {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  const handleLogout =()=> {
    localStorage.removeItem("authToken");
    window.location.reload();
  }

  return (
    <div className= "rootContainer">
        <nav>
          <div>
              <NavLink to="/">Mojos Blog</NavLink>
              {user.name && <NavLink to="posts">Posts</NavLink>}
              {!user.name ? <NavLink to="register">Register</NavLink>:null}
              {!user.name ? <NavLink to="login">Login</NavLink>: null}
              {user.name ? <NavLink to="create">Create a Post</NavLink>: null}
          </div>
          <div>
          {user.name && <NavLink to='profile'>Profile</NavLink>}
              {user.name && <NavLink onClick ={handleLogout}>Logout</NavLink>}
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
