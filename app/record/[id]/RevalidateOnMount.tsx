"use client";

import type { FC } from "react";
import React, { useEffect, useTransition } from "react";

export type RevalidateOnMountProps = {
  onMount: () => void;
};

const RevalidateOnMount: FC<RevalidateOnMountProps> = ({ onMount }) => {
  let [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(onMount);
  }, []);

  return null;
};

export default RevalidateOnMount;
