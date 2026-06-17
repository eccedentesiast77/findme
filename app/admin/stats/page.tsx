import fs from "fs";
import path from "path";

export default function StatsPage() {
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
        (stats[item.keyword] || 0)
        + 1;
    }
  );

  const result =
    Object.entries(stats)
      .sort(
        (a: any, b: any) =>
          b[1] - a[1]
      );

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h1>
        Statistik Pencarian
      </h1>

      <br />

      {result.map(
        (
          item: any,
          index
        ) => (
          <div
            key={index}
            style={{
              marginBottom:
                "10px",
            }}
          >
            {item[0]} : {item[1]}
          </div>
        )
      )}
    </div>
  );
}