import './dashboard.css'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'

const Dashboard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (text) => {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Failed to create chat");
      return res.json();
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const text = e.target.text.value;
    
    if(!text) return;

    mutation.mutate(text);
  };

  return (
    <div className='dashboard'>
      <div className="texts"> 
        <div className="logo">
          <img src='/logo_main.png'/>
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
          <button type='submit'>
            <img src='/arrow.png'/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard