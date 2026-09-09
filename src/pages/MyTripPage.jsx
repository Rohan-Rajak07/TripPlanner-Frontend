import { useContext, useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export default function MyTripPage() {

  const navigate = useNavigate();
  const{backendUrl}=useContext(AppContext);
  const [getTrips, setGetTrips] = useState([]);
  const [loading, setLoading] = useState(true);



  const getMyTrip=async()=>{
    try {
      setLoading(true);
      axios.defaults.withCredentials=true
      const data=await axios.get(backendUrl+'/auth/get-trip');
      if(data.data.success)
      {
          setGetTrips((data.data.getTrip).reverse());
      }
      else
      {
          toast.error(data.data.message);
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
      toast.error('Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    getMyTrip();
  },[])

  
  const budgetColors = {
    cheap: "text-green-700 bg-green-100",
    moderate: "text-yellow-700 bg-yellow-100",
    luxury: "text-red-700 bg-red-100",
  };

  return (
    <>
    <Navbar/>
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
    My Trips
  </h1>

  {loading ? (
    <div className="flex justify-center items-center h-40 sm:h-64">
      <div className="text-base sm:text-lg text-gray-600">Loading trips...</div>
    </div>
  ) : getTrips.length === 0 ? (
    <div className="text-center py-10 sm:py-12">
      <div className="text-gray-500 text-base sm:text-lg">No trips found</div>
      <button
        onClick={() => navigate("/create-trip")}
        className="mt-4 px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
      >
        Create Your First Trip
      </button>
    </div>
  ) : (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {getTrips.map((trip, index) => (
        <div
          onClick={() => {
            navigate("/res-mytrip", {
              state: { tripDetails: trip.tripDetails },
            });
          }}
          key={index}
          className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition duration-300 border border-gray-100 cursor-pointer hover:border-blue-400"
        >
          {/* Location */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="text-blue-500 text-base sm:text-lg">📍</span>
            <h2 className="font-semibold text-base sm:text-lg text-gray-900">
              {trip.destination}
            </h2>
          </div>

          {/* Days */}
          <div className="flex items-center gap-2 mb-1 sm:mb-2 text-gray-600 text-sm">
            <span>📅</span>
            <span>{trip.days} Days Trip</span>
          </div>

          {/* Companions */}
          <div className="flex items-center gap-2 mb-1 sm:mb-2 text-gray-600 text-sm">
            <span>🧍‍♂️</span>
            <span>
              {trip.companions} Companion
              {trip.companions > 1 ? "s" : ""}
            </span>
          </div>

          {/* Budget */}
          <div
            className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${budgetColors[trip.budget]}`}
          >
            💰 {trip.budget} Budget
          </div>
        </div>
      ))}
    </div>
  )}
</div>

    </>
  );
}
