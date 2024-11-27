import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

const Profile = () => {
  const [user, posts, setUser, setPosts] = useOutletContext();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [action] = useState("http://localhost:8080/api/profile/");
  const [deleteAction] = useState("/api/profile/delete/");
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        const response = await fetch("http://localhost:8080/api", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUser(data);
      };
      fetchData();
    }
  }, [token, navigate]);

  const handleDelete = async (e) => {
    let answer = confirm("Are you sure you want to delete your account?");
    if (!answer) {
      e.preventDefault();
    } else {
      setLoading(true);
      setError(null);
      try{
        const response1 = await fetch(deleteAction+user.id, {
          method:"POST",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data1 = await response1.json();
        if(response1.ok) {
          if(data1.success){
            console.log("profile deleted",data1);
            localStorage.removeItem("authToken");
            navigate('/login');
          }else {
            setError(data1.msg || "Delete failed");
            setOpen(true);
          }
        }
      } catch(err) {
        console.log("Error during delete",err);
        setError("An error occured while deleting the profile. Please try again");
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = e.target.file.files[0];
    const bio = e.target.bio.value;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bio", bio);

    try {
      const response = await fetch(action + user.id, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        if (data.success) {
          console.log("Profile Updated", data);
          navigate("/profile");
        } else {
          setError(data.msg || "Update failed");
          setOpen(true);
        }
      }
    } catch (err) {
      console.error("Error during form submission:", err);
      setError(
        "An error occurred while submitting the form. Please try again."
      );
      setOpen(true);
    } finally {
      setLoading(false);
      window.location.reload();
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

          <form id="profileForm" onSubmit={handleSubmit}>
            <label htmlFor="profileImg">Upload an image:</label>
            <input type="file" name="file" id="profileImg" accept=" image/*" />
            <textarea placeholder="write a bio..." name="bio"></textarea>
            <button disabled={loading} type="submit">
              {loading ? "Please wait" : "Update"}
            </button>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" variant="filled">
                {error}
              </Alert>
            </Snackbar>
          </form>

          <form onSubmit={handleDelete}>
            <button id="delBtn">
              Delete Account
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Profile;

//fix route to handle form submission to update user profile... update button not working??
