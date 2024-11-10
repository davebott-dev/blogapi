import { Link } from "react-router-dom";
import {useEffect,useState} from 'react';

const Login = () => {
  const [error, setError] =useState ([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/log-in-fail");
      const data = await response.json();
      setError(data);
    };
    const handleError = () => {
      setTimeout(()=> {
        const newArr = error.slice(0,-1);
        setError(newArr);
      },3000)
    }
    fetchData();
    handleError();
  }, []);
  //figure out a btter way to display errors
  return (
    <div className="formContainer">
      <form action= "api/log-in" method ="POST">
        <p>Login</p>
        {error && <p id = "error-msg">{error.msg}</p>}
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

        <button type="submit">Submit</button>
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

//incorporate material ui features to finish frontend design