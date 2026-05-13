'use client';

import { useEffect, useState } from 'react';
import { TerminalLoader } from '@/components/terminal-loader';

const REDIRECT_MS = 2000;

export function useExternalRedirect() {
  const [target, setTarget] = useState<{ href: string; label: string } | null>(null);

  useEffect(() => {
    if (!target) return;
    const t = window.setTimeout(() => {
      window.location.href = target.href;
    }, REDIRECT_MS);
    return () => window.clearTimeout(t);
  }, [target]);

  const redirect = (href: string, label: string) => (e?: React.MouseEvent) => {
    if (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
    }
    setTarget({ href, label });
  };

  const overlay = target ? (
    <div className="fixed inset-0 z-[120] bg-background popup-enter">
      <TerminalLoader
        pageName={target.label}
        bootLines={[
          `$ ./redirect.sh --target=${target.label.toLowerCase()}`,
          '> resolving target..................OK',
          '> validating handshake..............OK',
          '> establishing secure tunnel........OK',
          '> preparing redirect................OK',
          '> launching browser.................OK',
        ]}
      />
    </div>
  ) : null;

  return { redirect, overlay };
}

export const WHATSAPP_NUMBER = '916392758956';
export const WHATSAPP_MESSAGE =
  "Hi Rahul, I came across your portfolio and wanted to connect.";
export const WHATSAPP_URL =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
