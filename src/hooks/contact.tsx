import { useEffect, useState } from "react";
import { paginateArray } from "src/lib/utils";

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

export const useGetPaginatedContacts = (
  page: number = 1,
  pageSize: number = 5
) => {
  const { contacts } = useGetContacts();
  const [paginatedContacts, setPaginatedContacts] = useState([]);
  useEffect(() => {
    if (contacts) {
      setPaginatedContacts(paginateArray(contacts, page, pageSize));
    }
  }, [contacts, page, pageSize]);
  return {
    data: paginatedContacts,
    meta_data: {
      current_page: page,
      total_pages: Math.ceil(contacts?.length / pageSize) || 0,
      total_count: contacts?.length || 0,
      count: paginatedContacts?.length || 0,
    },
  };
};
