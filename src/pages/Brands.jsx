import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useBrandStore } from '../store/brandStore';
import BrandCard from '../components/brands/BrandCard';
import BrandForm from '../components/brands/BrandForm';
import Button from '../components/ui/Button';
import SearchInput from '../components/ui/SearchInput';
import Modal from '../components/ui/Modal';

const Brands = () => {
  const { brands, addBrand, updateBrand, deleteBrand } = useBrandStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');

  const handleSubmit = (data) => {
    if (editingBrand) {
      updateBrand(editingBrand.id, data);
    } else {
      addBrand({
        id: Math.random().toString(36).substr(2, 9),
        userId: '1',
        createdAt: new Date().toISOString(),
        ...data,
      });
    }
    setIsFormOpen(false);
    setEditingBrand(null);
  };

  const handleEdit = (brand) => {

    setEditingBrand(brand);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      deleteBrand(id);
    }
  };

  const filteredBrands = brands
    .filter((brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const brandArray = [
    { id: Math.random().toString(36).substr(2, 9), name: 'Brand 1', description: 'Description 1', logo: 'https://via.placeholder.com/150', userId: '1', createdAt: '2022-01-01T00:00:00.000Z' },
    { id: Math.random().toString(36).substr(2, 9), name: 'Brand 2', description: 'Description 2', logo: 'https://via.placeholder.com/150', userId: '1', createdAt: '2022-01-02T00:00:00.000Z' },
    { id: Math.random().toString(36).substr(2, 9), name: 'Brand 3', description: 'Description 3', logo: 'https://via.placeholder.com/150', userId: '1', createdAt: '2022-01-03T00:00:00.000Z' },
    { id: Math.random().toString(36).substr(2, 9), name: 'Brand 4', description: 'Description 4', logo: 'https://via.placeholder.com/150', userId: '1', createdAt: '2022-01-04T00:00:00.000Z' },
  ]

  console.log("filteredBrands", filteredBrands);
  console.log("brandArray", brandArray);



  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Brands</h1>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center"
        >
          <Plus className="w-5 h-5 mr-1" />
          Add Brand
        </Button>
      </div>

      <div className="mb-6 flex items-center space-x-4">
        <div className="flex-1 max-w-md">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search brands..."
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="createdAt">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingBrand(null);
        }}
        title={editingBrand ? 'Edit Brand' : 'Create New Brand'}
      >
        <BrandForm
          initialData={editingBrand || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingBrand(null);
          }}
        />
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map((brand) => (
          <BrandCard
            key={brand.id}
            brand={brand}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandArray.map((brand) => (
          <BrandCard
            key={brand.id}
            brand={brand}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredBrands.length === 0 && (
        <div className="text-center py-12">
          {searchTerm ? (
            <p className="text-gray-500">
              No brands found matching "{searchTerm}"
            </p>
          ) : (
            <p className="text-gray-500">
              {/* No brands yet. Create your first brand! */}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Brands;
