export interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
  date: string;
  sort_order: number;
}

export interface ReorderResponse {
  message: string;
}

export interface Video {
  id: number;
  filename: string;
  filepath: string;
  uploaded_at: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}