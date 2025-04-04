import AppHeader from "./components/Header/AppHeader";
import ChartPage from "./pages/ChartPage";

const AppLayout = () => {
  return (
    <>
      <AppHeader />
      <main className="w-full h-screen pt-8">
        <ChartPage />
      </main>
    </>
  );
};

export default AppLayout;
