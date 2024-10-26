import { Link, Outlet } from "react-router-dom";
import '../App.css';

const Root = () => {
  return (
    <div className= "rootContainer">
        <nav>
          <div>
              <Link>Mojos Blog</Link>
              <Link>Posts</Link>
              <Link>Register</Link>
              <Link>Login</Link>
          </div>
          <div>
              <Link>Logout</Link>
          </div>
        </nav>
        <Outlet/>
    </div>
  );
};

export default Root;
