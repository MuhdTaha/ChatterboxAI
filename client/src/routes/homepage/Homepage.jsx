import { Link } from 'react-router-dom'
import { useState } from "react";
import { TypeAnimation } from 'react-type-animation'
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import './homepage.css'

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("Chris")

  const test = async () => {
    await fetch("http://localhost:5000/api/test", {
      credentials: "include",
    });
  };

  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate("/dashboard");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div className='homepage'> 
    <img src='/orbital.png' alt='' className='orbital'/>
      <div className="left">

        <h1> Chatterbox AI </h1>
        <h2> Supercharge your creativity and productivity! </h2>
        <h3> Unlock the power of intelligent conversations with Chatterbox AI! 
          Chat, learn, create, and grow—your journey starts here. </h3>

        <Link onClick={handleGetStarted} className='getStarted'> Get Started </Link>
      </div>

      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"> </div>
          </div>
          <img src='/bot3.png' alt='' className='bot'/>
          <div className="chat">
            <img src={typingStatus == "Chris" ? "/human1.jpeg" : 
              typingStatus == "Andy" ? "/human2.jpeg" : "/bot4.png"}/>
            <TypeAnimation
              sequence={[
                'Chris: What is the fastest land animal?',
                2000, () => {
                  setTypingStatus("Chatterbox");
                },
                'Chatterbox: The cheetah, reaching speeds up to 70 mph!',
                2000, () => {
                  setTypingStatus("Andy");
                },
                'Andy: Can octopuses change color?',
                2000, () => {
                  setTypingStatus("Chatterbox");
                },
                'Chatterbox: Yes, they use color-changing cells to camouflage!',
                2000, () => {
                  setTypingStatus("Chris");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <div className="links">
          <Link to='/'>Terms of Service</Link>
          <span> | </span>
          <Link to='/'>Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage