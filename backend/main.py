from fastapi import FastAPI, Depends, HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from database import get_db, init_db
from models import Item, Video
from schemas import ItemCreate, ItemResponse, VideoResponse
import shutil
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# CORS middleware 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)

# Create uploads directory
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.on_event("startup")
def on_startup():
    init_db()

@app.post("/items/", response_model=ItemResponse)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    # Calculate new sort order
    last_position = db.query(Item.sort_order).order_by(Item.sort_order.desc()).first()
    new_sort_order = (last_position[0] + 1) if last_position else 0
    
    db_item = Item(
        name=item.name,
        quantity=item.quantity,
        price=item.price,
        date=item.date,
        sort_order=new_sort_order
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.get("/items/", response_model=list[ItemResponse])
def read_items(db: Session = Depends(get_db)):
    return db.query(Item).order_by(Item.sort_order).all()

@app.put("/items/{item_id}", response_model=ItemResponse)
def update_item(item_id: int, item: ItemCreate, db: Session = Depends(get_db)):
    db_item = db.query(Item).filter(Item.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    db_item.name = item.name
    db_item.quantity = item.quantity
    db_item.price = item.price
    db_item.date = item.date
    
    db.commit()
    db.refresh(db_item)
    return db_item

@app.delete("/items/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(Item).filter(Item.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    db.delete(db_item)
    db.commit()
    return {"message": "Item deleted"}





@app.put("/items/reorder/")
def reorder_items(item_ids: list[int], db: Session = Depends(get_db)):
    """
    Update sort_order based on the provided list of item IDs
    The order of the list represents the new sort order
    """
    try:
        for index, item_id in enumerate(item_ids):
            db_item = db.query(Item).filter(Item.id == item_id).first()
            if db_item:
                db_item.sort_order = index
        db.commit()
        return {"message": "Items reordered successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error reordering items: {str(e)}")

@app.get("/videos/", response_model=list[VideoResponse])
def get_videos(db: Session = Depends(get_db)):
    return db.query(Video).all()
    
@app.post("/upload-video/")
async def upload_video(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Validate file size (max 100MB)
    MAX_FILE_SIZE = 100 * 1024 * 1024  # 100MB
    
    # Read file content to get size
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File size exceeds 100MB limit"
        )
    
    # Reset file pointer
    await file.seek(0)
    
    file_path = f"uploads/{file.filename}"
    
    # Create uploads directory if it doesn't exist
    os.makedirs("uploads", exist_ok=True)
    
    with open(file_path, "wb") as buffer:
        # Write the content we already read
        buffer.write(content)
    
    db_video = Video(filename=file.filename, filepath=file_path)
    db.add(db_video)
    db.commit()
    db.refresh(db_video)
    
    return {"filename": file.filename, "id": db_video.id}

@app.delete("/videos/{video_id}")
def delete_video(video_id: int, db: Session = Depends(get_db)):
    db_video = db.query(Video).filter(Video.id == video_id).first()
    if not db_video:
        raise HTTPException(status_code=404, detail="Video not found")
    
    # Delete the file from storage
    try:
        if os.path.exists(db_video.filepath):
            os.remove(db_video.filepath)
    except Exception as e:
        print(f"Error deleting file: {e}")
    
    # Delete from database
    db.delete(db_video)
    db.commit()
    
    return {"message": "Video deleted successfully"}