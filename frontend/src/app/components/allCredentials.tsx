'use client';

import React from "react";

interface Credential {
  credentialId: string;
  name: string;
  email: string;
  courseName: string;
  issuedBy: string;
  details?: string;
  isVerified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
}

interface CredentialsTableProps {
  credentials: Credential[];
}

const CredentialsTable: React.FC<CredentialsTableProps> = ({ credentials }) => {
  if (!credentials || credentials.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No credentials issued yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left border-b">Credential ID</th>
            <th className="px-4 py-2 text-left border-b">Name</th>
            <th className="px-4 py-2 text-left border-b">Email</th>
            <th className="px-4 py-2 text-left border-b">Course</th>
            <th className="px-4 py-2 text-left border-b">Issued By</th>
            <th className="px-4 py-2 text-left border-b">Details</th>
            <th className="px-4 py-2 text-left border-b">Verified</th>
            <th className="px-4 py-2 text-left border-b">Verified By</th>
            <th className="px-4 py-2 text-left border-b">Verified At</th>
          </tr>
        </thead>
        <tbody>
          {credentials.map((cred) => (
            <tr key={cred.credentialId} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{cred.credentialId}</td>
              <td className="px-4 py-2 border-b">{cred.name}</td>
              <td className="px-4 py-2 border-b">{cred.email}</td>
              <td className="px-4 py-2 border-b">{cred.courseName}</td>
              <td className="px-4 py-2 border-b">{cred.issuedBy}</td>
              <td className="px-4 py-2 border-b">{cred.details || "-"}</td>
              <td className="px-4 py-2 border-b">{cred.isVerified ? "✅" : "❌"}</td>
              <td className="px-4 py-2 border-b">{cred.verifiedBy || "-"}</td>
              <td className="px-4 py-2 border-b">
                {cred.verifiedAt ? new Date(cred.verifiedAt).toLocaleString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CredentialsTable;
