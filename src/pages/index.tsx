import { ReactElement } from "react";

import Layout from "src/components/layout";
import ContactList from "src/components/contact/list";
import Map from "src/components/contact/map";

export default function Home() {
  return (
    <div className="grid gap-8">
      <ContactList />
      <Map />
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
