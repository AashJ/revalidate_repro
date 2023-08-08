import type { FC } from "react";
import React from "react";
import { db } from "../db";
import type { Record } from "@/types";
import Link from "next/link";

export type RecordsTableProps = {};

const RecordsTable: FC<RecordsTableProps> = async ({}) => {
  const sql = "SELECT * FROM records";
  const recordsPromise: Promise<Record[]> = new Promise((resolve, reject) =>
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows as Record[]);
    })
  );
  const timer = new Promise((resolve) =>
    setTimeout(() => {
      resolve("");
    }, 2000)
  );

  const [records] = await Promise.all([recordsPromise, timer]);
  return (
    <ul>
      {records.map((record) => (
        <Link href={`/record/${record.id}`} key={record.id}>
          <li key={record.id}>
            {record.id} | {Boolean(record.read).toString()}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default RecordsTable;
