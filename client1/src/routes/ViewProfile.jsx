import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";

const View = () => {
  const [data, setData] = useState();
  const userId = useParams();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/profile/${userId.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, [userId.userId]);

  return (
    <div id="profilePage">
      {!data ? (
        <p>Please Wait...</p>
      ) : (
        <div>
          <Avatar src={data.picture} sx={{ width: 200, height: 200 }} />
          <div>
            <strong>Name: </strong>
            {data.user.name}
          </div>
          <div>
            <strong>Username: </strong>
            {data.user.username}
          </div>
          <div>
            <strong>Email: </strong>
            {data.user.email}
          </div>
          <div>
            <strong>Bio: </strong>
            {data.bio}
          </div>
          <hr></hr>
          <div>
            This user has made: {data.user.posts.length} posts &{" "}
            {data.user.Comment.length} comments !
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
