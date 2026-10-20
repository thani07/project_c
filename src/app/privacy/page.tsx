import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", description: "How SRK Catering handles the information you share in an enquiry." };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="Template text. Have it reviewed and completed by SRK Catering before launch.">
      <p>
        This page explains, in plain language, how information you share through this website is handled. It is a starting template
        and must be reviewed and completed by the business, including its legal entity details, before the site goes live.
      </p>
      <h2>What we collect</h2>
      <p>
        When you use the enquiry form, you may provide your name, phone number, optional email address, event details, venue and any
        notes. We only ask for what we need to plan your catering.
      </p>
      <h2>How it is used</h2>
      <ul>
        <li>To contact you about your catering enquiry.</li>
        <li>To prepare a menu and quotation for your event.</li>
      </ul>
      <h2>Current status of the enquiry form</h2>
      <p>
        While the site is in demo mode, the enquiry form does not transmit or store your details. The summary shown after
        submission is generated in your browser so you can share it with the team directly.
      </p>
      <h2>Your choices</h2>
      <p>You can ask us to correct or delete the details you have shared. Contact details will be listed on the contact page once published.</p>
    </LegalPage>
  );
}
