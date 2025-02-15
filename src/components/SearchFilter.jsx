const SearchFilter = ({ searchQuery, setSearchQuery, filterStatus, setFilterStatus }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-between items-center bg-white p-4 shadow-md rounded-lg mb-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search orders..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search orders"
      />

      {/* Filter Dropdown */}
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Filter orders by status"
      >
        <option value="All">All Orders</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>
  );
};

export default SearchFilter;
