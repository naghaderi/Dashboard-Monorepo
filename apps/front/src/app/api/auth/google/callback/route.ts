import { createSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { BACKEND_URL } from "@/utils/constant";

export async function GET(req: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const accessToken = searchParams.get("accessToken");
    const userId = searchParams.get("userId");
    const name = searchParams.get("name");
    const avatar = searchParams.get("avatar");

    if (!accessToken || !userId || !name) {
      return NextResponse.json(
        { error: "Google OAuth Failed!" },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/auth/verify-token`, {
      headers: { authorization: `Bearer ${accessToken}` },
    });

    if (response.status !== 200) {
      const errorText = await response.text();
      console.error("Verify failed:", errorText);
      return NextResponse.json(
        { error: "JWT verification failed!", details: errorText },
        { status: response.status }
      );
    }

    await createSession({
      user: { id: userId, name, avatar: avatar ?? undefined },
      accessToken,
    });

    return NextResponse.redirect(new URL("/", req.url));
  } catch (err) {
    console.error("OAuth callback error:", err);
    return NextResponse.json(
      { error: "Unexpected server error", details: String(err) },
      { status: 500 }
    );
  }
}
