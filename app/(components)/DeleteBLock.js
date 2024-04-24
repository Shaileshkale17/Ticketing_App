"use client";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const DeleteBLock = ({ id }) => {
  const router = useRouter();
  const deleteTckets = async () => {
    const res = await fetch(`http://localhost:3000/api/Ticket/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.refresh();
    }
    console.log("Ticket deleted successfully", res.ok);
  };
  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={deleteTckets}
    />
  );
};

export default DeleteBLock;
