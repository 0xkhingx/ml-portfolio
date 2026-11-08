import { redirect } from "next/navigation";

/**
 * Contact is now a Cal.com popup action (nav + site footer),
 * not a standalone page. Keep direct visits working by sending
 * them to the footer contact block.
 */
export default function ContactPage() {
  redirect("/#contact");
}
