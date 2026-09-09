import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/trip.png'
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const Navbar = () => {
  const{userData,setIsLogin,isLogin,backendUrl}=useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logOut=async()=>{

    try
    {
      const data=await axios.post(backendUrl+'/auth/logout');
      if(data.data.success)
      {
        toast.success(data.data.message);
        setIsLogin(false);
        navigate('/');
      }
    }catch(error)
    {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <nav className="flex justify-between items-center px-4 sm:px-6 py-3 shadow-md bg-white">
      {/* Left Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <img src={logo} alt="logo" className="w-8 h-8" />
        <span className="text-lg font-semibold">AI Trip Planner</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        <button
          onClick={() => {isLogin ? navigate('/create-trip') : navigate('/login')}}
          className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        >
          + Create Trip
        </button>
        <button
          onClick={() =>{isLogin ? navigate('/my-trip') : navigate('/login')}}
          className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        >
          My Trips🏄
        </button>
        {userData && isLogin ? (
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-black  text-white relative group">
            <p>{userData.name[0].toUpperCase()}</p>
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
              <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
                <li className="py-1 px-2 hover:bg-gray-200 cursor-pointer">
                  Verify email
                </li>
                <li
                  onClick={logOut}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-300 transition"
          >
            Log In🌍
          </button>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col justify-center items-center w-8 h-8"
        >
          {menuOpen ? (
            // Close icon
            <span className="text-2xl font-bold">&times;</span>
          ) : (
            // Hamburger icon
            <>
              <span className="block w-6 h-0.5 bg-black mb-1"></span>
              <span className="block w-6 h-0.5 bg-black mb-1"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
            </>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden flex flex-col space-y-2 p-4 z-50">
          <button
            onClick={() => {
              navigate("/create-trip");
              setMenuOpen(false);
            }}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition"
          >
            + Create Trip
          </button>
          <button
            onClick={() => {
              navigate("/my-trip");
              setMenuOpen(false);
            }}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition"
          >
            My Trips🏄
          </button>
          {userData && isLogin ? (
            <>
              <button
                onClick={logOut}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-200 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="px-6 py-2 bg-gray-100 rounded hover:bg-gray-300 transition"
            >
              Log In🌍
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
