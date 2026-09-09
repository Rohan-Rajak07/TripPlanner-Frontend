import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const AppContext=createContext();
import {toast} from 'react-toastify'

export const AppContextProvider=(props)=>{
    
    axios.defaults.withCredentials=true;
    const backendUrl="https://trip-backend-pi.vercel.app";

    const [destination, setDestination] = useState("");
    const [days, setDays] = useState("");
    const [budget, setBudget] = useState("");
    const [companions, setCompanions] = useState("");
    const[aiRes,setAiRes]=useState();
    const[userData,setUserData]=useState();
    const[isLogin,setIsLogin]=useState(false);
    const[myTrip,setMyTrip]=useState([])
    
    const isAuth=async()=>{
        const data=await axios.get(backendUrl+'/auth/is-auth');
        if(data.data.success)
        {
            setUserData(data.data.userData);
            setIsLogin(true);
            // toast.success(data.data.message);
        }
        else
        {
            toast.error(data.data.message);
        }
    }

    useEffect(() => {
        isAuth();
    }, []);





    const value={
        backendUrl,
        destination,setDestination,
        days,setDays,
        budget,setBudget,
        companions,setCompanions,
        aiRes,setAiRes,
        userData,setUserData,
        isAuth,
        isLogin,setIsLogin,
        myTrip,setMyTrip
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
