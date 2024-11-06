import { Avatar } from "@mui/material";
import {useOutletContext} from 'react-router-dom';

const Profile = () => {
const [user,posts] = useOutletContext();
    return (
        <div>
         <Avatar src={user.Profile.picture}/>
          <div>{user.name}</div>
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>{user.Profile.bio}</div>

          <form action = "#" method="POST">
            <label htmlFor="profileImg">Upload an image:</label>
            <input
              type="file"
              name="profileImg"
              id="profileImg"
              accept=" image/*"
            />
            <textarea defaultValue="write a bio..."></textarea>
            <button>Update</button>
          </form>
        </div>
    )
}

export default Profile;

//allow user to customize their profile...change image and add bio
//add a route in backend for this + create a prisma function for updating user profile data