import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const Profile = () => {
  const [user, posts, setUser, setPosts] = useOutletContext();
  const [action, setAction] = useState("/api/profile/");
  const [deleteAction,setDeleteAction] = useState('/api/profile/delete/');

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await fetch("/api");
      const data1 = await response1.json();
      setUser(data1);
    };
    fetchData();
  }, [setUser]);

  const handleAction = () => {
    setAction(action + user.id);
  };
  const handleDelete = (e) => {
    let answer = confirm("Are you sure you want to delete your account?");

    if (!answer) {
      e.preventDefault();
    } else {
      setDeleteAction(deleteAction+user.id);
    }
  };
  return (
    <div id="profilePage">
      {!user.Profile ? (
        <p>Please Wait...</p>
      ) : (
        <>
          <div>
            <Avatar
              src={user.Profile[0].picture}
              sx={{ width: 200, height: 200 }}
            />
            <div>
              <strong>Name: </strong>
              {user.name}
            </div>
            <div>
              <strong>Username: </strong>
              {user.username}
            </div>
            <div>
              <strong>Email: </strong>
              {user.email}
            </div>
            <div>
              <strong>Bio: </strong>
              {user.Profile[0].bio}
            </div>
          </div>

          <form
            id="profileForm"
            action={action}
            method="POST"
            encType="multipart/form-data"
          >
            <label htmlFor="profileImg">Upload an image:</label>
            <input type="file" name="file" id="profileImg" accept=" image/*" />
            <textarea defaultValue="write a bio..." name="bio"></textarea>
            <button onClick={handleAction}>Update</button>
          </form>

          <form action={deleteAction} method ="POST">
            <button id="delBtn" onClick={handleDelete}>
              Delete Account
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Profile;
