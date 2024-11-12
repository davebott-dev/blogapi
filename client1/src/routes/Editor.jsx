import { Link, useOutletContext } from "react-router-dom";

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
          
          <span>Do you want this post to be visible to the public?</span>

          <div>
            <div>
              <input type="radio" id="radio1" name="isPublished" value="Yes" />
              <label htmlFor="checkbox1">Yes</label>
            </div>
            <div>
              <input type="radio" id="radio2" name="isPublished" value="No" />
              <label htmlFor="checkbox1">No</label>
            </div>
          </div>

          <button className="create-input" type="submit">Submit</button>
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

//give a response when upload is successful or unsuccessful
//work on frontend appearance in the morning