import React from "react";
import { GlobalStyles } from "../styles/Global";
import Meta from "./Meta";

interface Props {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Meta title={title} />
      <GlobalStyles /> {children}
    </>
  );
};

export default Layout;
