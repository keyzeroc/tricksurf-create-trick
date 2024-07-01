import { ThemeProvider } from "@/components/theme/theme-provider";
import Nav from "./components/Nav";
import CreateRoute from "./components/create-trick/CreateRoute";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Nav />
        <main className="p-10 ">
          <CreateRoute />
        </main>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
