import { QueryClient, QueryClientProvider } from "react-query";
import "@navikt/ds-css";
import { Topics } from "./Topics";
import { Heading } from "@navikt/ds-react";

const queryClient = new QueryClient();

function App() {
  return (
    <div className={"appContainer"}>
      <Heading size={"xlarge"} level={"1"}>
        AAP Vedtak Vaktmester
      </Heading>
      <QueryClientProvider client={queryClient}>
        <Topics />
      </QueryClientProvider>
    </div>
  );
}

export default App;
