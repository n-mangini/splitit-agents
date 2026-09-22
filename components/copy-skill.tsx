"use client";

import { Check, Copy, Terminal } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      aria-label="Copiar comando de instalación"
      className="group flex w-full min-w-0 items-center gap-2 rounded-md border border-border bg-secondary/40 px-3 py-2 text-left transition-colors hover:bg-secondary/70"
      title="Copiar comando de instalación"
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      <Terminal aria-hidden className="size-3.5 shrink-0 text-muted-foreground" />
      <code className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground">
        {command}
      </code>
      {copied ? (
        <Check aria-hidden className="size-3.5 shrink-0 text-primary" />
      ) : (
        <Copy
          aria-hidden
          className="size-3.5 shrink-0 text-muted-foreground group-hover:text-foreground"
        />
      )}
    </button>
  );
}

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
