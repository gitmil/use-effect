import React, { useState, useEffect } from "react";

import "./App.css";
import { async } from "q";

const initXY = {
  x:null, 
  y:null
};

const initProfile = {
  followers:null, 
  publicRepose: null
}

function App() {
  const [time, setTime] = useState(Date);
  const [xy, setXY] = useState(initXY);
  const [profile, setProfile] = useState(initProfile)

  const mouseMoveHandle = (event) => {
    setXY({
      x:event.clientX,
      y:event.clientY
    })
  }
  //https://api.github.com/users/techsithgit
  const getProfile = async () => {
    const response = await fetch('https://api.github.com/users/PPTech23');
    const json = await response.json();

    setProfile({  
      followers:json.followers, 
      publicRepose: json.public_repos
    })
  }
  
  useEffect(() => {
    window.addEventListener("mousemove",mouseMoveHandle )
  }, []);

  useEffect(() => {
    let handle = setInterval(()=>{
      setTime(Date)
    }, 1000)
    return () => clearInterval(handle);
  });

  useEffect(()=>{
    getProfile();
  }, [])



  return (
    <div className="App">
      <div>date and time: {time.toLocaleString()}</div>
      <button>Make me older</button>

      <h2>{`x: ${xy.x}, y: ${xy.y}`}</h2>
      <h2>{`followers: ${profile.followers},repose: ${profile.publicRepose}, `}</h2>
    </div>
  );
}

export default App;
