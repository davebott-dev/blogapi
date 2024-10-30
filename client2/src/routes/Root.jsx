import { NavLink, Outlet } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import '../App.css';

const Root = () => {
  return (
    <div className= "rootContainer">
        <nav>
          <div>
              <NavLink to="/">Mojos Blog Editor</NavLink>
          </div>
          <div>
            <NavLink to="home">Login</NavLink>
              <a href="/api/logout">Logout</a>
          </div>
        </nav>
        <Outlet/>

        <footer>
          <div>Made with ❤️ by David Bottenberg</div>
          <a href="https://github.com/davebott-dev"><GitHubIcon/></a>
        </footer>
    </div>
  );
};

export default Root;