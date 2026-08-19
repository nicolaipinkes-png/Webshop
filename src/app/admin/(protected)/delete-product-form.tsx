"use client";

import { Trash2 } from "lucide-react";
import { deleteProduct } from "./actions";

export function DeleteProductForm({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteProduct}
      onSubmit={(e) => {
        if (!confirm(`„${name}“ wirklich löschen?`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        aria-label={`${name} löschen`}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:border-red-500 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  );
}
