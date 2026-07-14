import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Initialize Supabase with service role key (for bypassing RLS and doing admin operations like decrementing tokens)
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

router.post('/generate-brand', async (req, res) => {
  try {
    const { brandName } = req.body;
    
    // 1. Get the Authorization token from the request
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization headers' });
    }
    const token = authHeader.replace('Bearer ', '');

    // 2. Verify user JWT to get user ID
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // 3. Check if user has enough tokens
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('brand_tokens')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return res.status(400).json({ error: 'User profile not found' });
    }

    if (profile.brand_tokens <= 0) {
      return res.status(403).json({ error: 'Insufficient tokens. Please top up.' });
    }

    // 4. Generate the brand using Google Gemini
    // We ask Gemini to output JSON for easy parsing
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      You are an expert branding AI. Create a cohesive brand identity for a company named "${brandName}".
      Respond ONLY with valid JSON in exactly this structure:
      {
        "name": "${brandName}",
        "identity": {
          "tagline": "A short, catchy tagline",
          "description": "A 2-sentence description of the brand's vision.",
          "logoStyle": "circle", // choose from: circle, triangle, abstract, square
          "colors": {
            "name": "Palette Name",
            "hex": ["#color1", "#color2", "#color3", "#color4"]
          },
          "typography": {
            "primary": "Primary Font",
            "secondary": "Secondary Font"
          }
        },
        "mission": {
          "about": "A 3-sentence company story/mission statement."
        },
        "copy": {
          "elevatorPitch": "A punchy elevator pitch."
        },
        "social": [
          { "platform": "Twitter", "post": "A sample tweet." },
          { "platform": "LinkedIn", "post": "A sample post." },
          { "platform": "Instagram", "post": "A sample caption." }
        ],
        "strategy": [
          { "goal": "Goal 1", "action": "Action 1" },
          { "goal": "Goal 2", "action": "Action 2" },
          { "goal": "Goal 3", "action": "Action 3" }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Extract JSON from markdown formatting if present
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const brandData = JSON.parse(cleanJson);

    // 5. Decrement the user's tokens by 1
    const { error: decrementError } = await supabase
      .from('profiles')
      .update({ brand_tokens: profile.brand_tokens - 1 })
      .eq('id', user.id);

    if (decrementError) {
      console.error("Failed to decrement tokens:", decrementError);
      // We still return the brand, but might want to handle this edge case better in prod
    }

    // Return the generated brand
    return res.json(brandData);

  } catch (error) {
    console.error("Generation Error:", error);
    return res.status(500).json({ error: 'Failed to generate brand' });
  }
});

export default router;
