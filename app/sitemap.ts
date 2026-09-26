import type { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_SITE_URL||'https://ced.ng';return[{url:base,changeFrequency:'weekly',priority:1},{url:`${base}/auth`,changeFrequency:'monthly',priority:.5}]}
