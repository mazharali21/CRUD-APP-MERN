import { useEffect, useState } from "react";

export default function UserTable({ openModal, reload, refreshUsers }) {
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [popUp, setPopUp] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/users");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setUser(result.users);
      } catch (err) {
        setError(err);
      }
    };
    fetchuser();
  }, [reload]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:9000/api/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete Failed!");
      }

      refreshUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditUser = async (id) => {
    if (!form.name || !form.email) {
      alert("Name and Email are required");
      return;
    }

    try {
      const response = await fetch(`http://localhost:9000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Update Failed");
      }
      refreshUsers();
      setPopUp(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    if(selectedUser){
      setForm({
        name : selectedUser.name || "",
        email : selectedUser.email || "",
        location : selectedUser.location || ""
      })
    }
  },[selectedUser])

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Users</h2>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all"
        >
          + Add User
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-500 text-sm border-b">
            <th className="py-3 px-3">ID</th>
            <th className="py-3 px-3">Name</th>
            <th className="py-3 px-3">Email</th>
            <th className="py-3 px-3">Location</th>
            <th className="py-3 px-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {error && (
            <p className="text-red-500 text-sm mb-3">Failed to load users</p>
          )}
          {user.map((u) => (
            <tr
              key={u.userID}
              className="border-b hover:bg-gray-50 transition-all"
            >
              <td className="py-3 px-3">{u.userID || "N/A"}</td>
              <td className="py-3 px-3">{u.name || "N/A"}</td>
              <td className="py-3 px-3">{u.email || "N/A"}</td>
              <td className="py-3 px-3">{u.location || "N/A"}</td>

              <td className="py-3 px-3 flex justify-center gap-3">
                <button
                  onClick={()=>{setPopUp(true); setSelectedUser(u)}}
                  className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(u.userID)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* pop-up */}

      <div
        className={`space-y-3 w-[100vw] h-[90vh] px-8 flex-col justify-center items-center bg-amber-50 absolute z-10 top-16 left-0 ${popUp === true ? "flex" : "hidden"}`}
      >
        <button
          onClick={() => setPopUp(false)}
          className="text-red-500 absolute top-1 right-4 text-3xl cursor-pointer "
        >
          x
        </button>
        <h2 className="text-3xl mb-12">Edit User</h2>
        <div className="flex flex-col gap-4 ">
          <input
            name="name"
            onChange={handleChange}
            value={form.name}
            className="w-full border rounded-xl px-3 py-2"
            placeholder="Full Name"
            required
          />
          <input
            name="email"
            onChange={handleChange}
            value={form.email}
            className="w-full border rounded-xl px-3 py-2"
            placeholder="Email"
            required
          />
          <input
            name="location"
            onChange={handleChange}
            value={form.location}
            className="w-full border rounded-xl px-3 py-2"
            placeholder="Location"
          />
        </div>
        <button
          onClick={() => {
            handleEditUser(selectedUser.userID);
          }}
          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all cursor-pointer"
        >
          Save Edits
        </button>
      </div>
    </div>
  );
}
