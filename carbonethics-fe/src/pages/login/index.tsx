import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormType } from "@/lib/services/types";
import { useLoginMutation } from "@/lib/services/client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { successToast } from "@/helpers/toast";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();
  const [login] = useLoginMutation();
  const onSubmit: SubmitHandler<LoginFormType> = (userData) => {
    login(userData).then(({ data }) => {
      if (data?.access) {
        successToast('Success Sign In');
        Cookies.set("access-token", data.access);
        Cookies.set("refresh-token", data.refresh);
        router.push("/tickets");
      } else {
        Swal.fire({
          icon: "error",
          title: "Sign In Failed",
          text: "Invalid Username / Password",
        });
      }
    });
  };

  return (
    <div className="flex flex-col w-full h-[100dvh] items-center justify-center">
      <div className="flex flex-col border-1 py-[1rem] px-[1.5rem] gap-2 w-[20rem] border-gray-300 rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          <div className="flex flex-col">
            <label>Username</label>
            <input
              {...register("username", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.username && (
              <p className="text-sm text-red-600">*This field is required</p>
            )}
          </div>

          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-sm text-red-600">*This field is required</p>
            )}
          </div>

          <button
            type="submit"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 hover:cursor-pointer"
          >
            Sign In
          </button>
        </form>
        <button
          onClick={() => router.push("/register")}
          className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 hover:cursor-pointer"
        >
          Register
        </button>
      </div>
    </div>
  );
}
