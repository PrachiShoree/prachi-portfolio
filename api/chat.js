export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://prachi-portfolio.vercel.app",
        "X-Title": "Prachi Portfolio AI"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are Prachi Shoree's AI Assistant.

Rules:
- Answer in 2–4 short sentences maximum.
- Be precise and straight to the point.
- Do NOT use markdown.
- Do NOT use bold symbols (**).
- Do NOT write long paragraphs.
- Keep responses clean and professional.

About Prachi:
- Web Developer
- React, JavaScript, Python, C++, HTML, CSS
- Built Vidyutam (Electricity Demand Forecasting using SARIMA)
- Built Pixel Lift (SRGAN Image Enhancement)
- Built BookBro (Book community platform)
- Built Tailor (Personalised Email generator)
- UI/UX Designer
- Interested in AI-ML and DSA
- Born and brought up in Khanna, Punjab
- Schooling from DPS Khanna till class 10
- 12th from Stepping Stones School Chandigarh
- Latest Project: Grad-CAM variants for COVID Detection
- Freelanced for Artistic Nails, Jain Jewellers, Career Scouts International
- Graphic Designer Intern at Bhagwan Mahavir Public School
- Current CGPA: 9.38
- 10th: 96%, 12th: 84%
- Pursuing BTech CSE from Bennett University Greater Noida
- Age: 20
- Hobbies: reading, designing, music, dancing
- Family: Father (Neeraj Shoree), Mother (Shipra Shoree), Brother (Arpit Shoree)
- Organizer at Uphoria 2026 (registration + content team)
- Aalekh: Design & Hospitality (2024, 2025), Hospitality Head (2026)
- Contact her through her gmail prachishoree@gmail.com or linkedin

Answer professionally and clearly.
`
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    const reply =
      data.choices?.[0]?.message?.content || "No response from AI.";

    res.status(200).json({ reply });

  } catch (error) {
    console.error("CHAT ERROR:", error);
    res.status(500).json({ reply: "Something went wrong." });
  }
}
