import { db } from "@/app/db";
import { Record } from "@/types";
import { revalidatePath } from "next/cache";
import RevalidateOnMount from "./RevalidateOnMount";

const Page = async (props: any) => {
  const id = props.params.id;
  const sql = `SELECT * FROM records where id = ${id}`;
  const [record]: Record[] = await new Promise((resolve, reject) =>
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows as Record[]);
    })
  );

  const updateSql = `UPDATE records SET read = 1 WHERE id = ${id}`;
  await new Promise((resolve, reject) =>
    db.all(updateSql, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve("");
    })
  );

  const revalidateRecordsPath = async () => {
    "use server";
    revalidatePath("/records/(records)/");
  };

  const updateReadToTrue = async () => {
    "use server";
    const updateSql = `UPDATE records SET read = 1 WHERE id = ${id}`;
    db.all(updateSql, [], (err, rows) => {});
  };

  const updateReadToFalse = async () => {
    "use server";
    const updateSql = `UPDATE records SET read = 0 WHERE id = ${id}`;
    db.all(updateSql, [], (err, rows) => {});
  };

  return (
    <div>
      {JSON.stringify(record)}
      <form action={updateReadToTrue}>
        <button type="submit">Update read to true</button>
      </form>
      <form action={updateReadToFalse}>
        <button type="submit">Update read to false</button>
      </form>
      <RevalidateOnMount onMount={revalidateRecordsPath} />
    </div>
  );
};

export default Page;
