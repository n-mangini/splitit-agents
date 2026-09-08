"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function CopySkill({ href }: { href: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      className="min-w-24"
      size="sm"
      type="button"
      variant="secondary"
      onClick={async () => {
        await navigator.clipboard.writeText(await (await fetch(href)).text());
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
      {copied ? "Copiada" : "Copiar"}
    </Button>
  );
}
