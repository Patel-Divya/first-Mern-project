/* eslint-disable jsx-a11y/iframe-has-title */
import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

/* eslint-disable jsx-a11y/img-redundant-alt */
const Contact = ()=>{
    const [ contact, setContact] = useState({
        username:'',
        email:'',
        message:''
    });

    const [userData, setUserData] = useState(true);

    const {user} = useAuth();
    if(userData && user){
        setContact({
            username: user.username,
            email: user.email,
            message: ''
        });

        setUserData(false);
    }

    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setContact({
            ...contact, // if there are any previous operator/value, it will use it.
            [name]: value,  // using [] brackets for dynamic data
        });

        //console.log(user);
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        //console.log(contact);

        try {
            const response = await fetch('http://localhost:5000/api/form/contact',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contact)
            });

            if(response.ok){
                setContact({
                    username: user.username,
                    email: user.email,
                    message: ''
                });

                const data = await response.json();
                toast.success(data.message);
            }
            
        } catch (error) {
            toast.error('Message not sent...!')
            console.log('An error occuered: ',error);
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
                                        value={contact.username} 
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
                                        value={contact.email} 
                                        required 
                                        autoComplete="off"
                                        onChange={handleInput}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message">message</label>
                                    <input 
                                        type="text" 
                                        name="message" 
                                        placeholder="Enter message" 
                                        id="message" 
                                        value={contact.password} 
                                        required 
                                        autoComplete="off"
                                        onChange={handleInput}
                                />
                                </div><br/>
                                <button type="submit" className="submit">Send</button>
                            </form>
                        </div>
                    </div>
                </div>

                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.4373874435905!2d73.171475075105!3d22.33710784156063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc929fa350611%3A0x548a7c3179fbd369!2sRoses%20Nursery!5e0!3m2!1sen!2sin!4v1720955851468!5m2!1sen!2sin" 
                    width="100%" 
                    height="450" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </main>
        </section>
    )
}

export default Contact;