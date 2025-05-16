import './chat.css'
import NewPrompt from '../../components/newPrompt/NewPrompt';

const Chat = () => {

  return (
    <div className='chatPage'>
      <div className="wrapper">
        <div className="chat">
          <div className="message user"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam doloribus enim tempora. Explicabo esse ex natus ullam delectus quo reiciendis ad? Praesentium quis architecto id nulla soluta, incidunt assumenda mollitia? </div>
          <div className="message"> Test message from AI</div>
          <div className="message user"> Test message from user</div>

          <div className="message"> Test message from AI</div>
          <div className="message user"> Test message from user</div>
          <div className="message"> Test message from AI</div>
          <div className="message user"> Test message from user</div>
          
          <NewPrompt/>
        </div>
      </div>
    </div>
  )
}

export default Chat