import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { path, tags } = body as {
    path?: string;
    tags?: string[];
  };

  if (!path && (!tags || tags.length === 0)) {
    return NextResponse.json(
      { revalidated: false, error: "Missing path or tags." },
      { status: 400 }
    );
  }

  if (path) {
    revalidatePath(path);
  }

  tags?.forEach((tag) => revalidateTag(tag));

  return NextResponse.json({
    revalidated: true,
    path: path || null,
    tags: tags || [],
  });
}
