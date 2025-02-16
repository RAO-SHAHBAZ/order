export default function OrderTable({ orders, deleteOrder, setEditingOrder }) {
  return (
    <div className="overflow-auto bg-white shadow-md rounded-lg mt-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-300 text-gray-700">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Product</th>
            <th className="p-3 border">Price ($)</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Last Update</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="bg-white border hover:bg-gray-100 transition">
              <td className="p-3 border text-center">{order.id}</td>
              <td className="p-3 border">{order.name}</td>
              <td className="p-3 border">{order.product}</td>
              <td className="p-3 border text-center">${order.price}</td>
              <td className="p-3 border text-center">
                <span className={`px-3 py-1 rounded text-white ${order.status === "Completed" ? "bg-green-500" : order.status === "Pending" ? "bg-yellow-500" : "bg-red-500"}`}>
                  {order.status}
                </span>
              </td>
              <td className="p-3 border text-center text-gray-500">{order.lastUpdate || "N/A"}</td>
              <td className="p-3 border flex justify-center space-x-2">
                <button
                  onClick={() => setEditingOrder(order)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this order?")) {
                      deleteOrder(order.id);
                    }
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
