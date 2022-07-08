import { QueryClient, QueryClientProvider } from "react-query";
import "@navikt/ds-css";
import { Heading } from "@navikt/ds-react";
import { Search } from "./components/Search";

const queryClient = new QueryClient();

function App() {
  return (
    <div className={"appContainer"}>
      <Heading size={"xlarge"} level={"1"}>
        AAP Vedtak Vaktmester
      </Heading>
      <QueryClientProvider client={queryClient}>
        <Search />
      </QueryClientProvider>
    </div>
  );
}

export default App;
