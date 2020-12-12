import React from "react";
import { GlobalStyles } from "../styles/Global";
import Meta from "./Meta";
import LayoutComponent from "./index";

interface Props {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Meta title={title} />
      <GlobalStyles />
      <LayoutComponent />
      {children}
    </>
  );
};

export default Layout;
