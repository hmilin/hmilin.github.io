import type { MindElixirData, MindElixirInstance } from "mind-elixir";
import { useLayoutEffect, useRef } from "react";

export interface MindElixirProps {
  /** @default 'map' */
  id?: string;
  nodes: MindElixirData["nodeData"];
  width?: number | string;
  height?: number | string;
}

const MindElixir: React.FC<MindElixirProps> = ({
  id = "map",
  nodes,
  width = "100%",
  height = 400,
}) => {
  const me = useRef<MindElixirInstance>();
  useLayoutEffect(() => {
    import("mind-elixir").then(({ default: MindElixirBase }) => {
      const instance = new MindElixirBase({
        el: `#${id}`,
        direction: MindElixirBase.RIGHT,
        draggable: true, // default true
        contextMenu: false,
        toolBar: true, // default true
        nodeMenu: false, // default true
        keypress: false, // default true
      });
      instance.init({ nodeData: nodes });
      requestAnimationFrame(() => {
        const root = instance.map.querySelector("me-root");
        instance.container.scrollTo(
          10000 - (root?.offsetWidth || 0) / 2,
          10000 - instance.container.offsetHeight / 2
        );
      });
      me.current = instance;
      return MindElixirBase;
    });
  }, [id, nodes]);

  return <div id={id} style={{ width, height }} />;
};

export default MindElixir;
