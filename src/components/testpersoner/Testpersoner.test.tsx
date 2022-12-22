import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { Testpersoner } from "./Testpersoner";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import { DollyResponse } from "../../types/DollyResponse";
import { SWRWrapper } from "../test/SWRWrapper";

describe("Testpersoner", () => {
  test("viser laster-animasjon når vi laster data", () => {
    render(<Testpersoner />);
    expect(screen.getByText("Henter fra Dolly")).toBeInTheDocument();
  });

  test("viser tabell med data", async () => {
    render(
      <SWRWrapper>
        <Testpersoner />
      </SWRWrapper>
    );
    const dollyResponse: DollyResponse[] = [
      {
        fødselsdato: "1987-09-17",
        navn: "Flagrende Katt",
        fødselsnummer: "17098700000",
      },
    ];
    server.use(rest.get("/api/dolly", (req, res, ctx) => res(ctx.status(200), ctx.json(dollyResponse))));
    const lasterElement = screen.getByText("Henter fra Dolly");
    expect(lasterElement).toBeInTheDocument();
    await waitForElementToBeRemoved(lasterElement);
    expect(screen.getByRole("columnheader", { name: /Fødselsnummer/ })).toBeVisible();
    expect(screen.getByRole("columnheader", { name: /Navn/ })).toBeVisible();
    expect(screen.getByRole("columnheader", { name: /Fødselsdato/ })).toBeVisible();
    expect(screen.getByRole("cell", { name: dollyResponse[0].navn })).toBeVisible();
  });
});
