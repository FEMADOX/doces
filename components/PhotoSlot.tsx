"use client";

import { useEffect, useId, useRef, useState } from "react";

type Props = {
  slotId: string;
  placeholder?: string;
  className?: string;
  radius?: number;
  /** optional fallback image (e.g. /assets/cheesecake.png) */
  defaultSrc?: string;
  rounded?: boolean;
};

const KEY = (id: string) => `puro-doce-photo:${id}`;

/**
 * Drag-and-drop / click-to-browse photo slot. Replaces the design-canvas
 * <image-slot>. The dropped image is stored as a data URL in localStorage
 * keyed by slotId, so it survives reloads.
 */
export default function PhotoSlot({
  slotId,
  placeholder = "Arraste uma foto",
  className = "",
  radius = 12,
  defaultSrc,
  rounded = true,
}: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const reactId = useId();

  useEffect(() => {
    const saved = localStorage.getItem(KEY(slotId));
    if (saved) setSrc(saved);
    setHydrated(true);
  }, [slotId]);

  const readFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setSrc(result);
      try {
        localStorage.setItem(KEY(slotId), result);
      } catch {
        /* quota — keep in memory only */
      }
    };
    reader.readAsDataURL(file);
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSrc(null);
    localStorage.removeItem(KEY(slotId));
  };

  const shown = src ?? (hydrated ? defaultSrc : undefined);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={placeholder}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) readFile(file);
      }}
      className={`group relative flex cursor-pointer items-center justify-center overflow-hidden bg-[#F1ECE4] outline-none transition ${
        dragOver ? "ring-4 ring-caramel/60" : ""
      } ${className}`}
      style={{ borderRadius: rounded ? radius : 0 }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        id={reactId}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) readFile(file);
        }}
      />

      {shown ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shown} alt="" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={clear}
            className="absolute right-2 top-2 z-10 hidden h-8 w-8 items-center justify-center rounded-full bg-white/90 text-cacau shadow-md transition group-hover:flex hover:bg-white"
            aria-label="Remover foto"
          >
            ✕
          </button>
        </>
      ) : (
        <div className="pointer-events-none flex select-none flex-col items-center gap-2 px-4 text-center text-coffee/60">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.6" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span className="text-sm font-medium">{placeholder}</span>
        </div>
      )}

      {dragOver && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-caramel/15 text-sm font-bold text-caramel-dark">
          Solte a foto aqui
        </div>
      )}
    </div>
  );
}
