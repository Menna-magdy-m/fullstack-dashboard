import React, { useState, useEffect } from 'react';
import type{ Item } from '../types';

interface ItemFormProps {
  onSubmit: (item: Omit<Item, 'id' | 'sort_order'>) => void;
  editingItem?: Item | null;
  onCancel?: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit, editingItem, onCancel }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');

  // Use useEffect to update form fields when editingItem changes
  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name || '');
      setQuantity(editingItem.quantity.toString() || '');
      setPrice(editingItem.price.toString() || '');
      setDate(editingItem.date ? editingItem.date.split('T')[0] : '');
    } else {
      // Reset form when not editing
      setName('');
      setQuantity('');
      setPrice('');
      setDate('');
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name || !quantity || !price || !date) {
      alert('Please fill in all fields');
      return;
    }
    // Parse quantity as integer
    const quantityValue = parseInt(quantity, 10);
    if (isNaN(quantityValue) || quantityValue < 0) {
      alert('Please enter a valid quantity (whole number)');
      return;
    }

    // Parse price as float
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue < 0) {
      alert('Please enter a valid price');
      return;
    }
    onSubmit({
      name,
      quantity: quantityValue,
      price: priceValue,
      date: new Date(date).toISOString()
    });
    
    // Only reset if not in edit mode
    if (!editingItem) {
      setName('');
      setQuantity('');
      setPrice('');
      setDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        {editingItem ? 'Edit Item' : 'Add New Item'}
      </h3>
      {/* Debug info - remove in production */}
      {editingItem && (
        <div className="mt-4 p-2 bg-gray-100 rounded text-xs text-gray-600">
          Editing Item ID: {editingItem.id} ,Name:{name}<br />
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-700">Item Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Enter item name"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Quantity</label>
          <input
            type="number"
            step="1"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Price ($)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {editingItem ? 'Update' : 'Add'} Item
        </button>
        
        {editingItem && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      
    </form>
  );
};

export default ItemForm;