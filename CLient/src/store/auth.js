import { createContext, useContext, useEffect, useState } from "react";  // ther constext should wrap the index.js

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState('');
    const authToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken) =>{
        setToken(serverToken);
        return localStorage.setItem('token',serverToken);
    }

    const isLoggedin = !!token; //checking for token exists or not

    const LogoutUser = ()=>{
        setToken('');
        setUser('');
        return localStorage.removeItem('token');
    }

    const userAuthentication = async ()=>{
        try {
            const response = await fetch('http://localhost:5000/api/auth/user', {
                method: 'GET',
                headers: {
                    Authorization: authToken,
                }
            });

            if(response.ok){
                const data = await response.json();
                setUser(data.userData);
                setIsLoading(false);
                console.log(user);
            }else{
                setIsLoading(false);
            }

        } catch (error) {
            console.log('An error occured: ', error);
        }
    }

    const getServices = async ()=>{
        try {
            const response = await fetch('http://localhost:5000/api/data/service',{
                method:'GET'
            });

            if(response.ok){
                //console.log(response);

                const data = await response.json();
                //console.log(data.msg)
                setServices(data.msg);
            }
        } catch (error) {
            console.log('Error while fetching srevices:\n',error);
        }
    }

    // to get loggen in user data
    useEffect(()=>{
        userAuthentication();
        getServices();
    },[]);

    return (
        <AuthContext.Provider value={{isLoggedin, storeTokenInLS, LogoutUser, user, services, authToken, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{  // making custom hook
    const AuthContextValue = useContext(AuthContext);
    if(!AuthContextValue){
        throw new Error('useAuth used outside of the provider');
    }
    return AuthContextValue;
}