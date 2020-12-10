import React from "react";
import Head from "next/head";

const Meta = ({ title }) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <title>{title}</title>
  </Head>
);

export default Meta;
