"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImagePlus, Loader2, X } from "lucide-react";
import Link from "next/link";
import { uploadToServer } from "@/lib/image";
import { currencySymbol } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createProduct } from "@/app/dashboard/products/new/actions";
import { updateProduct } from "@/app/dashboard/products/manage-actions";

type EditProduct = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  stock: number;
  images: string[];
};

export function ProductForm({ currency, product }: { currency: string; product?: EditProduct }) {
  const router = useRouter();
  const symbol = currencySymbol(currency);
  const isEdit = !!product;

  const [title, setTitle] = useState(product?.title ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [stock, setStock] = useState(product ? String(product.stock) : "1");
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function addImages(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      const remaining = 6 - images.length;
      const picked = Array.from(files).slice(0, Math.max(0, remaining));
      for (const file of picked) {
        if (!file.type.startsWith("image/")) continue;
        if (file.size > 15 * 1024 * 1024) {
          setError("One image was over 15MB and was skipped.");
          continue;
        }
        const url = await uploadToServer(file, "product", "product-images");
        setImages((prev) => [...prev, url]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed — please try again.");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((u) => u !== url));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (title.trim().length < 2) {
      setError("Please enter a product name.");
      return;
    }
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      setError("Please enter a valid price.");
      return;
    }
    setSaving(true);
    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      price: priceNum,
      stock: parseInt(stock, 10) || 0,
      imageUrls: images,
    };
    const result = isEdit
      ? await updateProduct({ id: product!.id, ...payload })
      : await createProduct({ ...payload, status: "active" });
    if (result.error) {
      setSaving(false);
      setError(result.error);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-md px-5 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/dashboard" className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-soft">
          <ArrowLeft className="h-5 w-5 text-ink" />
        </Link>
        <h1 className="text-2xl font-bold text-ink">{isEdit ? "Edit product" : "Add product"}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="flex flex-col gap-5 p-5">
          <div>
            <Label>Photos</Label>
            <div className="grid grid-cols-3 gap-2">
              {images.map((url) => (
                <div key={url} className="relative aspect-square overflow-hidden rounded-2xl bg-canvas">
                  <img src={url} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/55 text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {images.length < 6 && (
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-black/15 text-muted">
                  {uploading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <ImagePlus className="h-5 w-5" />
                      <span className="text-[11px] font-medium">Add</span>
                    </>
                  )}
                  <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => addImages(e.target.files)} />
                </label>
              )}
            </div>
            <p className="mt-1.5 text-xs text-muted">Up to 6 photos. The first is the cover.</p>
          </div>

          <div>
            <Label>Product name</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Jollof Rice (large)" required />
          </div>

          <div>
            <Label>Price</Label>
            <div className="flex items-center rounded-2xl border border-black/10 bg-white pl-4 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15">
              <span className="text-[15px] font-medium text-muted">{symbol}</span>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ""))}
                placeholder="0.00"
                inputMode="decimal"
                className="h-12 flex-1 bg-transparent px-2 text-[15px] text-ink outline-none"
                required
              />
            </div>
          </div>

          <div>
            <Label>Quantity in stock</Label>
            <Input
              value={stock}
              onChange={(e) => setStock(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="1"
              inputMode="numeric"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your product — size, flavour, details buyers should know."
            />
          </div>
        </Card>

        {error && <p className="mt-3 text-sm text-accent">{error}</p>}

        <Button type="submit" disabled={saving || uploading} className="mt-4 w-full">
          {saving ? "Saving…" : isEdit ? "Save changes" : "Add product"}
        </Button>
      </form>
    </main>
  );
}
