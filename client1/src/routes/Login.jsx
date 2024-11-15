import { Link } from "react-router-dom";
import {useEffect,useState} from 'react';
import {Snackbar,Alert} from '@mui/material';

const Login = () => {
  const [error, setError] =useState ([]);
  const [open, setOpen] = useState(false);
  const [loading,setLoading] = useState(false);

  const handleClick = () => {
    error.flash.msg[error.flash.msg.length-1] =="invalid credentials" ? setOpen(true): null;
  }
  const handleClose =(event,reason)=> {
    if(reason==="clickaway") {
      return;
    }
    setOpen(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try{
        const response = await fetch("/api/log-in-fail");
        const data = await response.json();
        setError(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="formContainer">
      <form action= "api/log-in" method ="POST">
        <p>Login</p>
        <div>
          <span>Username</span>
          <input
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            required
          />
        </div>

        <div>
          <span>Password</span>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" onClick={handleClick}>Submit</button>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose = {handleClose}
        >
          <Alert onClose={handleClose} severity = "error" variant ="filled">
            Login Failed!
          </Alert>
          </Snackbar>
        <span>
          <strong>
            Don't have an account? <Link to="/register">Register here.</Link>
          </strong>
        </span>
      </form>
    </div>
  );
};
export default Login;

//figure out how to render log in errors
//incorporate jwt