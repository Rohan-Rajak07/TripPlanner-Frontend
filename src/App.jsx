
import { Routes, Route } from "react-router-dom";
import CreateTripPage from "./pages/CreateTripPage";
import MyTripPage from "./pages/MyTripPage";
import HomePage from "./pages/HomePage";
import AiResponse from "./pages/AiResponse";
import LoginPage from "./pages/LoginPage";
import ResOfMyTrip from "./pages/ResOfMyTrip";
import{ToastContainer} from 'react-toastify'
const App = () => {
  return (
    <>
    <ToastContainer autoClose={1200}/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/create-trip" element={<CreateTripPage />} />
      <Route path="/my-trip" element={<MyTripPage />} />
      <Route path="/ai-response" element={<AiResponse />} />
      <Route path="/res-mytrip" element={<ResOfMyTrip />} />
    </Routes>    
    </>
  )
}

export default App