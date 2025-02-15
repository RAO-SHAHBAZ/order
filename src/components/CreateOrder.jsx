import { useState } from "react";

export default function CreateOrder({ addOrder }) {
  const [newOrder, setNewOrder] = useState({
    name: "",
    product: "",
    price: "",
    status: "Pending",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newOrder.name || !newOrder.product || !newOrder.price) {
      setError("All fields are required!");
      return;
    }

    addOrder({
      ...newOrder,
      price: parseFloat(newOrder.price), // Ensure price is a number
      lastUpdate: new Date().toLocaleString(),
    });

    setNewOrder({ name: "", product: "", price: "", status: "Pending" });
    setError(""); // Clear error after successful submission
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-4">
      <h2 className="text-lg font-semibold mb-2">Create New Order</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Customer Name"
          value={newOrder.name}
          onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Product Name"
          value={newOrder.product}
          onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
          className="border p-2 rounded-md"
        />
        <input
          type="number"
          placeholder="Price ($)"
          value={newOrder.price}
          onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
          className="border p-2 rounded-md"
        />
        <select
          value={newOrder.status}
          onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
          className="border p-2 rounded-md"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add Order
        </button>
      </form>
    </div>
  );
}
