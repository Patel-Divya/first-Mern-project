import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

// about

const About = ()=>{
    const [uname, setUname] = useState('');

    const {user} = useAuth();

    useEffect(()=>{
        setUname(user.username);
    });

    return (
        <div>
            <h1>Hii {uname}</h1>
            <h1>This is about page</h1>
        </div>
    )
}

export default About;