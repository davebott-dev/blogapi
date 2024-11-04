import { Link,useOutletContext } from "react-router-dom";
import {useEffect} from 'react';
import { Avatar } from "@mui/material";

const Posts = () => {
  const [user,posts,setUser,setPosts] = useOutletContext();

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

  return user.name ? (
    <>
      <div>
        <div>
          <Avatar src={user.Profile.picture}/>
        </div>
        <div>Welcome {user.name}</div>
      </div>
      <div className="postContainer">
        {posts.map((post, index) => {
          return (
            <div key={index} className="card">
              <div>
                <Avatar src={post.author.Profile.picture}/>
                <div>
                  <div>{post.author.username}</div>
                  <div>{post.createdAt}</div>
                </div>
              </div>
              <div>{post.title}</div>
              <div>
                <img src={post.data} />
              </div>
              <div>{post.content}</div>
              <div>Likes: {post.likes}</div>
              <div className="commentSection"></div>
              <textarea></textarea>
              <button>Comment</button>
            </div>
          );
        })}
      </div>
    </>
  ) : (
    <div className="postContainer">
      <div className="loginMessage">
        <Link to="/login" className="link">
          Please Login First
        </Link>
      </div>
    </div>
  );
};

export default Posts;
