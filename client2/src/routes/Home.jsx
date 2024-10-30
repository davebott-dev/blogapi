import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';

const Home = () => {

  const [user, setUser] = useState([]);

  return (

    user.name ? 
    <div> Welcome Authorized User</div>
    :
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
      </form>
    </div>
  );
};
export default Home;
