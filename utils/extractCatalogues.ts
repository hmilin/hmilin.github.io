import type { Pluggable, Transformer } from "unified";
import { visit } from "unist-util-visit";

const extractCatalogues: Pluggable = (headings = []) => {
  const transformer: Transformer = (ast, vFile, next) => {
    visit(ast, "heading", (node: any) => {
      const depth = node.depth;
      if (depth > 1 && depth < 5) {
        const text = node.children
          .filter((n: any) => n.type === "text")
          .map((n: any) => n.value)
          .join("");

        headings.push({ depth, text });
      }
    });

    if (typeof next === "function") {
      return next(undefined, ast, vFile);
    }

    return ast;
  };
  return transformer;
};

export default extractCatalogues;
