import {useState, useEffect} from 'react';

const Posts = () => {
const [user,setUser] = useState([]);

    return (
        (!user.username)? 
        <p>Please log in</p> : null
    )
}

export default Posts;