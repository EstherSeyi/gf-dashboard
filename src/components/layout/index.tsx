import Header from "./Header";
import SideNav from "./Sidenav";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex font-open_sans min-h-screen">
      <SideNav />

      <div className="flex-1 p-8 pb-20 mb-5 sm:px-20 overflow-auto">
        <main className="mt-10 min-[320px]:mt-2">
          <Header />
          {children}
        </main>
      </div>
    </div>
  );
}
