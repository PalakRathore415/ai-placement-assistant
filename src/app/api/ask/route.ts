import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const question = body.question;

    if (!question) {
      return NextResponse.json({
        answer: "No question provided.",
      });
    }

    const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

    const result = await model.generateContent(question);

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      answer: text,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      answer: "Something went wrong.",
    });
  }
}