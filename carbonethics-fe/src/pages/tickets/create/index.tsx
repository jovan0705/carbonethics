import { useForm, SubmitHandler } from "react-hook-form";
import { TicketFormType } from "@/lib/services/types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";
import { useCreateTiketMutation } from "@/lib/services/ticket";
import { successToast } from "@/helpers/toast";

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: {errors} } = useForm<TicketFormType>();
  const token = Cookies.get("access-token") || "";

  const userId = useMemo(() => {
    if (token) {
      const decoded = jwtDecode(token);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return decoded?.user_id;
    }
    return 0;
  }, [token]);
  const [createTicket] = useCreateTiketMutation();
  const onSubmit: SubmitHandler<TicketFormType> = (ticketData) => {
    createTicket({ ...ticketData, client: userId })
      .then(({ data }) => {
        if (data) {
          setTimeout(() => {
            successToast('Success Create Ticket');
            router.push("/tickets");
          }, 1000);
        }
      })
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center mt-[-75px]">
      <div className="flex flex-col border-1 py-[1rem] px-[1.5rem] gap-2 w-[20rem] border-gray-300 rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          <div className="flex flex-col">
            <label>Title</label>
            <input
              {...register("title", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.title && (
              <p className="text-sm text-red-600">*This field is required</p>
            )}
          </div>

          <div className="flex flex-col">
            <label>Description</label>
            <input
              {...register("description", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.description && (
              <p className="text-sm text-red-600">*This field is required</p>
            )}
          </div>

          <button
            type="submit"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 hover:cursor-pointer"
          >
            Create Ticket
          </button>
        </form>
        <button
          onClick={() => router.push("/tickets")}
          className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 hover:cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  );
}
