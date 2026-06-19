import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    console.log("ID DITERIMA =", id);

    const filePath = path.join(
      process.cwd(),
      "data",
      "websites.json"
    );

    const jsonData = fs.readFileSync(
      filePath,
      "utf8"
    );

    const websites = JSON.parse(
      jsonData
    );

    console.log(
      "DATA SEBELUM HAPUS =",
      websites
    );

    const updatedWebsites =
      websites.filter(
        (item: any) =>
          Number(item.id) !==
          Number(id)
      );

    console.log(
      "DATA SESUDAH HAPUS =",
      updatedWebsites
    );

    fs.writeFileSync(
      filePath,
      JSON.stringify(
        updatedWebsites,
        null,
        2
      )
    );

    return Response.json({
      success: true,
      deletedId: id,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error:
          "Gagal menghapus data",
      },
      {
        status: 500,
      }
    );
  }
}