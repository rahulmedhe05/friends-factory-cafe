import { redirect } from "next/navigation"

export default async function ProtectedPage() {
  // Redirect to the dashboard
  redirect("/protected/dashboard")
}
