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

          <form>
            <textarea></textarea>
            <button>Update</button>
          </form>
        </div>
    )
}

export default Profile;