import { MessageCircle } from "lucide-react";
import { ButtonAnchor } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Renders nothing until a WhatsApp number is set in src/config/site.ts, so
 * enquiries are never routed to a number we invented.
 */
export function WhatsAppCTA({
  message = "Hello SRK Catering, I would like to enquire about catering.",
  label = "Chat on WhatsApp",
  variant = "secondary",
  className,
}: {
  message?: string;
  label?: string;
  variant?: "primary" | "secondary" | "light" | "outline-light";
  className?: string;
}) {
  const href = buildWhatsAppUrl(message);
  if (!href) return null;
  return (
    <ButtonAnchor href={href} target="_blank" rel="noopener noreferrer" variant={variant} className={className}>
      <MessageCircle className="size-4" aria-hidden="true" />
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </ButtonAnchor>
  );
}
