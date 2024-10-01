import Header from "./Header";
import SideNav from "./Sidenav";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex font-open_sans min-h-screen">
      <SideNav />

      <div className="flex-1 grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 mb-5 gap-16 sm:px-20">
        <main className="mt-10 min-[320px]:mt-2">
          <Header />
          {children}
        </main>
      </div>
    </div>
  );
}
