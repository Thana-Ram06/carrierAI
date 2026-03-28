import { Router, type IRouter } from "express";
import {
  GenerateResumeBody,
  GenerateResumeResponse,
  ImproveResumeBody,
  ImproveResumeResponse,
  GenerateInterviewQuestionsBody,
  GenerateInterviewQuestionsResponse,
} from "@workspace/api-zod";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

router.post("/resume/generate", async (req, res): Promise<void> => {
  const parsed = GenerateResumeBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, skills, experience, education, targetRole } = parsed.data;

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
  res.json(GenerateResumeResponse.parse({ content }));
});

router.post("/resume/improve", async (req, res): Promise<void> => {
  const parsed = ImproveResumeBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { resume, targetRole } = parsed.data;

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
  res.json(ImproveResumeResponse.parse({ content }));
});

router.post("/resume/interview", async (req, res): Promise<void> => {
  const parsed = GenerateInterviewQuestionsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { role, skills } = parsed.data;

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
    req.log.warn("Failed to parse interview questions JSON");
    questions = [];
  }

  res.json(GenerateInterviewQuestionsResponse.parse({ questions }));
});

export default router;
