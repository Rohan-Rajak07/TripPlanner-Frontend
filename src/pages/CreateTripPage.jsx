import { useContext, useState } from "react";
import Navbar from "../component/Navbar";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";



const CreateTripPage = () => {

  const{
    destination,setDestination,
    days,setDays,
    budget,setBudget,
    companions,setCompanions,
    setAiRes,
    userData,
    backendUrl
  }=useContext(AppContext);

  const[loading,setLoading]=useState(false);

  const navigate = useNavigate();


  const budgetOptions = [
    { value: "cheap", label: "Cheap", emoji: "💵", desc: "Stay conscious of costs" },
    { value: "moderate", label: "Moderate", emoji: "🪙", desc: "Keep cost on the average side" },
    { value: "luxury", label: "Luxury", emoji: "💎", desc: "Don’t worry about cost" },
  ];

  const companionOptions = [
    { value: "solo", label: "Just Me", emoji: "✈️", desc: "A sole travels in exploration" },
    { value: "couple", label: "A Couple", emoji: "💍", desc: "Two travels in tandem" },
    { value: "family", label: "Family", emoji: "🏠", desc: "A group of fun loving adv" },
    { value: "friends", label: "Friends", emoji: "⛵", desc: "A bunch of thrill-seekers" },
  ];

  const handleMyTrip=async(sendTrip)=>{
    const data=await axios.post(backendUrl+'/auth/add-trip',sendTrip);
    if(data.data.success)
    {
      // toast.success(data.data.message);
    }
    else
    {
      toast.error(data.data.message);
      setLoading(false);
    }

  }

  const handleSubmit = async(e) => 
    {
    e.preventDefault();
    setLoading(true);
    console.log(destination,days,budget,companions);
    axios.defaults.withCredentials=true
    const data=await axios.post(backendUrl+'/ai/generate-trip',{destination,days,budget,companions});
    if(data.data.success)
      {
        toast.success(data.data.message);
        setAiRes(data.data.aiResponse);
        setLoading(false);
        navigate('/ai-response');
        const sendTripDetails={destination,days,budget,companions,tripDetails: data.data.aiResponse};
        console.log(sendTripDetails);
        try
        {
          handleMyTrip(sendTripDetails)

        }catch(error)
        {
          console.log(error.message);
          setLoading(false);
        }
    }
    else
    {
      console.log(data.data.message)
      toast.error(data.data.message);
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="w-full px-4 sm:px-8 md:px-36 py-6 md:py-10">
  {/* Title */}
  <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-snug">
    Tell us your travel preferences 🏖️🌴🏄
  </h1>
  <p className="text-gray-500 mb-8 text-sm md:text-base">
    Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
  </p>

  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
    {/* Destination */}
    <div>
      <h2 className="block font-medium mb-2 text-base md:text-lg">What is your destination of choice?</h2>
      <input
        type="text"
        placeholder="e.g., Bali"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="w-full border rounded-lg p-2 text-sm md:text-base"
      />
    </div>

    {/* Days */}
    <div>
      <label className="block font-medium mb-2 text-base md:text-lg">
        How many days are you planning your trip?
      </label>
      <input
        type="text"
        placeholder="e.g., 3"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        className="w-full border rounded-lg p-2 text-sm md:text-base"
      />
    </div>

    {/* Budget */}
    <div>
      <label className="block font-medium mb-2 text-base md:text-lg">What is your budget?</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {budgetOptions.map((option) => (
          <div
            key={option.value}
            onClick={() => setBudget(option.value)}
            className={`border rounded-lg p-4 cursor-pointer hover:shadow-md ${
              budget === option.value ? "border-black bg-gray-100" : ""
            }`}
          >
            <div className="text-2xl">{option.emoji}</div>
            <h3 className="font-semibold">{option.label}</h3>
            <p className="text-sm text-gray-500">{option.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Companions */}
    <div>
      <label className="block font-medium mb-2 text-base md:text-lg">
        Who do you plan on traveling with?
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {companionOptions.map((option) => (
          <div
            key={option.value}
            onClick={() => setCompanions(option.value)}
            className={`border rounded-lg p-4 cursor-pointer hover:shadow-md ${
              companions === option.value ? "border-black bg-gray-100" : ""
            }`}
          >
            <div className="text-2xl">{option.emoji}</div>
            <h3 className="font-semibold">{option.label}</h3>
            <p className="text-sm text-gray-500">{option.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Submit Button */}
    <div className="flex justify-end">
      <button
        type="submit"
        className="bg-black text-white w-full sm:w-40 py-2 rounded-lg hover:bg-gray-800 text-sm md:text-base"
      >
        {loading ? <ClipLoader color="white" size={20} /> : "Generate Trip"}
      </button>
    </div>
  </form>
</div>
    </>
    
  );
};

export default CreateTripPage;

