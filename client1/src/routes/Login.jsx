import { Link } from "react-router-dom";

const Login = () => {

  return (
    <div className="formContainer">
      <form method="POST" action="/api/log-in">
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