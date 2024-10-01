import { ReactElement } from "react";

import Layout from "src/components/layout";
import ContactList from "src/components/contact/list";

export default function Home() {
  return (
    <div>
      <ContactList />
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
