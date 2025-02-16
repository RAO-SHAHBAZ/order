import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import OrderTable from "../components/OrderTable";
import CreateOrder from "../components/CreateOrder";
import EditOrder from "../components/EditOrder";

export default function Dashboard() {
  const [page, setPage] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar visibility for mobile

  const ordersCollection = collection(db, "orders");

  // Fetch Orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(ordersCollection);
        setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

// Add Order to Firestore
const addOrder = async (newOrder) => {
  const docRef = await addDoc(ordersCollection, {
    ...newOrder,
    lastUpdate: new Date().toLocaleString(),
  });

  // Add the new order at the beginning instead of the end
  setOrders([{ id: docRef.id, ...newOrder }, ...orders]);
};

  // Delete Order from Firestore
  const deleteOrder = async (orderId) => {
    try {
      await deleteDoc(doc(db, "orders", orderId));
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Edit Order (Update Firestore)
  const editOrder = async (updatedOrder) => {
    try {
      const orderRef = doc(db, "orders", updatedOrder.id);
      await updateDoc(orderRef, {
        ...updatedOrder,
        lastUpdate: new Date().toLocaleString(),
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
      );
      setEditingOrder(null); // Reset edit mode
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Filter Orders
  const filteredOrders = orders.filter((order) =>
    (filterStatus === "All" || order.status === filterStatus) &&
    (order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:block">
        <Sidebar setPage={setPage} />
      </aside>

      {/* Mobile Sidebar (Toggle) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`fixed left-0 top-0 h-full bg-white w-64 shadow-lg transform transition-transform z-50 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar setPage={setPage} />
      </aside>

      <main className="flex-1 min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-4 md:p-6 relative">
        {/* Light Grid Background */}
        <div className="absolute inset-0 bg-grid-gray-300 opacity-10 pointer-events-none"></div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-gray-200 p-2 rounded-md shadow-lg"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        <Header />

        {/* Dashboard Page */}
        {page === "Dashboard" && (
          <section className="relative z-10">
            <SearchFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />

            <CreateOrder addOrder={addOrder} />

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <OrderTable
                orders={filteredOrders}
                deleteOrder={deleteOrder}
                setEditingOrder={setEditingOrder}
              />
            </div>
          </section>
        )}

        {/* Edit Order Modal */}
        {editingOrder && (
          <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50 transition-opacity">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <EditOrder order={editingOrder} editOrder={editOrder} close={() => setEditingOrder(null)} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
