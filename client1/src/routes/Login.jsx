import { Link, useNavigate } from "react-router-dom";
import {useState} from 'react';
import {Snackbar,Alert} from '@mui/material';

const Login = () => {
  const [error, setError] =useState (null);
  const [open, setOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose =(event,reason)=> {
    if(reason==="clickaway") {
      return;
    }
    setOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
  
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/api/log-in', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if(response.ok) {
        const data = await response.json();
        console.log('Response from server:', data); 
        if (data.success) {
          localStorage.removeItem('authToken');
          localStorage.setItem('authToken', data.token);
          navigate('/posts');
        } else {
          setError(data.msg || 'Login failed');
          setOpen(true);
        }
      } else {
        const errorData = await response.text();
        console.error(errorData);
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError("An error occurred while logging in. Please try again.");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <p>Login</p>
        <div>
          <span>Username</span>
          <input
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            required
          />
        </div>

        <div>
          <span>Password</span>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" disabled={loading}>{loading? 'logging in...': 'Submit'}</button>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose = {handleClose}
        >
          {error? 
          <Alert onClose={handleClose} severity = "error" variant ="filled">
          {error}
        </Alert>
        :
        <Alert onClose={handleClose} severity = "success" variant ="filled">
          Post successful
        </Alert>
        }
          
          </Snackbar>
        <span>
          <strong>
            Don't have an account? <Link to="/register">Register here.</Link>
          </strong>
        </span>
      </form>
    </div>
  );
};
export default Login;