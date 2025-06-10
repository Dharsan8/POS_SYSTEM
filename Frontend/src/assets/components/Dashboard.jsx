import React, { useState } from 'react';
import { Home, Search, Bell, User, Grid, PlusSquare, BarChart2, LogOut, MessageCircle, HelpCircle } from 'lucide-react';
import axios from "axios";

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState('menu');
    const [selectedCategory, setSelectedCategory] = useState("noStock");
    const [cart, setCart] = useState([]);
  
    const categories = [
        { name: 'Breakfast', stock: 12 },
        { name: 'Lunch', stock: 12 },
        { name: 'Dinner', stock: 12 },
        { name: 'Soup', stock: 12 },
        { name: 'Desserts', stock: 12 },
        { name: 'Side Dish', stock: 12 },
        { name: 'Appetizer', stock: 12 },
        { name: 'Beverages', stock: 12 },
      ];
      
    const menuItems = {
        Lunch: [
          { name: 'Pasta Bolognese', price: 50.5 },
          { name: 'Spicy Fried Chicken', price: 45.7 },
        ],
    };
    const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  });

    const handleAddToCart = (item) => {
      setCart([...cart, item]);
    };

const [image, setImage] = useState(null);
  const [selectedCategoryType, setSelectedCategoryType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'category') {
      // Determine type of category
      if (['Beverages'].includes(value)) {
        setSelectedCategoryType('longExpiry');
      } else {
        setSelectedCategoryType('dailyStock');
      }
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert('Image is required');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('image', image);

    try {
      const res = await axios.post('http://localhost:3000/api/products/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product added successfully');
      setFormData({ name: '', category: '', price: '', stock: ''});
      setImage(null);
    } catch (err) {
      alert('Error adding product');
      console.error(err);
    }
  };
  
    return (
        <div className="h-screen flex flex-col">
          {/* Top Navbar */}
          <div className="flex items-center justify-between bg-white shadow p-4 w-full">
          <div className="flex items-center space-x-4 w-1/2">
            <div className="bg-blue-500 text-white rounded-xl p-2">
              <Home size={24} />
            </div>
            <input
              type="text"
              placeholder="Search Your Menu Here"
              className="flex-grow rounded-lg px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-500 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              <User size={24} className="rounded-full" />
              <div className="text-right">
                <p className="font-semibold">ADMIN</p>
                <p className="text-xs text-gray-500">OWNER</p>
              </div>
            </div>
          </div>
        </div>
  
  
{/* Sidebar  */}
<div className="flex flex-grow">
          {/* Sidebar */}
          <div className="w-16 bg-white shadow-lg flex flex-col items-center py-12 space-y-6">
            <button className="text-gray-600 hover:text-blue-500" onClick={() => setSelectedTab('menu')}>
              <Grid size={24} />
            </button>
            <button className="text-gray-600 hover:text-blue-500" onClick={() => setSelectedTab('addProduct')}>
              <PlusSquare size={24} />
            </button>
            <button className="text-gray-600 hover:text-blue-500" onClick={() => setSelectedTab('analytics')}>
              <BarChart2 size={24} />
            </button>
            <button className="text-gray-600 hover:text-blue-500">
              <MessageCircle size={24} />
            </button>
            <div className="flex-grow"></div>
            <button className="text-gray-600 hover:text-blue-500">
              <HelpCircle size={24} />
            </button>
            <button className="text-red-500 hover:text-red-700">
              <LogOut size={24} />
            </button>
          </div>
 

{/* Main Content */}
<div className="flex-grow bg-gray-100 p-4 flex">
  {selectedTab === 'menu' && (
    <div className="flex-grow mr-4">
      {/* Menu Section */}
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`p-4 rounded-lg shadow ${
              selectedCategory === category.name
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <div className="flex flex-col items-center">
              <p className="font-semibold">{category.name}</p>
              <p className="text-xs">{category.stock} Menu In Stock</p>
            </div>
          </button>
        ))}
      </div>

      {/* Menu Cards */}
      <h2 className="text-xl font-semibold mt-6">{selectedCategory} Menu</h2>
      <div className="grid grid-cols-3 gap-6 mt-6">
        {menuItems[selectedCategory]?.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between w-full h-60"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-24 rounded-lg object-cover"
            />
            <div className="mt-2">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">
                Delicious and freshly prepared.
              </p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
              <button
                className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
                onClick={() => handleAddToCart(item)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Invoice Section */}
  {selectedTab === 'menu' && (
    <div className="w-1/3 bg-white p-4 rounded-lg shadow ml-4">
      <h2 className="text-xl font-semibold mb-4">Invoice</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">No items added.</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )}
  {selectedTab === 'addProduct' && (
             <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 bg-white rounded-xl shadow space-y-5">
        {/* Category Select */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Soup">Soup</option>
            <option value="Desserts">Desserts</option>
            <option value="Side Dish">Side Dish</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Beverages">Beverages</option>
          </select>
        </div>

        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product name"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full px-4 py-2 border rounded cursor-pointer"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product price"
          />
        </div>

        {/* Stock (with dynamic label) */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            {selectedCategoryType === 'dailyStock' ? 'Initial Stock (Daily Reset)' : 'Total Stock'}
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder={
              selectedCategoryType === 'dailyStock'
                ? 'Enter initial stock for today'
                : 'Enter total stock available'
            }
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
            )}
  
            {selectedTab === 'analytics' && (
              <div className="flex items-center justify-center h-full text-xl font-semibold">Analytics: Data will be updated soon.</div>
            )}
</div>
</div>
</div>
    );
}

export default Dashboard;
