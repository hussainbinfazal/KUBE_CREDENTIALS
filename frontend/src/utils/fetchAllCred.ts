import { Credential } from "@/globals";

export async function fetchCredentials(): Promise<Credential[]> {
  try {
    const url = process.env.FETCH_CREDENTIALS || `${process.env.SERVER_URL}/api/issue/allCredentials`;
    console.log('Fetching from URL:', url);
    const res = await fetch(url, {
      cache: "no-store", 
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.credentials || data.sortedCredentials || [];
  } catch (error) {
    console.error('Error fetching credentials:', error);
    return [];
  }
}