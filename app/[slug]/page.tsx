import { StorefrontPage } from "@/components/storefront/storefront-page";

export const metadata = { title: "Luxe Wears — Shop Online" };

export default function StorePage({ params }: { params: { slug: string } }) {
  return <StorefrontPage slug={params.slug} />;
}
