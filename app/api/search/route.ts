import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const websitePath = path.join(
      process.cwd(),
      "data",
      "websites.json"
    );

    const searchPath = path.join(
      process.cwd(),
      "data",
      "searches.json"
    );

    const websites = JSON.parse(
      fs.readFileSync(
        websitePath,
        "utf8"
      )
    );

    const keyword = query
      ?.toLowerCase()
      .trim();

    if (!keyword) {
      return Response.json({
        results: [],
      });
    }

    // Simpan statistik pencarian
    try {
      const searches = JSON.parse(
        fs.readFileSync(
          searchPath,
          "utf8"
        )
      );

      searches.push({
        keyword,
        date: new Date().toISOString(),
      });

      fs.writeFileSync(
        searchPath,
        JSON.stringify(
          searches,
          null,
          2
        )
      );
    } catch {
      fs.writeFileSync(
        searchPath,
        JSON.stringify(
          [
            {
              keyword,
              date: new Date().toISOString(),
            },
          ],
          null,
          2
        )
      );
    }

    let results = websites.filter(
      (item: any) => {
        const searchText = `
          ${item.keyword}
          ${item.title}
          ${item.description || ""}
        `.toLowerCase();

        return searchText.includes(
          keyword
        );
      }
    );

    results.sort(
      (a: any, b: any) => {
        const aFeatured =
          a.featured === true ? 1 : 0;

        const bFeatured =
          b.featured === true ? 1 : 0;

        return (
          bFeatured - aFeatured
        );
      }
    );

    return Response.json({
      results,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        results: [],
        error: "Terjadi kesalahan",
      },
      {
        status: 500,
      }
    );
  }
}