'use client';

import React, { useState } from "react";
import axios from "axios";

interface CredentialForm {
  credentialId: string;
  name: string;
  email: string;
  courseName: string;
  issuedBy: string;
  details: string;
}

interface IssueResponse {
  message: string;
  credentialId?: string;
}

const IssueCredential: React.FC = () => {
  const [formData, setFormData] = useState<CredentialForm>({
    credentialId: "",
    name: "",
    email: "",
    courseName: "",
    issuedBy: "",
    details: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post<IssueResponse>("http://localhost:5000/api/issue", formData);
      setMessage(res.data.message  || "Credential issued successfully ✅");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error issuing credential ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Issue Credential
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="credentialId"
            placeholder="Credential ID"
            value={formData.credentialId}
            onChange={handleChange}
            required
            className="w-full border text-black border-gray-300 p-2 rounded-lg"
          />

          <input
            type="text"
            name="name"
            placeholder="Recipient Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border text-black border-gray-300 p-2 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Recipient Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border text-black border-gray-300 p-2 rounded-lg"
          />

          <input
            type="text"
            name="courseName"
            placeholder="Course / Program Name"
            value={formData.courseName}
            onChange={handleChange}
            required
            className="w-full border text-black border-gray-300 p-2 rounded-lg"
          />

          <input
            type="text"
            name="issuedBy"
            placeholder="Issued By"
            value={formData.issuedBy}
            onChange={handleChange}
            required
            className="w-full border text-black border-gray-300 p-2 rounded-lg"
          />

          <textarea
            name="details"
            placeholder="Additional Details (optional)"
            value={formData.details}
            onChange={handleChange}
            className="w-full border text-black border-gray-300 p-2 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
          >
            {loading ? "Issuing..." : "Issue Credential"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("success") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default IssueCredential;
