
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = "https://trip-backend-pi.vercel.app";

    // Axios instance for authenticated requests
    const api = axios.create({
        baseURL: backendUrl,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    });

    const [destination, setDestination] = useState("");
    const [days, setDays] = useState("");
    const [budget, setBudget] = useState("");
    const [companions, setCompanions] = useState("");

    const [aiRes, setAiRes] = useState();
    const [userData, setUserData] = useState();
    const [isLogin, setIsLogin] = useState(false);
    const [myTrip, setMyTrip] = useState([]);

    const isAuth = async () => {
        try {

            const response = await api.get("/auth/is-auth");

            if (response.data.success) {

                setUserData(response.data.userData);
                setIsLogin(true);

            } else {

                setUserData(null);
                setIsLogin(false);

            }

        } catch (error) {

            console.error(
                "Authentication check failed:",
                error.response?.data || error.message
            );

            setUserData(null);
            setIsLogin(false);
        }
    };

    useEffect(() => {
        isAuth();
    }, []);

    const value = {
        backendUrl,
        api,

        destination,
        setDestination,

        days,
        setDays,

        budget,
        setBudget,

        companions,
        setCompanions,

        aiRes,
        setAiRes,

        userData,
        setUserData,

        isAuth,

        isLogin,
        setIsLogin,

        myTrip,
        setMyTrip
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

