'use client';
// export const dynamic = "force-dynamic";
import React, { useState } from "react";
import axios from "axios";
import { Credential } from "@/globals";
import CredentialsTable from "./allCredentials";
interface VerifyResponse {
  message: string;
  isVerified?: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  worker?: string;
}

export function VerifyCredPage({ credentials }: { credentials?: Credential[] }) {
  const [credentialId, setCredentialId] = useState("");
  const [verifiedBy, setVerifiedBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResponse | null>(null);
  const [credentialsList] = useState(credentials || []);
  const [lastSubmit, setLastSubmit] = useState(0);

  const unverifiedSortedCredentials = credentialsList.filter(cred => !cred.isVerified).sort((a, b) => a.credentialId.localeCompare(b.credentialId));
  console.log("Unverified Sorted Credentials:", unverifiedSortedCredentials);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = Date.now();
    if (now - lastSubmit < 2000) {
      setResult({ message: "Please wait before verifying again" });
      return;
    }
    setLastSubmit(now);
    
    setLoading(true);
    setResult(null);

    try {
      
      const res = await axios.put<VerifyResponse>(`${process.env.NEXT_PUBLIC_VERIFY_API_URL}`, {
        credentialId,
        verifiedBy,
      });

      setResult(res.data);
    } catch (err: unknown) {
      const isAxiosError = (e: unknown): e is { response?: { data?: { message?: string } } } => {
        return typeof e === 'object' && e !== null && 'response' in (e as any);
      };

      if (isAxiosError(err)) {
        setResult({ message: (err as any).response?.data?.message || "Verification failed ❌" });
      } else if (err instanceof Error) {
        setResult({ message: err.message });
      } else {
        setResult({ message: "Verification failed ❌" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="w-full flex  flex-col md:flex-row justify-center items-center gap-6">
        <div className="w-full max-w-md   p-4">
        {/* to show unverified credentials */}
        {unverifiedSortedCredentials.length > 0 && (
          <CredentialsTable credentials={unverifiedSortedCredentials} />
        )}
      </div>
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Verify Credential
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Credential ID Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Credential ID
            </label>
            <input
              type="text"
              placeholder="Enter Credential ID"
              value={credentialId}
              onChange={(e) => setCredentialId(e.target.value)}
              required
              className="w-full border text-black border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Verified By Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verified By
            </label>
            <input
              type="text"
              placeholder="Enter Your Name or Role"
              value={verifiedBy}
              onChange={(e) => setVerifiedBy(e.target.value)}
              required
              className="w-full border text-black border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-green-300 transition"
          >
            {loading ? "Verifying..." : "Verify Credential"}
          </button>
        </form>

        {/* Result Section */}
        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50 text-sm">
            <p className="font-medium text-gray-800 mb-2">{result?.message}</p>
            {result?.isVerified && (
              <>
                <p>
                  <strong>Verified By:</strong> {result?.verifiedBy}
                </p>
                <p>
                  <strong>Verified At:</strong>{" "}
                  {result?.verifiedAt
                    ? new Date(result?.verifiedAt).toLocaleString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Worker:</strong> {result?.worker}
                </p>
              </>
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
