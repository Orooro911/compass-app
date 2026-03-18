"use client";

import type { InfoBlock, UlListItem } from "../dashboard/infoContent";

const blockStyle = { margin: "0 0 0.5rem", lineHeight: 1.5 as const };
const listStyle = { margin: "0.2rem 0", paddingLeft: "2rem", lineHeight: 1.4 as const, listStyleType: "disc" as const, listStylePosition: "outside" as const };
const orderedListStyle = { margin: "0.2rem 0", paddingLeft: "2.25rem", lineHeight: 1.4 as const, listStyleType: "decimal" as const };
const listItemStyle = { marginBottom: "0.05rem" };

/**
 * Renders an array of InfoBlocks to React nodes with inline styles (for Compass Framework and other lightboxes that use the same look).
 */
export function renderBlocksToInline(blocks: InfoBlock[]): React.ReactNode {
  return blocks.map((block, i) => {
    if (block.type === "p") {
      const style = { ...blockStyle, ...(block.className ? { margin: 0 } : {}), ...(block.indent ? { marginLeft: "2rem", paddingLeft: "0.25rem" } : {}) };
      return (
        <p key={i} style={style}>
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
      const style = { ...listStyle, ...(block.indent ? { marginLeft: "2rem", paddingLeft: "2rem" } : {}) };
      return (
        <ul key={i} style={style}>
          {block.items.map((item, j) => (
            <li key={j} style={j < block.items.length - 1 ? listItemStyle : undefined}>
              {typeof item === "string" ? item : <><strong>{item.bold}</strong>{item.rest}</>}
            </li>
          ))}
        </ul>
      );
    }
    if (block.type === "ol") {
      return (
        <ol key={i} style={orderedListStyle} start={block.start}>
          {block.items.map((item, j) => (
            <li key={j} style={j < block.items.length - 1 ? listItemStyle : undefined}>
              {typeof item === "string" ? item : <><strong>{item.bold}</strong>{item.rest}</>}
            </li>
          ))}
        </ol>
      );
    }
    return null;
  });
}
