import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {Snackbar,Alert} from '@mui/material';


const Editor = () => {
  const [user, posts, setUser, setPosts] = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open,setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleClose =(event,reason)=> {
    if(reason==="clickaway") {
      return;
    }
    setOpen(false);
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const file = e.target.file.files[0];
    const content = e.target.content.value;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("content", content);

    try {
      const response = await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
          console.log("Post Uploaded", data);
          navigate("/posts");

      } else {
        setError("An error occured while uploading. Please try again.");
        setOpen(true);
      }
    } catch (err) {
      console.error("Error during form submission:", err);
      setError(
        "An error occurred while submitting the form. Please try again."
      );
      setOpen(true);
    } finally {
      setLoading(false);
      navigate("/posts");
    }
  };

  return (
    <div className="editorContainer">
      {user.name ? (
        <form id="editorForm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="create-input"
              name="title"
              id="title"
              required
            />
          </div>

          <div>
            <label htmlFor="file">Upload an image:</label>
            <input
              className="create-input"
              type="file"
              name="file"
              id="file"
              accept=" image/*"
            />
          </div>

          <textarea name="content" defaultValue="type here" />

          <button className="create-input" type="submit" disabled={loading}> 
            {loading ? "Uploading..." : "Submit"}
          </button>
          <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose = {handleClose}
        >
          <Alert onClose={handleClose} severity = "error" variant ="filled">
            {error}
          </Alert>
          </Snackbar>
        </form>
      ) : (
        <div className="loginMessage">
          <Link to="/home" className="link">
            Please Login First
          </Link>
        </div>
      )}
    </div>
  );
};

export default Editor;
