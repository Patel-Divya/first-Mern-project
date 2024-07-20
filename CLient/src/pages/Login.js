import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";  // for itteractive error display

/* eslint-disable jsx-a11y/img-redundant-alt */
const Login = ()=>{
    const [user, setUser] = useState({
        email:'',
        password:''
    });

    const navigate = useNavigate();

    const {storeTokenInLS} = useAuth();

    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user, // if there are any previous operator/value, it will use it.
            [name]: value,  // using [] brackets for dynamic data
        });

        //console.log(user);
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(user);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();  // get data fro m response

            if(response.ok){
                console.log('res from server: ',data, data.token);
                storeTokenInLS(data.token);
                
                toast.success('Login successful');   //user instead of elert
                navigate('/');
                setUser({email:'', password:''});
            }else{
                toast.error(data.message);   //user instead of elert
                console.log(response, data)
            }

        } catch (error) {
            console.log('An error occured:\n',error);
        }
    }

    return (
    <section>
            <main>
                <div className="section-login">
                    <div className="container grid drid-four-cols">
                        <div className="login-image">
                            <img src="/images/Dodge Challenger.jpg" alt="login Image" width='600' height='500' />
                        </div>

                        <div className="login-form">
                            <h1 className="main-heading">Login form</h1><br/>

                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email">email</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="Enter email" 
                                        id="email" 
                                        value={user.email} 
                                        required 
                                        autoComplete="off"
                                        onChange={handleInput}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">password</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        placeholder="Enter password" 
                                        id="password" 
                                        value={user.password} 
                                        required 
                                        autoComplete="off"
                                        onChange={handleInput}
                                />
                                </div><br/>
                                <button type="submit" className="submit">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Login;