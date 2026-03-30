import { redirect } from "next/navigation";

// Root page redirects to waitlist (or dashboard if authenticated via middleware)
export default function Home() {
  redirect("/waitlist");
}
