export async function compressImage(file: File, maxDim = 1600, quality = 0.85): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/jpeg", quality));
    return blob ?? file;
  } catch {
    return file;
  }
}

export async function uploadToServer(file: File, kind: string, bucket: string): Promise<string> {
  const blob = await compressImage(file);
  const fd = new FormData();
  fd.append("file", new File([blob], `${kind}.jpg`, { type: blob.type || "image/jpeg" }));
  fd.append("kind", kind);
  fd.append("bucket", bucket);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error(j.error || "Upload failed — please try again.");
  }
  const { url } = await res.json();
  return url as string;
}
