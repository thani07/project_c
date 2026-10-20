import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Terms and Conditions", description: "Terms for using the SRK Catering website and making enquiries." };

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions" updated="Template text. Have it reviewed and completed by SRK Catering before launch.">
      <p>
        These terms are a starting template for the website and must be reviewed by the business, and legal counsel where needed,
        before launch.
      </p>
      <h2>Enquiries are not bookings</h2>
      <p>
        Submitting an enquiry does not reserve a date or confirm a menu or price. A catering booking is only confirmed once the SRK
        Catering team agrees the date, menu, price and payment terms with you directly.
      </p>
      <h2>Sample content</h2>
      <p>
        Menus, packages, guest ranges and prices shown on this website are illustrative samples. Photographs are illustrative stock
        images and do not show SRK Catering events unless stated.
      </p>
      <h2>Menus and availability</h2>
      <p>Dishes and quantities depend on season, availability and event size, and are confirmed per request.</p>
      <h2>Changes</h2>
      <p>We may update this website and these terms from time to time.</p>
    </LegalPage>
  );
}
