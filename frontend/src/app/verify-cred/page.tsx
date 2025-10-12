import { VerifyCredPage } from "../components/VerifyCred";


// async function fetchCredentials(): Promise<Credential[]> {
//   const res = await fetch("http://localhost:5000/api/credentials", {
//     cache: "no-store", // ensures fresh data
//   });
//   const data = await res.json();
//   return data.sortedCredentials;
// }
export default function Verify() {
  // const credentials = await fetchCredentials();
  return <VerifyCredPage />;
}