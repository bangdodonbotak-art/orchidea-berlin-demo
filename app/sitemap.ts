import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://orchidea-berlin-demo.vercel.app/", lastModified: new Date() },
    { url: "https://orchidea-berlin-demo.vercel.app/services", lastModified: new Date() },
    { url: "https://orchidea-berlin-demo.vercel.app/team", lastModified: new Date() },
    { url: "https://orchidea-berlin-demo.vercel.app/impressum", lastModified: new Date() },
    { url: "https://orchidea-berlin-demo.vercel.app/datenschutz", lastModified: new Date() },
  ];
}
