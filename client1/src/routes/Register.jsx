import {Form,redirect} from 'react-router-dom';
import '../App.css';

const Register = () => {

    return (
        <div className = "formContainer">
            
            <Form method= "post">
            <p>Create Account</p>
                <div>
                    <span>Name</span>
                    <input 
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    required
                     />
                </div>

                <div>
                    <span>Email</span>
                    <input 
                    type="email"
                    placeholder="John_Doe@email.com"
                    name="email"
                    required
                     />
                </div>

                <div>
                    <span>Username</span>
                    <input 
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                     />
                </div>

                <div>
                    <span>Password</span>
                    <input 
                    type="password"
                    name="password"
                    placeholder= "Password"
                     />
                </div>

                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}

export default Register;