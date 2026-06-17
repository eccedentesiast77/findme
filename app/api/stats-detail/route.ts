import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "data",
    "searches.json"
  );

  const searches = JSON.parse(
    fs.readFileSync(
      filePath,
      "utf8"
    )
  );

  const stats: any = {};

  searches.forEach(
    (item: any) => {
      stats[item.keyword] =
        (stats[item.keyword] || 0) + 1;
    }
  );

  const result = Object.entries(
    stats
  )
    .sort(
      (a: any, b: any) =>
        b[1] - a[1]
    )
    .map((item: any) => ({
      keyword: item[0],
      total: item[1],
    }));

  return Response.json(result);
}