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

  return user.name? (
    <div className="postContainer">
      {posts.map((post,index)=> {
        const handleURL = () => {
          const blob = new Blob([post.data.data], {
            type: "application/octet-stream",
          });
          const fileReader=  new FileReader();
          //figure out how to render the image upload file in the frontend
          
        }
        return (
        <div key={index}>
        <div>{post.title}</div>
        <div><img src="#" /></div>
        <div>{post.content}</div>
        <div>{post.likes}</div>
        <div>{post.createdAt}</div>    
        <button onClick={handleURL}>Click</button>    
        </div>
      )})}
    </div>
  ) : 
  <div className="loginMessage">
    <Link to="/login" className="link">
      Please Login First
    </Link>
  </div>
};

export default Posts;

// return (
//   <div className="postContainer">
//     {user.name ? (
//       <h1>Welcome {user.name}</h1>
//     ) : (
//       <div className="loginMessage">
//         <Link to="/login" className="link">
//           Please Login First
//         </Link>
//       </div>
//     )}
//   </div>
// );
