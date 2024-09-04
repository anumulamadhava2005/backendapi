require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const API_KEY = process.env.GEMINI_API_KEY; // Replace with your Gemini API key
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const getOptimizedCode = async (code, language) => {
  try {
  const genAI = new GoogleGenerativeAI(API_KEY);
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


app.post('/analyze', async (req, res) => {
  const { code, language } = req.body;
  
  try {
    const optimizedCode = await getOptimizedCode(code, language);

    res.json({ 
      optimizedCode,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error analyzing the code' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
