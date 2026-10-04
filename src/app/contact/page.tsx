import { redirect } from "next/navigation";

/**
 * Contact is now a Cal.com popup action (nav + homepage section),
 * not a standalone page. Keep direct visits working by sending
 * them to the homepage contact section.
 */
export default function ContactPage() {
  redirect("/#contact");
}
