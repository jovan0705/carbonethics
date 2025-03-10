import { useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useGetTicketsQuery } from "@/lib/services/ticket";
import Card from "@/components/card";
import { useRouter } from "next/navigation";

export default function TicketsPage() {
  const token = Cookies.get("access-token") || "";
  const router = useRouter()

  const userId = useMemo(() => {
    if (token) {
      const decoded = jwtDecode(token);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return decoded?.user_id;
    }
    return 0;
  }, [token]);

  const { data, refetch } = useGetTicketsQuery(userId);

  useEffect(() => {
    refetch();
  }, [refetch])

  return <div className="flex flex-col w-full gap-4 px-[2rem] py-[1rem]">
    <div className="w-full flex justify-between">
    <p className="text-2xl font-bold">Tickets</p>
    <button className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 hover:cursor-pointer" onClick={() => router.push('/tickets/create')}>Create Ticket</button>
    </div>
    <div className="grid grid-cols-5 gap-4">
    {(data && data?.length > 0) && data.map((ticket, idx) => <Card key={idx} title={ticket.title} status={ticket.status} ticketId={ticket.ticket_id}/> )}
  </div>
  </div>;
}
