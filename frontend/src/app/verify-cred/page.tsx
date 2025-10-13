export const dynamic = "force-dynamic";

import { VerifyCredPage } from "../components/VerifyCred";
// import { fetchCredentials } from "@/utils/fetchAllCred";


export default async function Verify() {
  // const credentials = await fetchCredentials();
  // return <VerifyCredPage credentials={credentials}/>;
  return <VerifyCredPage />;
}