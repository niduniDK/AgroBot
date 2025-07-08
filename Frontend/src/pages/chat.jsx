import { useEffect, useState } from 'react';
import attach from '../assets/attach.png';
import send from '../assets/send.png';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function Chat() {

  const tempMsg = "Hello this page is under development. Please check back later."
  const location = useLocation();
  const [typedMsg, setTypedMsg] = useState(location.state?.userMsg || "");
  const [messages, setMessages] = useState([]);
  

  const navigate = useNavigate();

  const MsgBox = ({ msg, isBot }) => {
    return (
      <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
        <p className={`text-black rounded-xl p-5 mx-8 my-3 ${isBot ? "text-left bg-green-300" : "text-right bg-green-50"}`}>{msg}</p>
      </div>
    );
  };

  
  const handleChat = async () => {
    if (typedMsg.trim() !== "") {
      const newUserMessage = { text: typedMsg, isBot: false };
      setMessages(prev => [...prev, newUserMessage]);
      
      try {
        const response = await fetch('http://localhost:8000/chatbot/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: typedMsg,
            history: messages
          })
        });

        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.statusText);
        }

        const data = await response.json();
        console.log("Response from bot: ", data);
        
        setTimeout(() => {
          setMessages(prev => [...prev, { text: data, isBot: true }]);
        }, 500);

      } catch (error) {
        console.error("Problem with fetching response: ", error);
        setTimeout(() => {
          setMessages(prev => [...prev, { text: tempMsg, isBot: true }]);
        }, 500);
      }
    }
  };

  useEffect(() => {
    const storedMsgs = localStorage.getItem("messages");
    if (storedMsgs){
      setMessages(JSON.parse(storedMsgs));
    }
  }, []);

  useEffect(() => {
    const storedMsgs = localStorage.getItem("messages");
    if (storedMsgs){
      setMessages(JSON.parse(storedMsgs));
    }
  },[])

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gradient-r from-green-950 to-blue-950">
        
        <div className="flex-1 overflow-y-auto p-5">
          {messages.map((msg, index) => (
            <MsgBox key={index} msg={msg.text} isBot={msg.isBot} />
          ))}
        </div>

        <div className="flex flex-row bg-gradient-r from-green-950 to-blue-950 items-center justify-center w-full h-auto p-3">
          <img src={attach} alt="" className="w-10 h-auto cursor-pointer" onClick={() => {
            localStorage.setItem("messages",JSON.stringify(messages));
            navigate('/send_details');
            }}/>
          <input
            type="text"
            id="user_msg"
            className="bg-green-50 text-black border-green-950 border-2 p-3 rounded-full w-2/3 m-3"
            required
            value={typedMsg}
            onChange={(e) => {
              setTypedMsg(e.target.value);
            }}
            onKeyDown={(e => {
              if (e.key === "Enter"){
                handleChat();
                setTypedMsg("");
              }
            })}
          />
          <img
            src={send}
            alt=""
            className="w-10 h-auto cursor-pointer"
            onClick={() => {
              handleChat();
              setTypedMsg("");
            }}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Chat;