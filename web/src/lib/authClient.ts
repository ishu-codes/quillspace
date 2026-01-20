import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:1337",
    fetchOptions: {
        credentials: "include", // Include cookies in requests
    },
});
