import { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios'
import logo from '../assets/trip.png'
import { AppContext } from '../context/AppContext';
import { ClipLoader } from "react-spinners";



const LoginPage = () => {
  const navigate=useNavigate()

  const [state, setState] = useState("Sign Up");
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[loading, setLoading] = useState(false);

  const{isAuth,setIsLogin,backendUrl}=useContext(AppContext)
  // const { isAuth, setIsLogin } = useContext(AppContext);
  const onSubmitHandler= async(e)=>
  {
    try
    {
      e.preventDefault();
      axios.defaults.withCredentials=true
      setLoading(true);
      if(state==='Sign Up')
      {
        const data=await axios.post(backendUrl+'/api/auth/register',{name,email,password})
        if(data.data.success)
        {
          toast.success(data.data.message)
          setIsLogin(true);
          navigate('/')
          setLoading(false);
          isAuth();
        }
        else
        {
          toast.error(data.data.message)
          setLoading(false);
        }
      }
      else
      {
        const data=await axios.post(backendUrl+'/api/auth/login',{email,password})
        if(data.data.success)
        {
          toast.success(data.data.message);
          setIsLogin(true);
          navigate('/');
          setLoading(false);
          isAuth();
        }
        else
        {
          toast.error(data.data.message)
          setLoading(false);
        }
      }
    }catch(error)
    {
      console.log(error.message);
      toast.error(error.message)
      setLoading(false);
    }
  }



  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm: px-0 bg-gradient-to-br from-gray-200 to-orange-700">
      <img
        src={logo}
        alt=""
        className="absolute top-8 left-10 w-12 sm: w-14"
        onClick={()=>navigate('/')}
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account!"}
        </p>
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img
                src="https://static.thenounproject.com/png/person-icon-4851855-512.png"
                className="w-4"
              />
              <input
                className="bg-transparent outline-none w-full"
                onChange={(e)=>setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img
              src="https://static.thenounproject.com/png/email-icon-7814370-512.png"
              className="w-4"
            />
            <input
              className="bg-transparent outline-none w-full"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email id"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img
              src="https://static.thenounproject.com/png/lock-icon-4945832-512.png"
              className="w-4"
            />
            <input
              className="bg-transparent outline-none w-full"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <p className="mb-4 text-indigo-500 cursor-pointer"
          onClick={()=>navigate('/')}
          >Forgot password?</p>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            {loading ? <ClipLoader color="white" size={20} /> : state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">Already have an account?
            <span className="text-blue-400 cursor-pointer underline"
            onClick={()=>setState('LogIn')}
            >Login here</span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">Don't have an account?
            <span className="text-blue-400 cursor-pointer underline"
            onClick={()=>setState('Sign Up')}
            >Create account</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
