export default function OrderTable({ orders, deleteOrder, setEditingOrder }) {
  return (
    <table className="w-full mt-4 border-collapse">
      <thead>
        <tr className="bg-gray-300">
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Product</th>
          <th className="p-2 border">Price</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="bg-white border">
            <td className="p-2 border">{order.id}</td>
            <td className="p-2 border">{order.name}</td>
            <td className="p-2 border">{order.product}</td>
            <td className="p-2 border">{order.price}</td>
            <td className="p-2 border">{order.status}</td>
            <td className="p-2 border flex space-x-2">
              <button
                onClick={() => setEditingOrder(order)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteOrder(order.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
