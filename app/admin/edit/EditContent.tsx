"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function EditContent() {
  const searchParams = useSearchParams();

  const index = searchParams.get("index");

  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] =
    useState("");
  const [featured, setFeatured] =
    useState(false);

  useEffect(() => {
    if (index !== null) {
      loadData();
    }
  }, [index]);

  async function loadData() {
    const res = await fetch(
      "/api/get-website",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          index,
        }),
      }
    );

    const data = await res.json();

    setKeyword(data.keyword);
    setTitle(data.title);
    setUrl(data.url);
    setDescription(
      data.description || ""
    );
    setFeatured(
      data.featured || false
    );
  }

  async function handleSave() {
    const res = await fetch(
      "/api/update-website",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          index,
          keyword,
          title,
          url,
          description,
          featured,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Berhasil disimpan");

      window.location.href =
        "/admin/list";
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      {/* biarkan isi JSX kamu yang sekarang */}
    </div>
  );
}