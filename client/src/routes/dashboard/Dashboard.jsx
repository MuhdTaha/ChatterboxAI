import './dashboard.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import ChatList from '../../components/chatList/chatList'


const Dashboard = () => {

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const text = e.target.text.value;
    
    if(!text) return;

    await fetch("http://localhost:3000/api/chats", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({text}),
    });
  };

  return (
    <div className='dashboard'>
      <div className="texts"> 
        <div className="logo">
          <img src='/logo.png'/>
          <h1> CHATTERBOX AI </h1>
        </div>
        <div className="options">
          <div className="option"> 
            <img src='/chat.png'/>
            <span> Create a New Chat </span>
          </div>
          <div className="option"> 
            <img src='/image.png'/>
            <span> Analyze Images </span>
          </div>
          <div className="option"> 
            <img src='/code.png'/>
            <span> Help me learn Javascript </span>
          </div>
        </div>
      </div>
      <div className="formContainer"> 
        <form onSubmit={handleSubmit}>
          <input type='text' name='text' placeholder='Ask me anything...'/>
          <button>
            <img src='/arrow.png'/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard