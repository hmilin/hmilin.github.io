import { Fragment } from "react";
import Skeletons from "./Skeletons";

export type Headings = { depth: number; text: string }[];
interface CataloguesProps {
  headings: Headings;
}

const Catalogues: React.FC<CataloguesProps> = ({ headings }) => {
  return (
    <Fragment>
      <Skeletons headings={headings} />
    </Fragment>
  );
};

export default Catalogues;
