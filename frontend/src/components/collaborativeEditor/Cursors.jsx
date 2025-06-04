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
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      }
    `;

    activeUsers.forEach(({ clientId, name, color }, index) => {
      if (clientId || name || color) {
        const userColor = color || "orangered";
        const rgbColor = hexToRgb(userColor);
        const escapedName = name.replace(/"/g, '\\"');

        // Horizontal staggering - each user gets positioned further to the right
        const horizontalOffset = index * 10; // 8px spacing between each label

        // Slight vertical staggering as backup
        const verticalOffset = (index % 3) * 1; // Only 3 levels, then repeat

        cursorStyles += `
          .yRemoteSelection-${clientId},
          .yRemoteSelectionHead-${clientId} {
            --user-color: ${userColor};
            --user-color-rgb: ${rgbColor};
          }

          .yRemoteSelectionHead-${clientId}::after {
            content: "${escapedName}";
            left: ${-2 + horizontalOffset}px;
            top: ${-1.4 - verticalOffset}em;
            z-index: ${10 + index};
          }
        `;
      }
    });

    return { __html: cursorStyles };
  }, [activeUsers]);

  return <style dangerouslySetInnerHTML={styleSheet} />;
}
