"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Star, Copy, Trash2, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  deleteProduct,
  duplicateProduct,
  setProductFeatured,
  setProductStatus,
} from "@/app/dashboard/products/manage-actions";

export function ProductActions({
  id,
  status,
  featured,
}: {
  id: string;
  status: string;
  featured: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isHidden = status !== "active";

  async function run(key: string, fn: () => Promise<{ error?: string }>, goDashboard = false) {
    setBusy(key);
    setError(null);
    const res = await fn();
    setBusy(null);
    if (res.error) {
      setError(res.error);
      return;
    }
    if (goDashboard) {
      router.push("/dashboard");
    }
    router.refresh();
  }

  const Row = ({
    icon,
    label,
    onClick,
    danger,
    loading,
  }: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    danger?: boolean;
    loading?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={!!busy}
      className={`flex w-full items-center gap-3 px-5 py-3.5 text-left text-[15px] font-medium transition active:bg-canvas disabled:opacity-50 ${
        danger ? "text-accent" : "text-ink"
      }`}
    >
      <span className={danger ? "text-accent" : "text-muted"}>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : icon}
      </span>
      {label}
    </button>
  );

  return (
    <div className="mt-4">
      <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted">Manage</p>
      <Card className="divide-y divide-black/5 overflow-hidden p-0">
        <Row
          icon={isHidden ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          label={isHidden ? "Make visible" : "Hide from store"}
          loading={busy === "status"}
          onClick={() => run("status", () => setProductStatus(id, isHidden ? "active" : "hidden"))}
        />
        <Row
          icon={<Star className={`h-5 w-5 ${featured ? "fill-brand text-brand" : ""}`} />}
          label={featured ? "Remove from featured" : "Mark as featured"}
          loading={busy === "feature"}
          onClick={() => run("feature", () => setProductFeatured(id, !featured))}
        />
        <Row
          icon={<Copy className="h-5 w-5" />}
          label="Duplicate"
          loading={busy === "dup"}
          onClick={() => run("dup", () => duplicateProduct(id), true)}
        />
        {confirmDelete ? (
          <div className="flex items-center justify-between gap-3 px-5 py-3.5">
            <span className="text-[15px] font-medium text-ink">Delete this product?</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="rounded-xl px-3 py-1.5 text-sm font-semibold text-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!!busy}
                onClick={() => run("del", () => deleteProduct(id), true)}
                className="rounded-xl bg-accent px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
              >
                {busy === "del" ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        ) : (
          <Row
            icon={<Trash2 className="h-5 w-5" />}
            label="Delete product"
            danger
            onClick={() => setConfirmDelete(true)}
          />
        )}
      </Card>
      {error && <p className="mt-2 px-1 text-sm text-accent">{error}</p>}
    </div>
  );
}
