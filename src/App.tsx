import { ThemeProvider } from "@/components/theme/theme-provider";
import Nav from "./components/Nav";
import CreateRoute, { Maps } from "./components/create-trick/CreateRoute";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

function App() {
  const queryClient = new QueryClient();
  const [currentMap, setCurentMap] = useState<Maps>(Maps.ski);

  const handleMapChange = (mapKey: string) => {
    if (Object.keys(Maps).includes(mapKey)) {
      setCurentMap(Maps[mapKey as keyof typeof Maps]);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Nav onSelectMap={handleMapChange} />
        <main className="p-10">
          <CreateRoute map={currentMap}/>
        </main>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
