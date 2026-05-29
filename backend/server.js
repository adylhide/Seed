import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
// FIX: Passing the configuration object prevents the project/location TypeError crash
const ai = new GoogleGenAI({});

app.use(cors());
app.use(express.json());

app.post('/api/generate-strategy', async (req, res) => {
  try {
    const { title, description, milestones } = req.body;
    
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Missing required core payload identity metrics (title)." });
    }

    const projectTitle = title.trim();
    const projectDesc = description?.trim() || "No detailed parameters mapped.";
    const projectMilestones = Array.isArray(milestones) ? milestones.filter(Boolean).join(', ') : "General exploration paths.";

    const prompt = `You are an expert project strategy planner. Analyze this project objective:
    Title: ${projectTitle}
    Description: ${projectDesc}
    Milestones: ${projectMilestones}

    Generate two strategy frameworks. Return EXACTLY a JSON structure matching this shape:
    {
      "velocity": {
        "title": "Speed/Execution Strategy Title",
        "directive": "One line high-impact directive mantra statement",
        "description": "A robust 3-4 sentence strategic summary detailing how to quickly achieve these goals."
      },
      "safeguard": {
        "title": "Risk/Quality Strategy Title",
        "directive": "One line high-impact defensive mantra statement",
        "description": "A robust 3-4 sentence summary detailing risk mitigation parameters for this specific target structure."
      }
    }`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const responseText = response.text;
    const cleanJsonData = JSON.parse(responseText);
    
    res.json(cleanJsonData);
  } catch (error) {
    console.error("Pipeline failure on AI strategy module:", error);
    res.status(500).json({ error: "Internal Core Execution Node Exception." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`\x1b[32m%s\x1b[0m`, `Sandbox integration active on port ${PORT}`);
});