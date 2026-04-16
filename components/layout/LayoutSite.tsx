import { FC, ReactNode } from "react";
import scss from "./LayoutSite.module.scss";

interface ILayoutSiteProps {
  children: ReactNode;
}

const LayoutSite: FC<ILayoutSiteProps> = ({ children }) => {
  return (
    <div className={scss.LayoutSite}>
      <main>{children}</main>
    </div>
  );
};

export default LayoutSite;
