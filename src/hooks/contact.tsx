import { useEffect, useState } from "react";

export const useGetContacts = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const existingContacts = localStorage.getItem("contactList");
    if (existingContacts) {
      const parsedExistingContacts = JSON.parse(existingContacts);
      setContacts(parsedExistingContacts);
    }
  }, []);
  return { contacts };
};
