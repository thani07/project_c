import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { imageFiles } from "@/data/image-files.generated";

export const metadata: Metadata = {
  title: "Image Credits",
  description: "Attribution for the illustrative photographs used on this website.",
};

export default function CreditsPage() {
  const rows = Object.values(imageFiles).sort((a, b) => a.title.localeCompare(b.title));
  return (
    <LegalPage title="Image Credits">
      <p>
        The photographs on this website are illustrative images of South Indian food and celebrations, sourced from Wikimedia
        Commons under Creative Commons or public-domain licences. They do not document SRK Catering events. Images are cropped and
        resized for display.
      </p>
      <ul>
        {rows.map((r) => (
          <li key={r.src}>
            <a href={r.page} target="_blank" rel="noopener noreferrer">{r.title.replace(/\.[a-z]+$/i, "")}</a>
            {r.author ? `, by ${r.author}` : ""}
            {r.license ? (
              <>
                {", "}
                {r.licenseUrl ? <a href={r.licenseUrl} target="_blank" rel="noopener noreferrer">{r.license}</a> : r.license}
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </LegalPage>
  );
}
