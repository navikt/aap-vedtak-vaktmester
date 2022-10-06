import {Heading} from "@navikt/ds-react";
import {Personer} from "../../src/components/Personer";


const PersonPage = () => {
    return (
      <>
        <Heading size={'large'}>
          Heisann
        </Heading>
        <Personer />
      </>
    )

};

export default PersonPage;
