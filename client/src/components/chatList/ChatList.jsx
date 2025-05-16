import { Link } from 'react-router-dom'
import './chatList.css'

const ChatList = () => {
  return (
    <div className='chatList'>
      <span className='title'> DASHBOARD </span>
      <Link to='/dashboard'> Create a new Chat </Link>
      <Link to='/'> Explore Chatterbox AI </Link>
      <Link to='/'> Contact </Link>
      <hr/>

      <span className='title'> RECENT CHATS </span>
      <div className="list">
        <Link to='/'> Chat title </Link>
        <Link to='/'> Chat title </Link>
        <Link to='/'> Chat title </Link>
        <Link to='/'> Chat title </Link>
        <Link to='/'> Chat title </Link>
        <Link to='/'> Chat title </Link>
        <Link to='/'> Chat title </Link>
        <Link to='/'> Chat title </Link>
      </div>
      <hr/>

      <div className="upgrade">
        <img src='/logo.png'/>
        <div className="texts">
          <span> Upgrade to Chatterbox AI Pro </span>
          <span> Get unlimited access to all premium features </span>
        </div>
      </div>
    </div>
  )
}

export default ChatList