import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to dashboard (in a real app, this would check auth status)
  redirect("/dashboard");
}
