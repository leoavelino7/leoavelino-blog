import { Fragment } from "react";

import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};

export default function NotFound() {
  return (
    <Fragment>
      <h1>Not found :/</h1>
    </Fragment>
  );
}
