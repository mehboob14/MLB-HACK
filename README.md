STATVISION

Video Metrics Analyzer is a hackathon project, a web-based tool that extracts key metrics from videos using OpenCV and overlays them onto the video using MoviePy.
🚀 Features

✅ Upload video or provide a URL
✅ Extract metrics like pitch speed, launch angle, etc.
✅ Overlay extracted metrics on the video
✅ Download the processed video
🛠️ Tech Stack

    Frontend: React.js
    Backend: FastAPI
    Processing: OpenCV, MoviePy,Google Cloud

🔧 Setup Instructions

    Clone the repository
    Install dependencies for frontend & backend

cd frontend && npm install  
cd ../backend && pip install -r requirements.txt  

Run the backend

uvicorn main:app --reload  

Start the frontend

    cd frontend && npm start  

