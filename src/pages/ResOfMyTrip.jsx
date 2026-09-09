import React from 'react'
import { useLocation } from 'react-router-dom'

const ResOfMyTrip = () => {
  const location = useLocation();
  const { tripDetails } = location.state || {};
  return (
    <>
        <iframe
        srcDoc={tripDetails} // HTML string from API
        style={{ width: "100%", height: "100vh", border: "none" }}
        title="Trip Plan"
        />
    </>
  )
}

export default ResOfMyTrip