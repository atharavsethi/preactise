"use server";

import { revalidatePath } from "next/cache";

export async function approveAnswer(formData: FormData) {
  const answerId = formData.get("answerId") as string;
  // Mock approving by hitting a hypothetical patch endpoint if needed, or deleting
  console.log("approving answer", answerId);
  revalidatePath("/admin");
}

export async function rejectAnswer(formData: FormData) {
  const answerId = formData.get("answerId") as string;
  try {
     await fetch(`http://localhost:8000/api/forum/answers/${answerId}/`, { method: "DELETE" });
  } catch(e) {}
  
  revalidatePath("/admin");
}

export async function verifyUser(formData: FormData) {
  const userId = formData.get("userId") as string;
  try {
    // Call the custom Django action mapped to UserViewSet verify
    await fetch(`http://localhost:8000/api/auth/users/${userId}/verify/`, { method: "POST" });
  } catch(e) {}
  
  revalidatePath("/admin");
}
