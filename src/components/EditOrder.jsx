import { useState } from "react";

export default function EditOrder({ order, editOrder, close }) {
  const [editedOrder, setEditedOrder] = useState(order);

  const handleChange = (e) => {
    setEditedOrder({ ...editedOrder, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    editOrder(editedOrder);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Order</h2>

        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={editedOrder.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          Product:
          <input
            type="text"
            name="product"
            value={editedOrder.product}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          Price:
          <input
            type="text"
            name="price"
            value={editedOrder.price}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          Status:
          <select
            name="status"
            value={editedOrder.status}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={close}
            className="bg-gray-400 px-4 py-2 rounded text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 px-4 py-2 rounded text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
