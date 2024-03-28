import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function ChangeAddress() {
    const [address, setAddress] = useState("")
  let navigate = useNavigate()
  let userEmail = localStorage.getItem("userEmail");

  const handleClick = async (e) => {
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, req) => {
        navigator.geolocation.getCurrentPosition(res, req);
      });
    }
    let latlong = await navLocation().then(res => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude]
    })
    // console.log(latlong)
    let [lat, long] = latlong
    console.log(lat, long)
try{
      const response = await fetch("https://mernback-jcis.onrender.com/api/auth/getlocation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ latlong: { lat, long } })

    });
    
    const {location}=await response.json();
    console.log("this is location ",location);
    setAddress(location);
  }catch(err){
    console.error("there is an error: ",err)
  }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://mernback-jcis.onrender.com/api/auth/chAddr", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail, location: address })
      });
      const json = await response.json();
      console.log('this is json',json);
      if (json.success) {
        console.log('it is the new location', address);
        
        localStorage.setItem('location', address);
        navigate("/");
      } else {
        alert("Enter Valid Credentials");
      }
    } catch (error) {
      console.error("Failed to fetch or process data:", error);
      // Handle the error as needed
      alert("Failed to update address. Please try again.");
    }
  }
  

  const onChange = (e) => {
    
    setAddress(e.target.value)
  }
  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputAddress" className="form-label">New Address</label>
            <input type="text" className="form-control" name='address' placeholder={localStorage.getItem('location')} value={address} onChange={onChange} aria-describedby="emailHelp" />
            <div id="addressHelp" className="form-text">We'll never share your address with anyone.</div>
          </div>
          <div className="m-3">
              <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-success">Click for current Location </button>
        </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
        </form>

      </div>
    </div>
  )
}
