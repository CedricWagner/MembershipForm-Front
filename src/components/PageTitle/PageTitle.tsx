import React, { FC } from "react";
import { Helmet } from "react-helmet";

interface PageTitleProps {
  children: React.ReactNode;
}

const PageTitle: FC<PageTitleProps> = ({ children }) => (
  <>
    {typeof children === "string" && (
      <Helmet>
        <title>{children}</title>
      </Helmet>
    )}
    <h1 data-testid="PageTitle" className="my-4 text-2xl font-bold">
      {children}
    </h1>
  </>
);

export default PageTitle;
