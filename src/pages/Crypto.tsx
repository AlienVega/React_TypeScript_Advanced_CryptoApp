import Filters from "../components/Filters";
import TableComponent from "../components/TableComponent";

const Crypto = () => {
  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <Filters />
      <TableComponent />
    </section>
  );
};

export default Crypto;
