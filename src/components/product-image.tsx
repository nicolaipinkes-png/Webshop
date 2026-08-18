import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductImage({
  src,
  alt = "",
  className,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-surface-muted ring-1 ring-white/5",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
    </div>
  );
}
