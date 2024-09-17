import type { Pluggable, Transformer } from "unified";
import { visit } from "unist-util-visit";

const extractCatalogues: Pluggable = (headings = []) => {
  const transformer: Transformer = (ast, vFile, next) => {
    try {

      visit(ast, "heading", (node) => {
        const depth = node.depth;
        // if (depth > 1 && depth < 5) {
        //   const text = node.children
        //     .filter((n) => n.type === "text")
        //     .map((n) => n.value)
        //     .join("");
  
        //   headings.push({ depth, text });
        // }
      });
    }catch(e) {
      debugger
    }
    return ast;
  };
  return transformer;
};

export default extractCatalogues;
