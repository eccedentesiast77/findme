import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (
    username === "admin" &&
    password === "admin123"
  ) {
    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set(
      "admin_login",
      "true"
    );

    return response;
  }

  return NextResponse.json({
    success: false,
  });
}