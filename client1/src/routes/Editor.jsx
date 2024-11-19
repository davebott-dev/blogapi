import { Link, useOutletContext } from "react-router-dom";
import {useState} from 'react';

const Editor = () => {
  const [user] = useOutletContext();

  return (
    <div className="editorContainer">
      {user.name ? (
        <form
          action="/api/upload"
          method="POST"
          encType="multipart/form-data"
          id="editorForm"
        >
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" className="create-input" name="title" id="title" required />
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
          
            <button className="create-input" type="submit" >Submit</button>
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