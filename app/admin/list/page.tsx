"use client";

import { useEffect, useState } from "react";

export default function AdminList() {
  const [websites, setWebsites] = useState<any[]>([]);

  async function loadData() {
    try {
      const res = await fetch(
        "/api/list-website"
      );

      const data = await res.json();

      console.log(
        "WEBSITES =",
        data
      );

      setWebsites(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "LOAD ERROR =",
        error
      );
    }
  }

  useEffect(() => {
    const isLogin =
      localStorage.getItem(
        "admin_login"
      );

    if (!isLogin) {
      window.location.href =
        "/admin";
      return;
    }

    loadData();
  }, []);

  async function handleDelete(
    id: number,
    keyword: string
  ) {
    alert(
      `ID = ${id}\nKeyword = ${keyword}`
    );

    const confirmDelete =
      window.confirm(
        `Apakah kamu yakin ingin menghapus "${keyword}" ?`
      );

    if (!confirmDelete) {
      return;
    }

    try {
      const res = await fetch(
        "/api/delete-website",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );

      const data =
        await res.json();

      console.log(
        "DELETE RESPONSE =",
        data
      );

      if (data.success) {
        alert(
          `"${keyword}" berhasil dihapus`
        );

        loadData();
      } else {
        alert(
          "Gagal menghapus data"
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Terjadi error saat menghapus data"
      );
    }
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "30px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow:
          "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        📋 Daftar Website
      </h1>

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => {
            window.location.href =
              "/admin/add";
          }}
          style={{
            background:
              "#16a34a",
            color: "white",
            border: "none",
            padding:
              "10px 18px",
            borderRadius:
              "8px",
            cursor: "pointer",
            fontWeight:
              "bold",
            marginRight:
              "10px",
          }}
        >
          ➕ Tambah Website
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
            background:
              "#dc2626",
            color: "white",
            border: "none",
            padding:
              "10px 18px",
            borderRadius:
              "8px",
            cursor: "pointer",
            fontWeight:
              "bold",
          }}
        >
          🚪 Logout
        </button>
      </div>

      <h3>
        Total Website:{" "}
        {websites.length}
      </h3>

      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr
            style={{
              background:
                "#2563eb",
              color: "white",
            }}
          >
            <th
              style={{
                padding:
                  "12px",
              }}
            >
              No
            </th>

            <th
              style={{
                padding:
                  "12px",
              }}
            >
              Keyword
            </th>

            <th
              style={{
                padding:
                  "12px",
              }}
            >
              Title
            </th>

            <th
              style={{
                padding:
                  "12px",
              }}
            >
              URL
            </th>

            <th
              style={{
                padding:
                  "12px",
              }}
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {websites.map(
            (item, index) => (
              <tr
                key={index}
                style={{
                  borderBottom:
                    "1px solid #ddd",
                }}
              >
                <td
                  style={{
                    padding:
                      "12px",
                  }}
                >
                  {index + 1}
                </td>

                <td
                  style={{
                    padding:
                      "12px",
                    fontWeight:
                      "bold",
                  }}
                >
                  {item.keyword}
                </td>

                <td
                  style={{
                    padding:
                      "12px",
                  }}
                >
                  {item.title}
                </td>

                <td
                  style={{
                    padding:
                      "12px",
                  }}
                >
                  <a
                    href={
                      item.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.url}
                  </a>
                </td>

                <td
                  style={{
                    padding:
                      "12px",
                  }}
                >
                  <button
                    onClick={() =>
                      (window.location.href =
                        `/admin/edit?index=${index}`)
                    }
                    style={{
                      background:
                        "#2563eb",
                      color:
                        "white",
                      border:
                        "none",
                      padding:
                        "8px 14px",
                      borderRadius:
                        "6px",
                      cursor:
                        "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        item.id,
                        item.keyword
                      )
                    }
                    style={{
                      background:
                        "#dc2626",
                      color:
                        "white",
                      border:
                        "none",
                      padding:
                        "8px 14px",
                      borderRadius:
                        "6px",
                      cursor:
                        "pointer",
                      marginLeft:
                        "8px",
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}