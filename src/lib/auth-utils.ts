import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const PRIMARY_ADMIN = "harsha210108@gmail.com";

export async function checkIsAdmin(email: string | null | undefined): Promise<boolean> {
  if (!email) return false;
  
  // 1. Check primary admin
  if (email.toLowerCase() === PRIMARY_ADMIN.toLowerCase()) return true;
  
  // 2. Check Firestore "admins" collection
  if (!db) return false;
  
  try {
    const adminRef = doc(db, "admins", email.toLowerCase());
    const adminSnap = await getDoc(adminRef);
    return adminSnap.exists();
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}
