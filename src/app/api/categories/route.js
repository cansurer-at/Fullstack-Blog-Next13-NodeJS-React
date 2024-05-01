import prisma from "../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.error(err); // Log the error
    return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
  }
}

export const POST = async (req) => {
  try {
    const { title, slug } = await req.json(); // Assuming the request body contains the name and slug of the category

    // Create the category in the database
    const newCategory = await prisma.category.create({
      data: {
        title: title,
        slug: slug,
      },
    });

    return new NextResponse(JSON.stringify(newCategory), { status: 201 }); // Return the created category with status 201 (Created)
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

