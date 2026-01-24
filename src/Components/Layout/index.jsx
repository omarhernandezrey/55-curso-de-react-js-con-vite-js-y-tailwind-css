const Layout = ({ children }) => {
  return (
    <div className="flex flex-col items-center pt-40 sm:pt-32 lg:pt-24 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:pb-10 px-4 sm:px-6 lg:px-8 w-full">
      <div className="w-full max-w-screen-lg">{children}</div>
    </div>
  );
};

export default Layout;
