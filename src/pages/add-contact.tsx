import { ReactElement } from "react";
import Layout from "src/components/layout";
import ContactForm from "src/components/contact/add";

export default function AddContact() {
  return (
    <div>
      <ContactForm />
    </div>
  );
}

AddContact.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
