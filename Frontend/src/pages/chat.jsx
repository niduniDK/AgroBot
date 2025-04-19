import React, { useEffect, useState } from 'react';
import attach from '../assets/attach.png';
import send from '../assets/send.png';
import { useLocation } from 'react-router-dom';

function Chat(){

    const tempMsg = "Hello this page is under development. Please check back later."

    const location = useLocation();

    const [userMsg, setUserMsg] = useState("");
    const [isUserMsg, setIsUserMsg] = useState(false);
    const [isBotMsg, setIsBotMsg] = useState(false);
    const [botMsg, setBotMsg] = useState(tempMsg);

    const fromVA = location.state?.fromVA;

    const MsgBox = ({ msg, sender, onRender }) => {
        useEffect(() => {
          if (onRender) onRender();
        }, []);
      
        return (
          <p>{msg}</p>
        );
      };
      

    const handleChat = () => {
        return (
          <MsgBox
            msg={userMsg}
            onRender={() => {
              console.log("MsgBox rendered!");
              setIsBotMsg(true);
            }}
          />
        );
      };
      
    
    useEffect(() => {
        return fromVA ? setUserMsg(location.state?.userMsg) : handleChat();
    });

    

    return (
        <div className="flex h-screen bg-gradient-r from-green-950 to-blue-950">
            <div className="flex flex-row absolute bottom-0 bg-gradient-r from-green-950 to-blue-950 items-center justify-center w-full h-auto m-2 ml-0 my-5">
                <img src={attach} alt="" className="w-12 h-auto cursor-pointer"/>
                <input type="text" id='user_msg' className="bg-green-50 text-black border-green-950 border-2 p-3 rounded-full w-2/3 m-5" required
                value={userMsg}
                onChange={(e) => {
                    setUserMsg(e.target.value);
                    setIsUserMsg(true);
                    setIsBotMsg(false);
                }}
                />
                <img src={send} alt="" className="w-12 h-auto cursor-pointer"
                onClick={handleChat}
                />
            </div>
        </div>
    )
}

export default Chat;