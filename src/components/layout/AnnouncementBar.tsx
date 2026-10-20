import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  return (
    <div className="bg-maroon-deep text-ivory" data-on-dark>
      <p className="container-page py-2 text-center text-[0.75rem] tracking-[0.08em] sm:text-[0.8125rem]">
        <span aria-hidden="true" className="mr-2 text-gold">◆</span>
        {siteConfig.announcement}
        <span aria-hidden="true" className="ml-2 hidden text-gold sm:inline">◆</span>
      </p>
    </div>
  );
}
