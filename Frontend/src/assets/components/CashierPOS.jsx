import { useState } from "react";
import { ShoppingCart, CreditCard, Wallet, Trash, Plus, Minus } from "lucide-react";

function Button({ onClick, children, className }) {
  return (
    <button onClick={onClick} className={`p-3 rounded-lg transition-transform transform hover:scale-105 ${className}`}>
      {children}
    </button>
  );
}

function Card({ children, className }) {
  return <div className={`bg-white shadow-lg p-4 rounded-xl ${className}`}>{children}</div>;
}

function CardContent({ children }) {
  return <div className="mt-4 space-y-2">{children}</div>;
}

export default function CashierPOS() {
  const [selectedCategory, setSelectedCategory] = useState("Cold Drinks");
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const categories = {
    "Cold Drinks": [
      { id: 1, name: "Coca Cola", price: 2.99 },
      { id: 2, name: "Pepsi", price: 2.49 },
      { id: 3, name: "Sprite", price: 2.79 },
    ],
    "Fast Food": [
      { id: 4, name: "Burger", price: 5.99 },
      { id: 5, name: "Fries", price: 3.99 },
      { id: 6, name: "Pizza", price: 7.99 },
    ],
  };

  const addToOrder = (item) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((orderItem) => orderItem.id === item.id);
      if (existingItem) {
        return prevOrder.map((orderItem) =>
          orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
        );
      } else {
        return [...prevOrder, { ...item, quantity: 1 }];
      }
    });
    setTotal((prev) => prev + item.price);
  };

  const updateQuantity = (id, delta) => {
    setOrder((prevOrder) =>
      prevOrder
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
    setTotal((prevTotal) => prevTotal + categories[selectedCategory].find((item) => item.id === id).price * delta);
  };

  const removeFromOrder = (id) => {
    setOrder((prevOrder) => prevOrder.filter((item) => item.id !== id));
    setTotal((prevTotal) => prevTotal - order.find((item) => item.id === id).price * order.find((item) => item.id === id).quantity);
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-2xl rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <div className="grid gap-3">
          {Object.keys(categories).map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Product Display */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">{selectedCategory}</h1>
        <div className="grid grid-cols-3 gap-4">
          {categories[selectedCategory].map((item) => (
            <Card key={item.id} className="hover:shadow-xl">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
              <Button onClick={() => addToOrder(item)} className="mt-2 bg-green-500 text-white w-full">
                Add to Order
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Checkout Section */}
      <div className="w-1/4 bg-white shadow-2xl rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <CardContent>
          {order.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-2 bg-gray-200 rounded-lg">
              <span>{item.name}</span>
              <div className="flex items-center gap-2">
                <Button onClick={() => updateQuantity(item.id, -1)} className="text-blue-500">
                  <Minus />
                </Button>
                <span className="font-bold">{item.quantity}</span>
                <Button onClick={() => updateQuantity(item.id, 1)} className="text-green-500">
                  <Plus />
                </Button>
                <Button onClick={() => removeFromOrder(item.id)} className="text-red-500">
                  <Trash />
                </Button>
              </div>
            </div>
          ))}
          <div className="text-right text-lg font-bold mt-4">Total: ${total.toFixed(2)}</div>
        </CardContent>

        {/* Payment Methods */}
        <div className="mt-6 flex flex-col gap-2">
          {["Cash", "Card", "UPI"].map((method) => (
            <Button
              key={method}
              className={`text-white flex items-center justify-center ${paymentMethod === method ? "bg-green-700" : "bg-gray-500"}`}
              onClick={() => setPaymentMethod(method)}
            >
              {method}
            </Button>
          ))}
        </div>
        {paymentMethod && (
          <Button className="bg-green-500 text-white mt-4 w-full">Proceed</Button>
        )}
      </div>
    </div>
  );
}
