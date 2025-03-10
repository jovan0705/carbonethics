import StoreProvider from "@/app/StoreProvider";
import "../styles/globals.css";
import LayoutProvider from "./LayoutProvider";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MyApp({ Component, pageProps }: any) {
  const router = useRouter();
  const path = usePathname() || '';
  const excludedPath = ['/login', '/register']
  return (
    <StoreProvider>
      <LayoutProvider>
        <div className="h-[100dvh] w-full">
        {
          !excludedPath?.includes(path) && <div className="px-[2rem] py-[1rem] flex justify-end w-full border-b-1 border-gray-300">
          <button onClick={() => {
            Cookies.remove('access-token');
            Cookies.remove('refresh-token');
            router.push('/login')
          }} className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 hover:cursor-pointer">Log Out</button>
          </div>
        }
        <Component {...pageProps} />
        </div>
      </LayoutProvider>
    </StoreProvider>
  );
}
