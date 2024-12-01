import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import Button from '../ui/Button';

function BrandCard({ brand, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <img
          src={brand.logo}
          alt={`${brand.name} logo`}
          className="w-16 h-16 object-contain"
        />
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(brand)}
            className="flex items-center"
          >
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(brand.id)}
            className="flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{brand.name}</h3>
      <p className="text-gray-600">{brand.description}</p>
    </div>
  );
}

export default BrandCard;
