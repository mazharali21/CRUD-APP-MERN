import { useState } from "react";

export default function Modal({ closeModal, refreshUsers }) {

  const [form , setForm] = useState({
    name : "",
    email : "",
    location : ""
  })

  const handleChange = (e) =>{

    const {name, value} = e.target

    setForm((prev)=>(
      {
        ...prev,
        [name] : value
      }
    ))
    
  }

  const handleSubmit = async ()=> {
    try {
      const response = await fetch("http://localhost:9000/api/users",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(form)
      })

      if(!response.ok){
        throw new Error("Error occured while adding User");
      }

      refreshUsers();
      closeModal();

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-2xl shadow-xl w-[400px] p-6 animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4">Create / Edit User</h2>

        <div className="space-y-3">
          <input onChange={handleChange} value={form.name} name="name" className="w-full border rounded-xl px-3 py-2" placeholder="Full Name" required/>
          <input onChange={handleChange} value={form.email} name="email" className="w-full border rounded-xl px-3 py-2" placeholder="Email" required />
          <input onChange={handleChange} value={form.location} name="location" className="w-full border rounded-xl px-3 py-2" placeholder="Location" />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-xl"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
