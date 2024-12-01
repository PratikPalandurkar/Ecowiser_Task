import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Package } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Brand & Product Management
        </h1>
        <p className="text-xl text-gray-600">
          Manage your brands and products in one place
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <ShoppingBag className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-semibold">Manage Brands</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Create and manage your brands with detailed information including logos
            and descriptions.
          </p>
          <Link
            to="/brands"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            View Brands
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Package className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-semibold">Manage Products</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Add and organize products under your brands with categories, prices, and
            images.
          </p>
          <Link
            to="/products"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
