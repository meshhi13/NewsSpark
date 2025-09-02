# NewsSpark

**NewsSpark** is a modern React-based news dashboard with a Python backend.  
It fetches real-time articles from [NewsAPI](https://newsapi.org), lets users save favorites in a **SQLite database**, and supports account login/sign-in.  


## Requirements

- **Frontend**:  
  - Node.js v16+  
  - npm or yarn  
- **Backend**:  
  - Python 3.9+
  - Flask and Flask-Cors
  - SQLite  


## Features

- **Search News**: Fetches articles from NewsAPI  
- **Responsive Dashboard**: Grid-based UI for browsing  
- **Save Articles**: Stores bookmarks in SQLite  
- **Clear Articles**: Remove all saved articles at once  
- **User Authentication**: Sign up and sign in support  
- **Expanded View**: Read articles in an animated overlay  
- **Framer Motion Animations**


## Project Structure

```sh
NewsSpark/
├── backend/
│ ├── endpoint.py
│ ├── accounts.db
│ └── ...
├── src/
│ ├── components/
│ │ └── NewsDashboard.jsx
│ │ └── ...
│ ├── hooks/
│ │ └── useAuth.js
│ │ └── ...
│ ├── assets/
│ │ └── ...
│ └── main.jsx
│ └── ...
```

## ⚙️ How to Run

### 1. Clone the repository
```
git clone https://github.com/meshhi13/NewsSpark.git  
cd NewsSpark
```

### 2. Set up the backend
```
cd python  
pip install -r requirements.txt
``` 

Start the backend (runs on **port 3100** by default):  
```
python endpoint.py
```

### 3. Set up the frontend
Open a new terminal:  
```sh
cd ../
npm install
```

Create a `.env` file in the project root:
```sh
VITE_API_BASE_URL=http://localhost:3100
VITE_NEWS_API_KEY=your_newsapi_api_key
```

Run the frontend:
```
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)


## 🖱️ How to Use

1. **Sign in / Sign up** with your credentials  
2. **Search** for news topics  
3. **Read** articles directly in the browser  
4. **Save** articles to your SQLite-backed account  
5. **View Saved** by toggling to your saved articles  
6. **Clear Saved** to wipe all bookmarks  
7. **Logout** to end session  
