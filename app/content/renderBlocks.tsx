"use client";

import type { InfoBlock } from "../dashboard/infoContent";

const blockStyle = { margin: "0 0 0.5rem", lineHeight: 1.5 as const };
const listStyle = { margin: "0.5rem 0", paddingLeft: "1.25rem", lineHeight: 1.5 as const };
const listItemStyle = { marginBottom: "0.5rem" };

/**
 * Renders an array of InfoBlocks to React nodes with inline styles (for Compass Framework and other lightboxes that use the same look).
 */
export function renderBlocksToInline(blocks: InfoBlock[]): React.ReactNode {
  return blocks.map((block, i) => {
    if (block.type === "p") {
      return (
        <p key={i} style={block.className ? { ...blockStyle, margin: 0 } : blockStyle}>
          {block.text}
        </p>
      );
    }
    if (block.type === "pStrong") {
      return (
        <p key={i} style={{ margin: "0 0 0.35rem", lineHeight: 1.5 }}>
          <strong>{block.text}</strong>
        </p>
      );
    }
    if (block.type === "h3") {
      return (
        <h3 key={i} style={{ margin: "0.5rem 0 0.25rem", lineHeight: 1.5, fontWeight: 600 }}>
          {block.text}
        </h3>
      );
    }
    if (block.type === "ul") {
      return (
        <ul key={i} style={listStyle}>
          {block.items.map((item, j) => (
            <li key={j} style={j < block.items.length - 1 ? listItemStyle : undefined}>
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  });
}
