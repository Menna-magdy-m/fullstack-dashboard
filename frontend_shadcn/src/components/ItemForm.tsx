import React, { useState, useEffect } from 'react';
import type{ Item } from '../types';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface ItemFormProps {
  onSubmit: (item: Omit<Item, 'id' | 'sort_order'>) => void;
  editingItem?: Item | null;
  onCancel?: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit, editingItem, onCancel }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Use useEffect to update form fields when editingItem changes
  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name || '');
      setQuantity(editingItem.quantity.toString() || '');
      setPrice(editingItem.price.toString() || '');
      setDate(editingItem.date ? new Date(editingItem.date) : new Date());

      // Scroll to the form
      const formElement = document.getElementById('item-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Reset form when not editing
      setName('');
      setQuantity('');
      setPrice('');
      setDate(new Date());
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
      date: date.toISOString()
    });
    
    // Only reset if not in edit mode
    if (!editingItem) {
      setName('');
      setQuantity('');
      setPrice('');
      setDate(new Date());
    }
  };

  return (
    <Card className="p-6" id='item-form'>
      <h3 className="text-lg font-semibold mb-4">
        {editingItem ? 'Edit Item' : 'Add New Item'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
       
        <div className="space-y-2">
          <Label htmlFor="name">Item Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name"
            required
          />
        </div>

<div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              step="1"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
        </div>

        

        <div className="flex gap-2">
          <Button type="submit">
            {editingItem ? 'Update' : 'Add'} Item
          </Button>
          
          {editingItem && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default ItemForm;