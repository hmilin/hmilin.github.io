import "react";

declare module "react" {
  // enable css variables
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

declare global {
  type TupleOfLength<
    N extends number,
    T = any,
    R extends any[] = []
  > = R["length"] extends N ? R : TupleOfLength<N, T, [T, ...R]>;
}
