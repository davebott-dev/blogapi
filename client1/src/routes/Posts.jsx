import { Link, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from '@mui/icons-material/Delete';

import { pink } from "@mui/material/colors";
import moment from "moment";

const Posts = () => {
  const [user, posts, setUser, setPosts] = useOutletContext();
  const [likeAction, setLikeAction] = useState("/api/like/");
  const [commentAction, setCommentAction] = useState("/api/comment/");
  const [profileLink,setProfileLink] = useState('/profile/');
  const [commentLikeAction, setCommentLikeAction] =
    useState("/api/comment/like/");
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  const handleClose = () => {
    setAnchor(null);
  };

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
  console.log(user)
  return user.name ? (
    <>
      <div id="header">
        <div>
          <Link to="/profile">
            <Avatar
              src={user.Profile[0].picture}
              sx={{ width: 100, height: 100 }}
            />
          </Link>
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
          const handleClick = (e) => {
            setAnchor(e.currentTarget);

            setProfileLink(profileLink+post.author.Profile[0].id);
          };
          
          return (
            <div key={index} className="card">
              <div>
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
                <div>
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchor}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{ "aria-labelledby": "basic-button" }}
                  >
                    <MenuItem onClick={handleClose}>
                    <Link to={profileLink}>View Profile</Link>
                    </MenuItem>
                  </Menu>
                  {user.id == post.author.id ? <IconButton>
                    <form action="#" method="POST">
                      <button className="hidden">
                      <DeleteIcon/>
                      </button>
                    </form>
                   
                  </IconButton> :
                  null
                  }
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
                const handleCommentLike = () => {
                  setCommentLikeAction(commentLikeAction + comment.id);
                };
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
                    <form
                      id="likeForm"
                      action={commentLikeAction}
                      method="POST"
                    >
                      <button id="like">
                        <IconButton onClick={handleCommentLike}>
                          {comment.likes.find(
                            (like) => like.userId == user.id
                          ) ? (
                            <FavoriteIcon sx={{ color: pink[500] }} />
                          ) : (
                            <FavoriteIcon />
                          )}
                        </IconButton>
                      </button>
                      <div>{comment.likes.length}</div>
                    </form>
                  </div>
                );
              })}

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
//figure out how to implement jwt w/passport
//when user clicks the comment button it automatically focuses on comment box
//create delete route to delete user posts
export default Posts;
