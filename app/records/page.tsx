import { Suspense } from "react";
import RecordsTable from "./RecordsTable";

const Page = async () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RecordsTable />
      </Suspense>
    </>
  );
};

export default Page;
