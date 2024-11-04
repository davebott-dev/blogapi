import { Link, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { Avatar,IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import {pink} from '@mui/material/colors';
import moment from "moment";

const Posts = () => {
  const [user, posts, setUser, setPosts] = useOutletContext();
  const [isLiked, setIsLiked] = useState(false);
  const [action,setAction] = useState("/api/like/")

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
          <Avatar src={user.Profile.picture} />
        </div>
        <div>Welcome {user.name}</div>
      </div>
      <div className="postContainer">
        {posts.map((post, index) => {
            const handleLike = ()=> {
              if(!isLiked) {
                setIsLiked(true);
                setAction(action+post.id)
              }
            }
          return (
            <div key={index} className="card">
              <div>
                <Avatar
                  src={post.author.Profile.picture}
                  sx={{ width: 50, height: 50 }}
                />
                <div>
                  <div className="username">
                    <strong>{post.author.username}</strong>
                  </div>
                  <div className="date">
                    {moment(post.createdAt).format("MMM Do YYYY, h:mm a")}
                  </div>
                </div>
              </div>
              <div id="title"><strong>{post.title}</strong></div>
              <img src={post.data} />
              <div id = "content">{post.content}</div>
              <div className="toolbar">
                <form id ="likeForm" action ={action} method = "POST">
                  <button id="like">
                    <IconButton onClick={handleLike}>
                    {isLiked? <FavoriteIcon sx={{color:pink[500]}}/> : <FavoriteIcon/>}
                    </IconButton>
                  </button>
                  <div>{post.likes}</div>
                </form>
                <IconButton><CommentIcon/></IconButton>
              </div>
              <div className="commentSection"></div>
              <form id="commentForm" action="#" method="POST">
                <textarea></textarea>
                <button>Comment</button>
              </form>
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
