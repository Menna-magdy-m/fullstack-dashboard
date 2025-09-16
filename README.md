# Full-Stack Dashboard Application

A modern full-stack web application built with React + Vite + Typescript (Frontend) and Python FastAPI (Backend) for managing items and uploading videos with drag-and-drop functionality.


## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package manager)
- **Git**

##  Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Menna-magdy-m/fullstack-dashboard.git
cd fullstack-dashboard
```
### 2. Backend Setup

```bash

# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

# Install Python dependencies
pip install fastapi uvicorn sqlalchemy python-multipart

# Initialize the database
python -c "from database import init_db; init_db()"

# Start the backend server
uvicorn main:app --reload --port 8000
```
The backend will be running on http://localhost:8000

3. Frontend Setup
Open a new terminal window and navigate to the project root:

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```
The frontend will be running on http://localhost:5173


### Features
#### Item Management
✅ Add new items with form validation

✅ Edit existing items

✅ Delete items

✅ Drag-and-drop reordering

✅ Persistent sort order

#### Video Management
✅ Upload video files (max 100MB)

✅ Real-time upload progress bar

✅ Video player with controls

✅ Delete videos


#### User Interface
✅ Responsive dashboard layout

✅ Fixed sidebar navigation

✅ Clean, modern design

✅ Loading states and error handling


###  Usage
Access the Application: Open http://localhost:5173 in your browser

#### Manage Items:

Use the form to add new items (name, quantity, price, date)

Drag items to reorder them

Click edit/delete buttons for item actions

#### Upload Videos:

Navigate to Videos page using sidebar

Select a video file (max 100MB)

Monitor upload progress

Use video player controls to play videos


## License
[MIT](https://choosealicense.com/licenses/mit/)
