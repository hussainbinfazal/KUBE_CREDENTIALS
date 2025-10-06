import crypto from "crypto";

export const getCredentialId = (credential: Record<string, any>): string => {
  if (!credential || typeof credential !== "object") {
    throw new Error("Invalid credential object provided");
  }

  // Sort keys recursively for consistent hashing
  const normalize = (obj: any): any => {
    if (Array.isArray(obj)) return obj.map(normalize);
    if (obj && typeof obj === "object") {
      return Object.keys(obj)
        .sort()
        .reduce((acc, key) => {
          acc[key] = normalize(obj[key]);
          return acc;
        }, {} as Record<string, any>);
    }
    return obj;
  };

  const normalized = normalize(credential);
  const jsonString = JSON.stringify(normalized);

  
  const hash = crypto.createHash("sha256").update(jsonString).digest("hex");
  return hash;
};
