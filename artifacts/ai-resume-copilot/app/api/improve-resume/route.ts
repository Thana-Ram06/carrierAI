import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { resume, targetRole } = await req.json();

    if (!resume) {
      return NextResponse.json(
        { error: "Resume text is required." },
        { status: 400 }
      );
    }

    const prompt = `You are a professional resume writer and career coach. Improve the following resume to make it more compelling, professional, and ATS-optimized.

${targetRole ? `The person is targeting: ${targetRole}` : ""}

Original Resume:
${resume}

Please:
1. Strengthen the professional summary
2. Use stronger action verbs and quantify achievements where possible
3. Improve the overall structure and formatting
4. Make it more ATS-friendly
5. Enhance the impact of each bullet point
6. Fix any grammatical issues

Return the improved resume as clean, well-formatted plain text.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
    });

    const content = completion.choices[0]?.message?.content ?? "";
    return NextResponse.json({ content });
  } catch (err: unknown) {
    console.error("[improve-resume]", err);
    return NextResponse.json(
      { error: "Failed to improve resume. Please try again." },
      { status: 500 }
    );
  }
}
