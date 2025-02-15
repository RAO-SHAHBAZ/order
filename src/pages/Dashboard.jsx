import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import OrderTable from "../components/OrderTable";
import CreateOrder from "../components/CreateOrder";
import EditOrder from "../components/EditOrder"; // Import the EditOrder component

export default function Dashboard() {
  const [page, setPage] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);

  const ordersCollection = collection(db, "orders");

  // Fetch Orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      const snapshot = await getDocs(ordersCollection);
      setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchOrders();
  }, []);

  // Add Order to Firestore
  const addOrder = async (newOrder) => {
    const docRef = await addDoc(ordersCollection, {
      ...newOrder,
      lastUpdate: new Date().toLocaleString(),
    });
    setOrders([...orders, { id: docRef.id, ...newOrder }]);
  };

  // Delete Order from Firestore
  const deleteOrder = async (orderId) => {
    await deleteDoc(doc(db, "orders", orderId));
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  // Edit Order (Update Firestore)
  const editOrder = async (updatedOrder) => {
    const orderRef = doc(db, "orders", updatedOrder.id);
    await updateDoc(orderRef, { ...updatedOrder, lastUpdate: new Date().toLocaleString() });

    setOrders(orders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)));
    setEditingOrder(null); // Reset edit mode
  };

  // Filter Orders
  const filteredOrders = orders.filter((order) => {
    return (
      (filterStatus === "All" || order.status === filterStatus) &&
      (order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.product.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="flex">
      <Sidebar setPage={setPage} />
      <div className="flex-1 min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6 relative">
        <div className="absolute inset-0 bg-grid-gray-300 opacity-10 pointer-events-none"></div>

        <Header />

        {page === "Dashboard" && (
          <div className="relative z-10">
            <SearchFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
            <CreateOrder addOrder={addOrder} />
            <OrderTable orders={filteredOrders} deleteOrder={deleteOrder} setEditingOrder={setEditingOrder} />
          </div>
        )}

        {editingOrder && (
          <div className="relative z-20">
            <EditOrder order={editingOrder} editOrder={editOrder} close={() => setEditingOrder(null)} />
          </div>
        )}
      </div>
    </div>
  );
}
