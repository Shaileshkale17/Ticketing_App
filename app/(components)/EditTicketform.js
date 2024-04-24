"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
const EditTicketform = ({ ticket }) => {
  const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setformData((pervstate) => ({
      ...pervstate,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (EDITMODE) {
      const res = await fetch(`/api/Ticket/${ticket._id}`, {
        method: "PUT",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      if (!res.ok) {
        throw new Error("Failed to Update Ticket.");
      }
      router.refresh();
    } else {
      const res = await fetch("/api/Ticket", {
        method: "POST",
        body: JSON.stringify({ formData }),
        contentType: "application/json",
      });

      if (!res.ok) {
        throw new Error("Failed to create Ticket.");
      }
      router.refresh();
    }

    router.refresh();
    router.push("/");
  };

  const startingTicketData = {
    title: "",
    description: "",
    category: "Hardwate problem",
    priority: 1,
    progress: 0,
    status: "not started",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
    startingTicketData["category"] = ticket.category;
  }

  const [formData, setformData] = useState(startingTicketData);
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}>
        <h3>{EDITMODE ? "Update Your Ticket" : "Create Your Ticket"}</h3>
        <label>Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          required={true}
          value={formData.title}
          placeholder=" Your Ticket"
        />
        <label>description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          placeholder=" Your Ticket description"
          rows="5"
        />
        <label>category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}>
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="sotware Problem">software Problem</option>
          <option value="Project">Project</option>
        </select>
        <label>priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="Done">Done</option>
        </select>
        <input type="submit" className="btn" value="Create Ticket" />
      </form>
    </div>
  );
};

export default EditTicketform;
