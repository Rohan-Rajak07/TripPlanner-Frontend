import { useNavigate } from 'react-router-dom';
import Navbar from './../component/Navbar';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';


const HomePage = () => {

  const navigate = useNavigate();
  const{isLogin}=useContext(AppContext)

  return (
    <div className='h-screen bg-white'>
    <Navbar/>
    <div className="bg-white h-[90%] flex flex-col items-center justify-center">
      {/* Header Text */}
      <div className="text-center max-w-5xl px-4 ">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
          <span className="text-red-500">Discover Your Next Adventure with AI:</span>{" "}
          <div className='h-3'></div>
          <span className="text-black ">Personalized Itineraries at Your Fingertips</span>
        </h1>
        <p className="mt-4 text-gray-600 text-lg mt-5">
          Your personal trip planner and travel curator, creating custom itineraries
          tailored to your interests and budget.
        </p>
        <button onClick={()=>{isLogin ? navigate('/create-trip') : navigate('/login')}} className="mt-6 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition">
          Get Started, It’s Free
        </button>
      </div>
    </div>
    </div>
    
  )
}

export default HomePage


