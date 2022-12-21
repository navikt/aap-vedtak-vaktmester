import { render, screen } from "@testing-library/react";
import { Layout } from "./Layout";

describe("Layout", () => {
  test("Tegner appen", () => {
    render(
      <Layout>
        <div>Innhold</div>
      </Layout>
    );
    expect(screen.getByRole("link", { name: /AAP Vedtak Vaktmester/ })).toBeVisible();
    expect(screen.getByText("Innhold")).toBeVisible();
  });
});
