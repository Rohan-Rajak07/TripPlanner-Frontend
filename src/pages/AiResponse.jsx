import React from 'react'
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import Navbar from '../component/Navbar';

const AiResponse = () => {

    const{aiRes}=useContext(AppContext);
  return (
    <>
    <Navbar/>
    {aiRes ? 
    <iframe
    srcDoc={aiRes} // HTML string from API
      style={{ width: "100%", height: "100vh", border: "none" }}
      title="Trip Plan"
    />
    : <p>Trip Loading</p>
}


    </>
  )
}

export default AiResponse