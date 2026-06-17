"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function EditPage() {
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
      <h1>Edit Website</h1>

      <br />

      <label>Keyword</label>

      <input
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        style={{
          width: "400px",
          padding: "10px",
          border: "1px solid #000",
          display: "block",
          marginTop: "5px",
        }}
      />

      <br />

      <label>Title</label>

      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        style={{
          width: "400px",
          padding: "10px",
          border: "1px solid #000",
          display: "block",
          marginTop: "5px",
        }}
      />

      <br />

      <label>URL</label>

      <input
        value={url}
        onChange={(e) =>
          setUrl(e.target.value)
        }
        style={{
          width: "400px",
          padding: "10px",
          border: "1px solid #000",
          display: "block",
          marginTop: "5px",
        }}
      />

      <br />

      <label>Description</label>

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        rows={4}
        style={{
          width: "400px",
          padding: "10px",
          border: "1px solid #000",
          display: "block",
          marginTop: "5px",
        }}
      />

      <br />

      <label>
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) =>
            setFeatured(
              e.target.checked
            )
          }
        />{" "}
        Featured Website
      </label>

      <br />
      <br />

      <button
        onClick={handleSave}
        style={{
          backgroundColor: "green",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Simpan
      </button>
    </div>
  );
}