import { redirect } from "next/navigation";
import { getAuthed } from "@/lib/supabase/authed";
import { ProductForm } from "@/components/products/product-form";
import { ProductActions } from "@/components/products/product-actions";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const authed = await getAuthed();
  if (!authed) redirect("/login");
  const { user, supabase } = authed;

  const { data: store } = await supabase
    .from("stores")
    .select("id, currency")
    .eq("seller_id", user.id)
    .maybeSingle();
  if (!store) redirect("/onboarding/store");

  const { data: product } = await supabase
    .from("products")
    .select("id, title, description, price, stock, status, featured, product_images(url, position)")
    .eq("id", params.id)
    .eq("store_id", store.id)
    .maybeSingle();
  if (!product) redirect("/dashboard");

  const images = [...((product as any).product_images ?? [])]
    .sort((a: any, b: any) => a.position - b.position)
    .map((i: any) => i.url);

  return (
    <>
      <ProductForm
        currency={store.currency as string}
        product={{
          id: product.id,
          title: product.title,
          description: product.description,
          price: Number(product.price),
          stock: product.stock,
          images,
        }}
      />
      <div className="mx-auto max-w-md px-5 pb-12">
        <ProductActions id={product.id} status={product.status} featured={!!product.featured} />
      </div>
    </>
  );
}
