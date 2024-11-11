import { Link, useOutletContext } from "react-router-dom";

import "./App.css";

function Index() {
  const [user] = useOutletContext();

  return (
    <div className="indexContainer">
      <div>
        <h1>Welcome to Mojos Digital Minimalist Blog!</h1>
        <h2>Please Register to view and comment on Mojos post...</h2>
        <p>Discover the best stories and pictures from the world of Mojo</p>
        {user.name ? (
          <Link to="posts">
            <button>Enter Mojos World</button>
          </Link>
        ) : (
          <Link to="login">
            <button>Enter Mojos World</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Index;
