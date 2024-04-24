import Link from "next/link";
import DeleteBLock from "./DeleteBLock";
import PriorityDispaly from "./PriorityDispaly";
import ProgressDispaly from "./ProgressDispaly";
import StatusDispaly from "./StatusDispaly";
import { format } from "timeago.js";
const TicketCard = ({ ticket }) => {
  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <PriorityDispaly priority={ticket.priority} />
        <div className="ml-auto">
          <DeleteBLock id={ticket._id} />
        </div>
      </div>
      <Link href={`/TicketPage/${ticket._id}`}>
        <h4>{ticket.title}</h4>
        <hr className="h-px border-0 bg-page mb-2 " />
        <p className="whitespace-pre-wrap">{ticket.description}</p>
        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs my-1">{format(ticket.createdAt)}</p>
            <ProgressDispaly progress={ticket.progress} />
          </div>
          <div className="ml-auto flex items-end">
            <StatusDispaly status={ticket.status} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;
