require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const API_KEY = process.env.OPENAI_API_KEY; // Replace with your Gemini API key
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const getOptimizedCode = async (code, language) => {
  try {
    // const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateText?key=[AIzaSyAWMP5py6H-AOhbcKGlu84g5Rggw7Zva_w]', { // Update with the correct Gemini API endpoint
    //   prompt: `Explain the following code: ${code}`,
    //   max_tokens: 100,
    //   // Adjust the parameters based on Gemini's API specifications
    // }, {
    //   headers: {
    //     'Authorization': `Bearer ${API_KEY}`,
    //     'Content-Type': 'application/json' // Adjust if needed
    //   }
    // });
    // return response.data.choices[0].text; // Update according to Gemini's response structure
    // Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
  const genAI = new GoogleGenerativeAI("AIzaSyA4F4cWYwpCFCM0ZVNT6W2ghOGx3C8lijw");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "I have the following code that performs a specific task in"+language+". Could you analyze the code and provide a more efficient algorithm that accomplishes the same task but with better performance? Please optimize the algorithm, provide the improved code, and explain why this new algorithm is more efficient.Here is the code:"+code+"Replace the existing algorithm with the most optimal one for the given task, and explain the improvements made.";

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return result.response.text(); // Update according to Gemini's response structure
  } catch (error) {
    console.error("Error: ", error.response ? error.response.data : error.message);
    return code; // Fallback to original code
  }
};

const analyzeAndCompare = async (code, optimizedCode, language) => {
  const originalComplexity = 'O(n^2)'; // Example result
  const optimizedComplexity = 'O(n)';  // Example result
  
  const originalTime = Math.random() * 100 + 100; // Mock time in ms
  const optimizedTime = Math.random() * 50 + 50;  // Mock time in ms

  return {
    originalComplexity,
    optimizedComplexity,
    originalTime,
    optimizedTime,
  };
};

app.post('/analyze', async (req, res) => {
  const { code, language } = req.body;
  
  try {
    const optimizedCode = await getOptimizedCode(code, language);
    const complexityData = await analyzeAndCompare(code, optimizedCode, language);

    res.json({ 
      optimizedCode,
      ...complexityData,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error analyzing the code' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
