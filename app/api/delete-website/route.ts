import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { index } = await req.json();

  const filePath = path.join(
    process.cwd(),
    "data",
    "websites.json"
  );

  const jsonData = fs.readFileSync(
    filePath,
    "utf8"
  );

  const websites = JSON.parse(jsonData);

  websites.splice(index, 1);

  fs.writeFileSync(
    filePath,
    JSON.stringify(websites, null, 2)
  );

  return Response.json({
    success: true,
  });
}