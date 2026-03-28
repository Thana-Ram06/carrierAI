import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { name, skills, experience, education, targetRole } = await req.json();

    if (!name || !skills || !experience || !education) {
      return NextResponse.json(
        { error: "Name, skills, experience, and education are required." },
        { status: 400 }
      );
    }

    const prompt = `You are a professional resume writer. Create a complete, ATS-friendly professional resume for the following person.

Name: ${name}
${targetRole ? `Target Role: ${targetRole}` : ""}
Skills: ${skills}
Experience: ${experience}
Education: ${education}

Write a well-structured, professional resume with:
- A strong professional summary
- Skills section
- Work experience (expand on the details provided to make it compelling)
- Education section
- Any other relevant sections

Format it as clean plain text that would look great as a resume. Use clear section headers and bullet points. Make it compelling, ATS-optimized, and tailored to the person's background.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
    });

    const content = completion.choices[0]?.message?.content ?? "";
    return NextResponse.json({ content });
  } catch (err: unknown) {
    console.error("[generate-resume]", err);
    return NextResponse.json(
      { error: "Failed to generate resume. Please try again." },
      { status: 500 }
    );
  }
}
