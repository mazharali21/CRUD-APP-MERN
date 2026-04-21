import { useState } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import UserTable from "../components/UserTable";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const refreshUsers = () => {
    setReload((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <UserTable openModal={() => setShowModal(true)} reload={reload} 
          refreshUsers={refreshUsers} />
      </div>

      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          refreshUsers={refreshUsers}
        />
      )}
    </>
  );
}
