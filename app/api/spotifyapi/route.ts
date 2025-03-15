import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Use POST to request a Spotify token" }, { status: 405 });
}

export async function POST() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    return NextResponse.json({ error: "Missing Spotify credentials" }, { status: 400 });
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
