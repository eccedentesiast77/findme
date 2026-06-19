import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const {
    keyword,
    title,
    url,
    description,
    featured,
  } = await req.json();

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

  const newId =
    websites.length > 0
      ? Math.max(
          ...websites.map(
            (item: any) =>
              item.id || 0
          )
        ) + 1
      : 1;

  websites.push({
    id: newId,
    keyword,
    title,
    url,
    description,
    featured,
  });

  fs.writeFileSync(
    filePath,
    JSON.stringify(
      websites,
      null,
      2
    )
  );

  return Response.json({
    success: true,
  });
}