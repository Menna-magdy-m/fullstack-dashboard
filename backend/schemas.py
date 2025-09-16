from pydantic import BaseModel
from datetime import datetime

class ItemCreate(BaseModel):
    name: str
    quantity: int
    price: float
    date: datetime

class ItemResponse(ItemCreate):
    id: int
    sort_order: int
    
class VideoResponse(BaseModel):
    id: int
    filename: str
    uploaded_at: datetime