import React from "react";
import { Dropdown, Header } from "@navikt/ds-react-internal";
import { ExternalLink, System } from "@navikt/ds-icons";
import { Link } from "@navikt/ds-react";

const VaktmesterHeader = () => {
  return (
    <Header>
      <Header.Title href={"/"}>AAP Vedtak Vaktmester</Header.Title>
      <Dropdown>
        <Header.Button as={Dropdown.Toggle} style={{ marginLeft: "auto" }}>
          <System style={{ fontSize: "1.5rem" }} title={"Systemer"} />
        </Header.Button>
        <Dropdown.Menu>
          <Dropdown.Menu.GroupedList>
            <Dropdown.Menu.GroupedList.Heading>Systemer</Dropdown.Menu.GroupedList.Heading>
            <Dropdown.Menu.GroupedList.Item>
              <Link href={"https://aap-sink-utforsker.intern.dev.nav.no"} target={"_blank"}>
                AAP-sink utforsker <ExternalLink />
              </Link>
            </Dropdown.Menu.GroupedList.Item>
          </Dropdown.Menu.GroupedList>
        </Dropdown.Menu>
      </Dropdown>
    </Header>
  );
};

export { VaktmesterHeader };
