"use client";

import { Suspense } from "react";
import EditContent from "./EditContent";

export default function EditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditContent />
    </Suspense>
  );
}