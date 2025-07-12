import { useEffect, useState } from 'react';
import attach from '../assets/attach.png';
import send from '../assets/send.png';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // Import highlight.js styles
import { useTranslation } from 'react-i18next';

function Chat() {

  const tempMsg = "Hello this page is under development. Please check back later."
  const welcomeMsg = " Upload an image or send your problem here!";
  const location = useLocation();
  const [typedMsg, setTypedMsg] = useState(location.state?.userMsg || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState("Hello");
  const [displayText, setDisplayText] = useState("");
 
  const [messages, setMessages] = useState([]);

  const {t, i18n} = useTranslation();
  const lang = localStorage.getItem('language') || 'en';

  const getPrediction = async () => {
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const response = await fetch("http://localhost:8000/diseases/predict_disease", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.prediction) {
      setMessages(prev => [
        ...prev,
        {
          text: `Here is the prediction based on your image: **${data.prediction}**`,
          isBot: true
        }
      ]);
        } else {
          alert("No prediction received. Please try again.");
        }
      } catch (error) {
        console.error("Error getting prediction:", error);
        alert("Prediction failed. Check console for details.");
      } finally {
        setSelectedFile(null);
      }
    };


    useEffect(() => {
      const storedMsgs = localStorage.getItem("messages");

      if (storedMsgs) {
          setMessages(JSON.parse(storedMsgs));
        } else {
          setMessages([
            { text: "Hello! How can I assist you today?", isBot: true }
          ]);
        }

      }, []);


  const MsgBox = ({ msg, isBot, image=null }) => {
    return (
      <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
        <div className={`text-black rounded-xl p-5 mx-8 my-3 ${isBot ? "text-left bg-green-300" : "text-right bg-green-50"}`}>
          {
            image ? (
              <img src={image} alt='Image Uploaded' className='max-w-xs rounded-lg' />
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {lang === "en"? msg: t(msg)}
              </ReactMarkdown>
            )
          }
          
        </div>
      </div>
    );
  };

  
  const handleChat = async () => {
    if (typedMsg.trim() !== "") {
      const newUserMessage = { text: typedMsg, isBot: false };
      const updatedMessages = [...messages, { text: typedMsg, isBot: false }];
        setMessages(updatedMessages);

        try {
          const response = await fetch('http://localhost:8000/chatbot/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: typedMsg,
              history: updatedMessages,
            }),
          });
          setTypedMsg(""); // Clear input field after sending message


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

  // Save messages to localStorage on every update
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

   useEffect(() => {
          let index = 0;
          const interval = setInterval(() => {
              setDisplayText((prevText) => prevText + welcomeMsg[index]);
              index++;
              if (index === welcomeMsg.length-1){
                  clearInterval(interval);
              }
          }, 50);
          return () => clearInterval(interval);
      },[]);

  return (
    <div className='min-h-screen bg-gradient-to-r from-green-950 to-blue-950'>
      <Navbar />
      <div className="text-3xl text-green-100 text-center">
          <p className="text-5xl text-green-100 text-center font-bold lg:mx-96 md:my-24">
            {lang === "en"? displayText : t(displayText)}
          </p>
      </div>
      <div className="flex flex-col min-h-96 bg-gradient-r from-green-950 to-blue-950">
        
        <div className="flex-1 overflow-y-auto p-5">
          {/* {messages.length === 0 && location.state?.botMsg && (
            <MsgBox
              msg={`Here is the prediction based on your image: **${location.state.botMsg}**`}
              isBot={true}
            />
          )} */}
          {messages.map((msg, index) => (
            <MsgBox key={index} msg={msg.text} image={msg.image ? msg.image : null} isBot={msg.isBot} />
          ))}
        </div>

        <div className="flex flex-row items-center justify-center w-full h-auto m-2 ml-0 my-5">
            <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        setSelectedFile(file);
                        getPrediction();
                    }
                }}
            />
            <label htmlFor="file-upload">
                <img
                    src={attach}
                    alt=""
                    className="w-10 h-auto cursor-pointer"
                />
            </label>
            
            <input
                type="text"
                id='msg'
                className="bg-green-50 text-black border-green-950 border-2 p-3 rounded-full w-2/3 m-5"
                required
                value={typedMsg}
                onChange={(e) => {
                    setTypedMsg(e.target.value);
                    setFromVA(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (selectedFile) {
                      getPrediction();
                    } else if (typedMsg.trim()) {
                      handleChat();
                    } else {
                      alert("Please type a message or attach a file before sending.");
                    }}}}
            />
            <img
                src={send}
                alt=""
                className="w-10 h-auto cursor-pointer"
                onClick={() => {
                    if (selectedFile) {
                        getPrediction();
                    } else if (typedMsg.trim() !== "") {
                        handleChat(); 
                    } else {
                        alert("Please type a message or attach a file before sending.");
                    }
                }}
            />
          </div>
        <Footer />
      </div>
    </div>
  );
}

export default Chat;