import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { role, skills } = await req.json();

    if (!role) {
      return NextResponse.json(
        { error: "Role is required." },
        { status: 400 }
      );
    }

    const prompt = `You are an expert career coach and interview preparation specialist. Generate 10 comprehensive interview questions and model answers for the following role.

Role: ${role}
${skills ? `Key Skills/Background: ${skills}` : ""}

Generate a mix of:
- Behavioral questions (STAR format answers)
- Technical/role-specific questions
- Situational questions
- Culture fit questions

For each question, provide a detailed model answer that demonstrates expertise and best practices.

Respond with a JSON array in this exact format:
[
  {
    "question": "Question text here",
    "answer": "Detailed model answer here"
  }
]

Return only the JSON array, no other text.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
    });

    const rawContent = completion.choices[0]?.message?.content ?? "[]";

    let questions: { question: string; answer: string }[] = [];
    try {
      const jsonMatch = rawContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0]);
      }
    } catch {
      questions = [];
    }

    return NextResponse.json({ questions });
  } catch (err: unknown) {
    console.error("[interview]", err);
    return NextResponse.json(
      { error: "Failed to generate interview questions. Please try again." },
      { status: 500 }
    );
  }
}
