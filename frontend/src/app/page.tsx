
export const dynamic = "force-dynamic";
import Link from "next/link";
import CredentialsTable from "./components/allCredentials";

import { fetchCredentials } from "@/utils/fetchAllCred";


export default async function Home() {
  const credentials = await fetchCredentials();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <h2 className="text-7xl sm:text-5xl font-extrabold text-center text-gray-200">
        welcome to Kube-Credential
      </h2>
      <div className="flex flex-col md:flex-row w-full justify-center items-center gap-6">
        <div className="w-full max-w-md">
        {credentials.length > 0 && <CredentialsTable credentials={credentials} />}
        </div>
        <div className="w-full  max-w-md flex flex-col gap-6">
          <Link href="/issue-cred" className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-center">
            Issue Credential
          </Link>
          <Link href="/verify-cred" className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-center">
            Verify Credential
          </Link>
        </div>
      </div>
      
    </div>
  );
}
