export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold tracking-wide">User Management</h1>

      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all">
        Admin Panel
      </button>
    </nav>
  );
}
