import { ReactElement } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import Layout from "src/components/layout";
import ContactList from "src/components/contact/list";
import Map from "src/components/contact/map";
import { useRouter } from "next/router";
const tabs = [
  {
    title: "Contact List",
    component: <ContactList />,
  },
  {
    title: "Contact Map",
    component: <Map />,
  },
];

export default function Home() {
  const router = useRouter();

  const selectedIndex = router.query.tab
    ? tabs.findIndex((item) => {
        return (
          item.title.toLowerCase() ===
          decodeURIComponent(router.query.tab as string)
        );
      })
    : 0;
  return (
    <div className="grid gap-8">
      <div className="flex h-screen w-full justify-center">
        <div className="w-full">
          <TabGroup
            onChange={(selectedIndex) => {
              const activeTab = tabs[selectedIndex].title;
              const pathname = router.asPath.split("?")[0];

              router.push(
                `${pathname}?tab=${encodeURIComponent(
                  activeTab.toLowerCase()
                )}`,
                undefined,
                {
                  shallow: true,
                }
              );
              return;
            }}
            selectedIndex={selectedIndex}
          >
            <TabList className="flex gap-4">
              {tabs.map(({ title }) => (
                <Tab
                  key={title}
                  className="rounded-full py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-black"
                >
                  {title}
                </Tab>
              ))}
            </TabList>
            <TabPanels className="mt-8">
              {tabs.map(({ title, component }) => (
                <TabPanel key={title} className="rounded-xl bg-white/5 p-3">
                  {component}
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
