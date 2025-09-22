import React, { useState, useEffect } from 'react';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import type { Item } from '../types';
import { api, reorderItems } from '../services/api';

const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.get('/items/');
      // Sort items by sort_order on fetch
      const sortedItems = response.data.sort((a: Item, b: Item) => a.sort_order - b.sort_order);
      setItems(sortedItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleCreateItem = async (itemData: Omit<Item, 'id' | 'sort_order'>) => {
    try {
      await api.post('/items/', itemData);
      fetchItems();
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleUpdateItem = async (itemData: Omit<Item, 'id' | 'sort_order'>) => {
    if (editingItem) {
      try {
        await api.put(`/items/${editingItem.id}`, itemData);
        setEditingItem(null);
        fetchItems();
      } catch (error) {
        console.error('Error updating item:', error);
      }
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await api.delete(`/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleReorder = async (newItems: Item[]) => {
    // Update local state immediately for smooth UI
    setItems(newItems);
    
    // Save new order to backend
    try {
      setIsSavingOrder(true);
      const itemIds = newItems.map(item => item.id);
      await reorderItems(itemIds);
      console.log('Sort order saved successfully');
    } catch (error) {
      console.error('Error saving sort order:', error);
      // Revert to previous order if save fails
      fetchItems();
    } finally {
      setIsSavingOrder(false);
    }
  };

  return (
    <div className="p-2">
      <div className="border-b pb-4 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Items Management</h2>
          {isSavingOrder && (
            <div className="flex items-center text-sm text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Saving order...
            </div>
          )}
        </div>
      </div>
      
      <div className=" mx-auto">
        <ItemForm
          onSubmit={editingItem ? handleUpdateItem : handleCreateItem}
          editingItem={editingItem}
          onCancel={handleCancelEdit}
        />
        
        <ItemList
          items={items}
          onEdit={handleEdit}
          onDelete={handleDeleteItem}
          onReorder={handleReorder}
        />
      </div>
    </div>
  );
};

export default ItemsPage;