import { hexToRgb } from "@/lib/hexToRgb";
import { useMemo } from "react";

export function Cursors({ activeUsers }) {
  // Insert awareness info into cursors with improved styles
  const styleSheet = useMemo(() => {
    let cursorStyles = `
      /* Base styles for all remote selections */
      .yRemoteSelection {
        background-color: rgba(var(--user-color-rgb), 0.3);
      }
      
      .yRemoteSelectionHead {
        position: relative;
        border-left: 2px solid rgb(var(--user-color-rgb));
      }
      
      .yRemoteSelectionHead::after {
        position: absolute;
        top: -1.4em;
        left: -2px;
        padding: 0.2em 0.4em;
        font-size: 12px;
        font-weight: 500;
        line-height: normal;
        white-space: nowrap;
        color: white;
        background-color: rgb(var(--user-color-rgb));
        border-radius: 4px;
        user-select: none;
        pointer-events: none;
        z-index: 10;
      }
    `;

    // Add individual user styles
    for (const { clientId, name, color } of activeUsers) {
      if (clientId || name || color) {
        const userColor = color || "#ff4500"; // Default to orangered
        const rgbColor = hexToRgb(userColor);

        const escapedName = name.replace(/"/g, '\\"');

        cursorStyles += `
          .yRemoteSelection-${clientId}, 
          .yRemoteSelectionHead-${clientId} {
            --user-color: ${color};
            --user-color-rgb: ${rgbColor};
          }
          
          .yRemoteSelectionHead-${clientId}::after {
            content: "${escapedName}";
          }
        `;
      }
    }

    return { __html: cursorStyles };
  }, [activeUsers]);

  return <style dangerouslySetInnerHTML={styleSheet} />;
}
