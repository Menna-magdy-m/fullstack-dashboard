import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type{ Item } from '../types';

interface SortableItemProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ item, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex justify-between items-start p-4 border-b border-gray-200 bg-white hover:bg-gray-50"
    >
      {/* Drag handle area */}
      <div {...listeners} className="cursor-move flex-1">
        <h4 className="font-medium text-gray-900">{item.name}</h4>
        <div className="text-sm text-gray-600 space-y-1 mt-1">
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price.toFixed(2)}</p>
          <p>Date: {new Date(item.date).toLocaleDateString()}</p>
          
        </div>
      </div>
      
      {/* Buttons area - NOT part of drag handle */}
      <div className="flex gap-2 ml-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item);
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors whitespace-nowrap"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors whitespace-nowrap"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SortableItem;