import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';

const Posts = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api");
      const data = await response.json();
      setUser(data);
    };
    fetchData();
  }, []);

  return (
    <div className="postContainer">
      {user.name ? (
        <h1>Welcome {user.name}</h1>
      ) : (
        <div className="loginMessage">
          <Link to="/login" className='link'>Please Login First</Link>
        </div>
      )}
    </div>
  );
};

export default Posts;
