import React, { useState } from 'react';
import { data, useNavigate } from 'react-router-dom';

function Form() {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!selectedFile) {
//       alert("Please select a file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     fetch("http://localhost:8000/upload", {
//       method: "POST",
//       body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log("Upload success", data);
//       alert("File uploaded successfully.");
//     })
//     .catch(error => {
//       console.error("Error uploading file:", error);
//     });
//   };

    const [district, setDistrict] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState("Hello");

    const getPrediction = async () => {

        const formData = new FormData();
        formData.append("file", selectedFile);

        fetch(`http://localhost:8000/predict_disease`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.prediction){
                setPrediction(data)
                console.log("Prediction received:", toString(data));
                alert(`Prediction: ${data}`);
            }else {
                alert("No prediction received. Please try again.");
            }
            
        })
        .catch(error => {
            console.error("Error getting prediction:", error);
        })
    }

    const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-950 to-blue-950 p-4">
        <div className='flex flex-col bg-slate-100 bg-opacity-70 rounded-lg shadow-lg p-5'>
            <div className="flex flex-col items-center justify-center mt-2 mx-5">
                <label htmlFor="district" className="text-lg text-black mt-2 font-bold">District</label>
                <input type="text" id="district" placeholder="Enter your District" required className="text-black mt-2 p-2 w-full bg-slate-50 border-slate-800 rounded-lg"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                />
            </div>
            <div className='flex flex-col items-center justify-center mt-2 mx-5'>
                <label htmlFor="district" className="text-lg text-black mt-5 font-bold">Enter an image(photo) of the plant/leaf of the plant</label>
                <div className='flex flex-row m-5'>
                <input type="file" onChange={e => setSelectedFile(e.target.files[0])} />
                <button
                    className="bg-green-600 text-white hover:bg-green-700 p-2 rounded"
                    onClick={() => setSelectedFile(document.getElementById('file').files[0])}
                >
                    Upload
                </button>
            </div>
            </div>
            
            
            <div className="flex flex-col items-center justify-center mt-2 mx-5">
                <label htmlFor="description" className="text-lg text-black m-3 font-bold">Description</label>
                <textarea
                id="description"
                placeholder="Enter your Description"
                required
                className="text-black mt-2 p-2 w-full bg-slate-50 border-slate-800 rounded-lg resize-none overflow-hidden"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`
                }}
                />
            </div>
            <button
                className="bg-green-600 text-white hover:bg-green-700 p-2 mx-5 my-10 rounded"
                onClick={() => {
                    if (district && description) {
                        alert(`District: ${district}, Description: ${description}`);
                    } else {
                        alert("Please fill in all fields.");
                    }
                    setDescription("");
                    setDistrict("");
                    setSelectedFile(null);
                    getPrediction();
                    alert("Prediction: ",prediction);
                    navigate('/chat', {state : {userMsg: description}});
                }}
            >
                Submit
            </button>
            <button
                className="bg-green-50 text-green-800 border-green-800 hover:text-green-50 hover:bg-green-800 border-2 mx-5 mt-0 mb-10 h-10 rounded"
                onClick={() => {
                    navigate(-1);
                }}
            >
                Close
            </button>
        </div>
        
    </div>
  );
}

export default Form;
