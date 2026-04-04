import { createPortal } from "react-dom";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

/**
 * Legacy dashboard sidebar portal.
 * Fixes a layout bug where `position: fixed` inside a transformed/centered ancestor
 * can shift the sidebar drawer on very wide screens.
 */
export function LegacySidebarPortal({ open, onClose }) {
  const target = typeof document !== "undefined" ? document.body : null;
  if (!target) return null;

  return createPortal(
    <>
      <div
        className={cn(
          "fixed inset-0 z-90 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden={!open}
      />

      <div
        className={cn(
          "fixed left-0 top-0 z-100 h-screen w-[260px] transition-transform duration-500 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full pointer-events-none",
        )}
      >
        <Sidebar isCollapsed={false} onToggle={onClose} embed />
      </div>
    </>,
    target,
  );
}
