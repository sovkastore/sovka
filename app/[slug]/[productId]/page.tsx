import { ProductDetailPage } from "@/components/storefront/product-detail-page";

export const metadata = { title: "Canvas Sneakers White — Luxe Wears" };

export default function ProductPage({ params }: { params: { slug: string; productId: string } }) {
  return <ProductDetailPage slug={params.slug} productId={params.productId} />;
}
