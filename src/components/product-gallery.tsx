"use client";

import { useState } from "react";
import { ProductImage } from "./product-image";
import { useDictionary } from "@/lib/i18n/locale-context";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const dict = useDictionary();

  return (
    <div>
      <ProductImage
        src={images[active]}
        alt={alt}
        className="aspect-square w-full"
        sizes="(min-width: 1024px) 50vw, 100vw"
        priority
      />
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={dict.product.galleryImageLabel(i + 1, images.length)}
              aria-current={i === active}
              className={cn(
                "relative isolate aspect-square overflow-hidden rounded-xl ring-1 ring-white/5 transition-opacity",
                i === active ? "outline outline-2 outline-offset-2 outline-accent" : "opacity-70 hover:opacity-100"
              )}
            >
              <ProductImage src={src} alt="" className="h-full w-full" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
