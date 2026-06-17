"use client";

import { useEffect, useState } from "react";

export default function AdminList() {
  const [websites, setWebsites] = useState<any[]>([]);

  async function loadData() {
    const res = await fetch("/api/list-website");
    const data = await res.json();

    setWebsites(data);
  }

  useEffect(() => {
    const isLogin =
      localStorage.getItem("admin_login");

    if (!isLogin) {
      window.location.href = "/admin";
      return;
    }

    loadData();
  }, []);

  async function handleDelete(index: number) {
    await fetch(
      "/api/delete-website",
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

    loadData();
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Daftar Website</h1>

      <br />

      <button
        onClick={() => {
          window.location.href =
            "/admin/add";
        }}
        style={{
          backgroundColor: "green",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Tambah Website
      </button>

      <button
        onClick={() => {
          localStorage.removeItem(
            "admin_login"
          );

          window.location.href =
            "/admin";
        }}
        style={{
          backgroundColor: "red",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <br />
      <br />

      <table
        border={1}
        cellPadding={10}
        style={{
          marginTop: "20px",
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Keyword</th>
            <th>Title</th>
            <th>URL</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {websites.map((item, index) => (
            <tr key={index}>
              <td>{item.keyword}</td>
              <td>{item.title}</td>
              <td>{item.url}</td>

              <td>
                <button
                  onClick={() =>
                    (window.location.href =
                      `/admin/edit?index=${index}`)
                  }
                  style={{
                    backgroundColor:
                      "blue",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(index)
                  }
                  style={{
                    backgroundColor:
                      "red",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginLeft: "8px",
                  }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}