# AgroBot 🌱 🤖

**AgroBot** is an innovative and intelligent platform designed to assist farmers, gardeners, and agricultural enthusiasts in managing plant diseases, pests, and other horticultural issues. By combining cutting-edge technologies like AI, machine learning, and user-friendly web interfaces, AgroBot provides actionable insights, disease detection, and solutions tailored to your agricultural needs.

### 🌟 **Key Features**
- **Disease Detection:** Leverage image recognition and data analysis to detect and identify common plant diseases, pests, and environmental stress factors.
- **Expert Solutions:** Access tailored solutions, including cultural practices and chemical treatments, to mitigate plant issues effectively.
- **Real-Time Information:** Get up-to-date information on local climate conditions, pest outbreaks, and seasonal agricultural challenges.
- **Comprehensive Disease Data:** Detailed descriptions, images, and preventive measures for various plant diseases from around the world.

### 🌿 **Technologies Used**
- **Frontend:** React, Vite, Framer Motion
- **Backend:** FastAPI
- **Machine Learning:** TensorFlow (for disease detection using images)

### 🚀 **Getting Started**

Clone the repository and follow these steps to get the project up and running locally.

#### 1. Clone the Repository
```bash
git clone https://github.com/niduniDK/AgroBot.git
cd AgroBot
```
### 2. Backend (FastAPI)
1. Navigate to the backend folder.

2. Install the required Python dependencies.

```bash
cd Backend
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
pip install -r requirements.txt
```

### 3. Run the FastAPI server:

```bash
uvicorn main:app --reload
```

### 3. Frontend (React)
1. Navigate to the frontend folder.

2. Install the required dependencies.
```bash
cd Frontend
npm install
```
3. Run the development server:
```bash
npm run dev
```

### 🌍 How AgroBot Helps Farmers
*. Disease Identification: By simply uploading images of affected plants, AgroBot analyzes the plant and suggests possible diseases.

*. Tailored Recommendations: AgroBot generates personalized solutions for each disease, whether it’s through cultural practices or chemical treatments via our AI-powered virtual assistant.

*. Tracking Plant Health: Keep track of plant health over time and get insights into the best care practices based on your region’s climate and soil conditions.

*. Integrated Chatbot: A conversational interface to provide instant recommendations to users in real-time.


### 📈 Future Plans
*. Add local language support
*. Offline App Mode

## Screen Images

<p align="center">
  <em>Login page of AgroBot</em><br/><br/>
  <img src=".\Frontend\src\assets\screen-image-4.png" alt="Landing Page" width="600"><br/><br/>
  <img src=".\Frontend\src\assets\screen-image-5.png" alt="Landing Page" width="600"><br/><br/>
  <br>

</p>


<p align="center">
  <em>Landing page of AgroBot</em><br/><br/>
  <img src=".\Frontend\src\assets\screen-image-1.png" alt="Landing Page" width="600"><br/><br/>
  <img src=".\Frontend\src\assets\screen-image-2.png" alt="Landing Page" width="600"><br/><br/>
  <img src=".\Frontend\src\assets\screen-image-3.png" alt="Landing Page" width="600"><br/><br/>
  <br>

</p>

<p align="center">
  <em>Virtual Assistant Page of AgroBot</em><br/><br/>
  <img src=".\Frontend\src\assets\screen-image-6.png" alt="Landing Page" width="600"><br/><br/>
  <br>

</p>

<p align="center">
  <em>Chat Interface of AgroBot (Chatbot and Virtual Assistant is under development)</em><br/><br/>
  <img src=".\Frontend\src\assets\screen-image-7.png" alt="Landing Page" width="600"><br/><br/>
  <br>

</p>

<p align="center">
  <em>Page for letting users to send details about crop diseases</em><br/><br/>
  <img src=".\Frontend\src\assets\screen-image-8.png" alt="Landing Page" width="600"><br/><br/>
  <br>

</p>

Thank you for visiting AgroBot! Let's grow a healthier, more sustainable world 🌍🌱.
