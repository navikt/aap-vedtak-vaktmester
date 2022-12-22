import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { Testpersoner } from "./Testpersoner";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import { DollyResponse } from "../../types/DollyResponse";
import { renderWithSWR } from "../test/renderWithSWR";

describe("Testpersoner", () => {
  test("viser laster-animasjon når vi laster data", () => {
    render(<Testpersoner />);
    expect(screen.getByText("Henter fra Dolly")).toBeInTheDocument();
  });

  test("viser tabell med data", async () => {
    const dollyResponse: DollyResponse[] = [
      {
        fødselsdato: "1987-09-17",
        navn: "Flagrende Katt",
        fødselsnummer: "17098700000",
      },
    ];
    server.use(rest.get("/api/dolly", (req, res, ctx) => res(ctx.status(200), ctx.json(dollyResponse))));

    renderWithSWR(<Testpersoner />);
    const lasterElement = screen.getByText("Henter fra Dolly");
    expect(lasterElement).toBeInTheDocument();
    await waitForElementToBeRemoved(lasterElement);
    expect(screen.getByRole("columnheader", { name: /Fødselsnummer/ })).toBeVisible();
    expect(screen.getByRole("columnheader", { name: /Navn/ })).toBeVisible();
    expect(screen.getByRole("columnheader", { name: /Fødselsdato/ })).toBeVisible();
    expect(screen.getByRole("cell", { name: dollyResponse[0].navn })).toBeVisible();
  });

  test("viser melding når svaret ikke inneholder noen personer", async () => {
    server.use(rest.get("/api/dolly", (req, res, ctx) => res(ctx.status(200), ctx.json([]))));
    renderWithSWR(<Testpersoner />);
    await waitForElementToBeRemoved(screen.getByText("Henter fra Dolly"));
    expect(screen.getByText(/^Dolly er tom$/)).toBeVisible();
  });

  test("viser feilmelding når søket feiler", async () => {
    server.use(rest.get("/api/dolly", (req, res) => res.networkError("Internal server error")));
    console.error = jest.fn();
    renderWithSWR(<Testpersoner />);
    await waitForElementToBeRemoved(screen.getByText("Henter fra Dolly"));
    expect(screen.getByText("Klarte ikke å hente personer.")).toBeVisible();
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
