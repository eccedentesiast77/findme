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

  searches.forEach((item: any) => {
    stats[item.keyword] =
      (stats[item.keyword] || 0) + 1;
  });

  let topSearch = "-";
  let maxCount = 0;

  Object.entries(stats).forEach(
    ([keyword, count]: any) => {
      if (count > maxCount) {
        maxCount = count;
        topSearch = keyword;
      }
    }
  );

  return Response.json({
    totalSearch: searches.length,
    topSearch,
  });
}