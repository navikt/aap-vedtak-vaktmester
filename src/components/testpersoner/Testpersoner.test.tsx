import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { Testpersoner } from "./Testpersoner";
import { SWRConfig } from "swr";
import fetch from "cross-fetch";
export const fetcher = (url: string) => {
  return fetch("http://localhost:3000" + url, { method: "GET", credentials: "include" }).then((res) => res.json());
};

describe("Testpersoner", () => {
  test("viser laster-animasjon når vi laster data", () => {
    render(<Testpersoner />);
    expect(screen.getByText("Henter fra Dolly")).toBeInTheDocument();
  });

  test("viser tabell med data", async () => {
    render(
      <SWRConfig value={{ provider: () => new Map(), fetcher: fetcher, dedupingInterval: 0 }}>
        <Testpersoner />
      </SWRConfig>
    );
    const lasterElement = screen.getByText("Henter fra Dolly");
    expect(lasterElement).toBeInTheDocument();
    await waitForElementToBeRemoved(lasterElement);
    expect(screen.getByText("Fødselsnummer")).toBeVisible();
  });
});
