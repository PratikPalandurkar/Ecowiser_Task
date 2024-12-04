import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/products/ProductCard';
import ProductForm from '../components/products/ProductForm';
import Button from '../components/ui/Button';
import SearchInput from '../components/ui/SearchInput';
import Modal from '../components/ui/Modal';

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');

  const handleSubmit = (data) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
    } else {
      addProduct({
        id: Math.random().toString(36).substr(2, 9),
        userId: '1',
        createdAt: new Date().toISOString(),
        ...data,
      });
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const productsArray = [
    {
      id: Math.random().toString(36).substr(2, 9),
      userId: '1',
      createdAt: new Date().toISOString(),
      name: 'Product 1',
      description: 'Description 1',
      category: 'Category 1',
      imageUrl: 'https://via.placeholder.com/150',
      price: 10.99,
    },
    {
      id: Math.random().toString(36).substr(2, 9),
      userId: '1',
      createdAt: new Date().toISOString(),
      name: 'Product 2',
      description: 'Description 1',
      category: 'Category 1',
      imageUrl: 'https://via.placeholder.com/150',
      price: 10.99,
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={() => setIsFormOpen(true)} className="flex items-center">
          <Plus className="w-5 h-5 mr-1" />
          Add Product
        </Button>
      </div>

      <div className="mb-6 flex items-center space-x-4">
        <div className="flex-1 max-w-md">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search products..."
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="createdAt">Sort by Date</option>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? 'Edit Product' : 'Create New Product'}
      >
        <ProductForm
          initialData={editingProduct || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productsArray.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          {searchTerm ? (
            <p className="text-gray-500">
              No products found matching "{searchTerm}"
            </p>
          ) : (
            <p className="text-gray-500">
              {/* No products yet. Create your first product! */}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
