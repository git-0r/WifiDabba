import { ApiUser } from "@/types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchUsers = async (): Promise<ApiUser[]> => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchUserDetails = async (id: number): Promise<ApiUser> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};
