/**
 * API Utility for TypeForge
 * 
 * This module handles all communication with the backend.
 * Currently, it serves as a placeholder for future integration.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
    }

    return res.json();
}

// Example service functions
export const api = {
    auth: {
        login: (data: any) => fetcher("/auth/login", { method: "POST", body: JSON.stringify(data) }),
        signup: (data: any) => fetcher("/auth/signup", { method: "POST", body: JSON.stringify(data) }),
    },
    tests: {
        start: () => fetcher("/tests/start", { method: "POST" }),
        submit: (data: any) => fetcher("/tests/submit", { method: "POST", body: JSON.stringify(data) }),
    },
};
