import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

/* eslint-disable jsx-a11y/img-redundant-alt */
const Register = ()=>{
    const [user, setUser] = useState({
        username:'',
        email:'',
        phone:0,
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
        user.phone = Number(user.phone);
        console.log(user);

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            console.log(response);

            const res_data = await response.json();
            console.log('data from server: ',res_data);

            if(response.ok){
                storeTokenInLS(res_data.token);
                setUser({username:'', email:'', phone:0, password:''});
                toast.success('Registration successful');   //user instead of elert
                navigate('/login')
            }else{
                toast.error(res_data.extraDetails? res_data.extraDetails : res_data.message);   //user instead of elert
            }
        } catch (error) {
            console.log('An error occuered: ', error);
        }
    }

    return (
    <section>
            <main>
                <div className="section-registration">
                    <div className="container grid drid-two-cols">
                        <div className="registration-image">
                            <img src="/images/Dodge Challenger.jpg" alt="Registration Image" width='600' height='500' />
                        </div>

                        <div className="registration-form">
                            <h1 className="main-heading">Registration form</h1><br/>

                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">username</label>
                                    <input 
                                        type="text" 
                                        name="username" 
                                        placeholder="Enter uername" 
                                        id="username" 
                                        value={user.username} 
                                        required 
                                        autoComplete="off"
                                        onChange={handleInput}
                                    />
                                </div>
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
                                    <label htmlFor="phone">phone</label>
                                    <input 
                                        type="number" 
                                        name="phone" 
                                        placeholder="Enter phone" 
                                        id="phone" 
                                        value={user.phone} 
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
                                <button type="submit" className="submit">Register Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Register;