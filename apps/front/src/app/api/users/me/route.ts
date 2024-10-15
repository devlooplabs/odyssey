import { Odyssey } from "@/lib/odyssey/odyssey";
import { cookies } from "next/headers";

export async function GET() {
  const jwt = cookies().get("jwt")?.value;
  if (!jwt) {
    return Response.json({ success: false });
  }

  const odyssey = new Odyssey(jwt);
  try {
    const user = await odyssey.getMe();
    return Response.json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false });
  }
}
