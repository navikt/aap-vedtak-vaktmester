import { Search } from "../src/components/Search";
import Link from "next/link";

const Homepage = () => {
  return (
    <>
      <Link href={"/person"}>Testpersoner</Link>
      <Search />
    </>
  );
};

export default Homepage;
