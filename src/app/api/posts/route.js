import { getAuthSession } from "../../../utils/auth.js";
import prisma from "../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 8;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);
    return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// CREATE A POST
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const { catSlugs, ...postData } = body; // Extract catSlugs from body

    // Iterate over catSlugs and create a post for each category
    const posts = await Promise.all(catSlugs.map(async (catSlug) => {
      const post = await prisma.post.create({
        data: { ...postData, catSlug, userEmail: session.user.email },
      });
      return post;
    }));

    return new NextResponse(JSON.stringify(posts, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

