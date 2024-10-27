import { Form, redirect, Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="formContainer">
      <Form method="post">
        <p>Login</p>

        <div>
          <span>Username</span>
          <input type="text" placeholder="Username" name="username" required />
        </div>

        <div>
          <span>Password</span>
          <input
            type="password"
            name="password"
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
      </Form>
    </div>
  );
};
export default Login;
