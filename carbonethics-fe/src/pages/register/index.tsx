import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterFormType } from "@/lib/services/types";
import { useRegisterMutation } from "@/lib/services/client";
import { useRouter } from "next/navigation";
import { successToast } from "@/helpers/toast";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>();
  const [doRegister] = useRegisterMutation();
  const onSubmit: SubmitHandler<RegisterFormType> = (userData) => {
    doRegister(userData).then(({ data }) => {
      if (data) {
        successToast('Register Success')
        router.push("/login");
      } 
    });
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
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
            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.email && (
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
          onClick={() => router.push("/login")}
          className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 hover:cursor-pointer"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
