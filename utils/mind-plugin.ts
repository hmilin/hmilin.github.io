import type { MindElixirData } from "mind-elixir";
import type { Pluggable, Transformer } from "unified";
import { visit } from "unist-util-visit";
import yaml from "yaml";
import type { MindElixirProps } from "components/MindElixir";
import { valueToEstree } from "estree-util-value-to-estree";

// 使用方式：
// ```mind
// width: 1000
// height: 500
// root: rootName
// nodes:
//   - AAA:
//     - aaa
//     - bbb:
//       - sdsdsd
//       - sdsdsd
//   - BBB:
//     - aaa:
//       - 111
//       - 222
//     - bbb
//     - ccc
//     - ddd
// ```

const PLUGIN_NAME = "mind-plugin";

const genID = (index: number, prefix = "") =>
  prefix ? `${prefix}-${index}` : `${index}`;

const genMindNodes = (
  root: string,
  nodes: Array<string | { [name: string]: Array<string> }>
): MindElixirData["nodeData"] => {
  // [{AAA: ['aaa', 'bbb', {ccc: ['aaaa']}]}, { BBB: ['aaa', 'bbb', {ccc: ['aaaa']}],}]
  const genSubNodes = (
    nodes: Array<string | { [name: string]: Array<string> }>,
    prefix: string
  ) => {
    const genSubNode = (
      node: string | { [name: string]: Array<string> },
      id: string
    ): MindElixirData["nodeData"] => {
      if (Object.prototype.toString.call(node) === "[object Object]") {
        const topic = Object.keys(node)[0];
        const children = Object.values(node)[0] as unknown as string[];
        return {
          topic,
          id,
          children: genSubNodes(children, id),
        };
      } else {
        return {
          topic: node.toString(),
          id,
        };
      }
    };

    return nodes.map((node, index) => genSubNode(node, genID(index, prefix)));
  };
  const rootId = genID(0);
  return {
    topic: root,
    id: rootId,
    children: genSubNodes(nodes, rootId),
  };
};

const createMindElixirJSXTree = (options: MindElixirProps) => {
  return {
    type: "mdxJsxFlowElement",
    name: "MindElixir",
    attributes: (Object.keys(options) as (keyof MindElixirProps)[]).map(
      (propKey) => ({
        name: propKey,
        type: "mdxJsxAttribute",
        value: {
          type: "mdxJsxAttributeValueExpression",
          value: JSON.stringify(options[propKey]),
          data: {
            estree: {
              type: "Program",
              sourceType: "module",
              body: [
                {
                  type: "ExpressionStatement",
                  expression: valueToEstree(options[propKey]),
                },
              ],
            },
          },
        },
      })
    ),
  };
};

/**
 *
 * @param {Node} ast MDAST
 * @param {vFile}  vFile
 * @param {object} defaultOptions
 * @return {function}
 */
const visitCodeBlock: Transformer = (ast, vFile, options) => {
  return visit(ast, "code", (node, index, parent: any) => {
    const { lang, value, position } = node;

    // If this codeblock is not chartjs, bail.
    if (lang !== "mind") {
      return node;
    }

    try {
      // 使用yaml解析value内容
      const mindOptions = yaml.parse(value);

      const { root, nodes, ...oth } = mindOptions;
      const fullNodes = genMindNodes(root, nodes);
      // 创建插入jsx代码的ast节点
      const newNode = createMindElixirJSXTree({ nodes: fullNodes, ...oth });
      parent?.children?.splice(index, 1, newNode);
    } catch (error: any) {
      vFile.message(error, position, PLUGIN_NAME);
    }
    return node;
  });
};

/**
 * Plugin to support GFM (autolink literals, footnotes, strikethrough, tables, tasklists).
 */
const remarkMdxMindElixir: Pluggable = (options = {}) => {
  const transformer: Transformer = (ast, vFile, next) => {
    visitCodeBlock(ast, vFile, options);

    if (typeof next === "function") {
      return next(undefined, ast, vFile);
    }

    return ast;
  };
  return transformer;
};

export default remarkMdxMindElixir;
