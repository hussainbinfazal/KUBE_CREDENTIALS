import { Credential } from "@/globals";
import { VerifyCredPage } from "../components/VerifyCred";
import { fetchCredentials } from "@/utils/fetchAllCred";



export default async function Verify() {
  const credentials = await fetchCredentials();
  return <VerifyCredPage credentials={credentials}/>;
}