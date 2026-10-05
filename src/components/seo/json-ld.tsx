interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/** Renders a JSON-LD structured-data script tag. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://0xkhingx.vercel.app"
  );
}

const PERSON_ID = "#person";
const WEBSITE_ID = "#website";

export function personJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}${PERSON_ID}`,
    name: "Oluwadamilare Ogundele",
    alternateName: ["Dre", "0xkhingx"],
    url: siteUrl,
    jobTitle: "Software Engineer",
    description:
      "Software engineer working across web applications, machine learning and product engineering.",
    sameAs: [
      "https://github.com/0xkhingx",
      "https://www.linkedin.com/in/0xkhingx",
      "https://x.com/0xkhingx",
    ],
  };
}

export function websiteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}${WEBSITE_ID}`,
    url: siteUrl,
    name: "Dre (0xkhingx) — Software Engineer",
    alternateName: "0xkhingx",
    author: {
      "@id": `${siteUrl}${PERSON_ID}`,
    },
  };
}

export function profilePageJsonLd(siteUrl: string, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": pageUrl,
    url: pageUrl,
    mainEntity: personJsonLd(siteUrl),
  };
}

interface ProjectJsonLdInput {
  siteUrl: string;
  pageUrl: string;
  name: string;
  summary: string;
  stack: string[];
  codeUrl: string;
  liveUrl?: string;
}

export function projectJsonLd({
  siteUrl,
  pageUrl,
  name,
  summary,
  stack,
  codeUrl,
  liveUrl,
}: ProjectJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": pageUrl,
    url: pageUrl,
    name,
    description: summary,
    programmingLanguage: stack,
    codeRepository: codeUrl,
    ...(liveUrl ? { codeSampleType: "live product", targetProduct: liveUrl } : {}),
    author: {
      "@id": `${siteUrl}${PERSON_ID}`,
    },
  };
}

export function breadcrumbJsonLd(
  siteUrl: string,
  crumbs: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path}`,
    })),
  };
}
