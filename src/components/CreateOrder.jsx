import { useState } from "react";

export default function CreateOrder({ addOrder }) {
  const [newOrder, setNewOrder] = useState({
    name: "",
    product: "",
    price: "",
    status: "Pending",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newOrder.name || !newOrder.product || !newOrder.price) return;

    addOrder({ ...newOrder });
    setNewOrder({ name: "", product: "", price: "", status: "Pending" });
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-4">
      <h2 className="text-lg font-semibold mb-2">Create New Order</h2>
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
          type="text"
          placeholder="Price ($)"
          value={newOrder.price}
          onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
          className="border p-2 rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add Order
        </button>
      </form>
    </div>
  );
}
