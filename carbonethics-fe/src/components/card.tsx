type CardType = {
    title: string;
    status: string;
    ticketId: string;
}

export default function Card({title, status, ticketId}: CardType) {
  return (
    <a
      href="#"
      className="block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <p className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </p>
      <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
        Ticket ID: {ticketId}
      </p>
      <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
        Status: {status}
      </p>
    </a>
  );
};
