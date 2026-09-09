import { GoogleGenerativeAI } from '@google/generative-ai';
import { useContext } from 'react';

const apiKey = 'AIzaSyBSlY9M2daD_c-tVu7B_UY0g1V5sOjh0jE';
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    temperature: 1,
    systemInstruction: 'trip planner'
});


async function generateContent(prompt) {
    const result = await model.generateContent(prompt);
    return result.response.text();
}

export default generateContent



