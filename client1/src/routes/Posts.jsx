import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await fetch("/api");
      const data1 = await response1.json();
      setUser(data1);

      const response2 = await fetch("/api/posts");
      const data2 = await response2.json();
      setPosts(data2);
    };
    fetchData();
  }, []);
console.log(posts)
  return user.name? (
    <div className="postContainer">
      {posts.map((post,index)=> {
        return (
        <div key={index}>
        <div>{post.title}</div>
        <div><img src={post.data} /></div>
        <div>{post.content}</div>
        <div>{post.likes}</div>
        <div>{post.createdAt}</div>    
        </div>
      )})}
    </div>
  ) : 

  <div className="postContainer">
    <div className="loginMessage">
      <Link to="/login" className="link">
        Please Login First
      </Link>
    </div>
  </div>
};

export default Posts;


