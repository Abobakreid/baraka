"use server";
import { revalidatePath } from "next/cache";

export async function revalidateOilsPage() {
  try {
    console.log("Revalidating /oils");
    revalidatePath("/car-oils");
    console.log("Revalidation successful");
  } catch (err) {
    console.error("Error revalidating /car-oils", err);
    throw err;
  }
}
