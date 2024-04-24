import React from "react";
import TicketCard from "./(components)/TicketCard";
const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Ticket", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json();
  } catch (error) {
    console.log("failed to get ticket", error);
  }
};
const Dashboard = async () => {
  const data = await getTickets();
  const tickets = data;
  const uniqueCategories = [
    ...new Set(tickets?.tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      {tickets.tickets &&
        uniqueCategories?.map((uniqueCategory, categoryIndex) => (
          <div className="mb-4" key={categoryIndex}>
            <h2>{uniqueCategory}</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
              {tickets.tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filterTicket, _index) => (
                  <TicketCard id={_index} key={_index} ticket={filterTicket} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
