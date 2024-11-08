import { Link, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { pink } from "@mui/material/colors";
import moment from "moment";

const Posts = () => {
  const [user, posts, setUser, setPosts] = useOutletContext();
  const [likeAction, setLikeAction] = useState("/api/like/");
  const [commentAction, setCommentAction] = useState("/api/comment/");
  const [commentLikeAction, setCommentLikeAction] = useState("/api/comment/like/");

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
  console.log(posts);
  return user.name ? (
    <>
      <div id="header">
        <div>
          <Avatar src={user.Profile[0].picture} sx={{ width: 100, height: 100 }} />
        </div>
        <div>Welcome {user.name}</div>
      </div>
      <div className="postContainer">
        {posts.map((post, index) => {
          const handleLike = () => {
            setLikeAction(likeAction + post.id);
          };
          const handleComment = () => {
            setCommentAction(commentAction + post.id);
          };
          return (
            <div key={index} className="card">
              <div>
                <Avatar
                  src={post.author.Profile[0].picture}
                  sx={{ width: 75, height: 75 }}
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
              <div id="title">
                <strong>{post.title}</strong>
              </div>
              <img src={post.data} />
              <div id="content">{post.content}</div>
              <div className="toolbar">
                <form id="likeForm" action={likeAction} method="POST">
                  <button id="like">
                    <IconButton onClick={handleLike}>
                      {user.Likes.find((like) => like.postId == post.id) ? (
                        <FavoriteIcon sx={{ color: pink[500] }} />
                      ) : (
                        <FavoriteIcon />
                      )}
                    </IconButton>
                  </button>
                  <div>{post.likes.length}</div>
                </form>
                <IconButton>
                  <CommentIcon />
                </IconButton>
                <div>{post.comments.length}</div>
              </div>
              {post.comments.map((comment, i) => {
                const handleCommentLike =() => {
                  setCommentLikeAction(commentLikeAction+comment.id);
                }
              return (
                <div className="commentSection" key={i}>
                  <div>
                    <Avatar
                      src={comment.author.Profile[0].picture}
                      sx={{ width: 50, height: 50 }}
                    />
                    <div>
                      <div className="username">
                        <strong>{comment.author.username}</strong>
                      </div>
                      <div className="date">
                        <em>
                          {moment(comment.createdAt).format(
                            "MMM Do YYYY, h:mm a"
                          )}
                        </em>
                      </div>
                    </div>
                  </div>
                  <div>{comment.content}</div>
                  <form id="likeForm" action={commentLikeAction} method="POST">
                  <button id="like">
                    <IconButton onClick={handleCommentLike}>
                      {comment.likes.find((like) => like.commentId == comment.id) ? (
                        <FavoriteIcon sx={{ color: pink[500] }} />
                      ) : (
                        <FavoriteIcon />
                      )}
                    </IconButton>
                  </button>
                  <div>{comment.likes.length}</div>
                </form>
                </div>
              )})}
            
              <form id="commentForm" action={commentAction} method="POST">
                <textarea
                  id="commentBox"
                  name="comment"
                  defaultValue="Leave a comment"
                ></textarea>
                <button onClick={handleComment} id="commentBtn">
                  Comment
                </button>
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
//conditionally show the posts tab when user logs in
//add like funcationality to the comment section
//figure out how to implement jwt w/passport
//add material ui menu (3 dots) icon that allows users to delete their own post
//when user clicks the comment button it automatically focuses on comment box
//blend client 2 and client1 together (git branch to test and merge if works)
export default Posts;
