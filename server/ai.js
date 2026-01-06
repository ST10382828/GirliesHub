const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI - using environment variable
// Log API key status for debugging (masked)
const apiKey = process.env.GEMINI_API_KEY;
console.log("Gemini key prefix:", apiKey ? apiKey.slice(0, 6) : "undefined");
console.log("Gemini key length:", apiKey ? apiKey.length : 0);

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is missing from environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

// Configure the model
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash", // Updated to latest stable model
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1024,
  },
});

// Simple system prompt for basic chatbot
const SYSTEM_PROMPT = `You are an AI assistant for GirliesHub, a comprehensive support platform for women in South Africa. Your role is to provide helpful, empathetic, and accurate information about our services.

Our platform offers three main areas of support:

1. **Financial Empowerment**: Investment seminars, financial literacy workshops, and personalized financial advice
2. **GBV Support**: Safe shelter locations, emergency contacts, counseling services, and legal aid
3. **Sanitary Aid**: Access to free sanitary products through donation bins across South Africa

Key guidelines:
- Always prioritize user safety, especially for GBV-related queries
- Provide specific, actionable information when possible
- Be empathetic and supportive in your responses
- Direct users to appropriate sections of our platform
- For urgent safety concerns, always provide emergency contact numbers
- Keep responses concise but informative
- If you're unsure about specific details, suggest they check our platform or contact support

Emergency contacts to mention when relevant:
- GBV Command Centre: 0800 428 428
- Police: 10111
- Emergency: 112

Remember: You're here to empower and support women in South Africa.`;

// In-memory chat history store (simple implementation for demo)
// In a real app, you'd use Redis or a database keyed by session ID
const chatHistory = new Map();

/**
 * Basic chat with AI assistant using Gemini API
 * @param {string} message - User message
 * @param {string} sessionId - Optional session ID for history tracking
 * @returns {Promise<string>} - AI response
 */
async function chatWithAI(message, sessionId = 'default') {
  console.log(`🤖 [Gemini AI] Processing user message for session ${sessionId}:`, message);
  
  try {
    // Get or initialize history for this session
    let history = chatHistory.get(sessionId);
    if (!history) {
      history = [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "I understand my role as a GirliesHub AI assistant. I'm ready to help women in South Africa with financial empowerment, GBV support, and sanitary aid. How can I assist you today?" }],
        }
      ];
      chatHistory.set(sessionId, history);
    }

    // Safety Override Check (Pre-LLM)
    // Detect immediate self-harm or severe emergency keywords to force a safety response
    const emergencyKeywords = ['kill myself', 'suicide', 'drink bleach', 'end my life', 'hurt myself', 'die'];
    const lowerMessage = message.toLowerCase();
    
    if (emergencyKeywords.some(keyword => lowerMessage.includes(keyword))) {
      console.log('⚠️ Safety override triggered');
      const safetyResponse = "I care about you and I want you to be safe. You are going through a crisis and need immediate support from a human. Please call 112 or 10111 right now. You can also call the GBV Command Centre at 0800 428 428 any time. Please reach out to them immediately.";
      
      // Update history manually so the model "knows" it said this
      history.push({ role: "user", parts: [{ text: message }] });
      history.push({ role: "model", parts: [{ text: safetyResponse }] });
      
      return safetyResponse;
    }

    // Create chat session with preserved history
    const chat = model.startChat({
      history: history,
    });

    // Send user message and get response
    const result = await chat.sendMessage(message);
    const response = await result.response;
    let aiResponse = response.text();

    // Clean up response (remove markdown asterisks for cleaner UI)
    aiResponse = aiResponse.replace(/\*\*/g, '').replace(/\*/g, '-');

    // Add contextual links based on content
    const lowerResponse = aiResponse.toLowerCase();
    const links = [];

    if (lowerResponse.includes('shelter') || lowerResponse.includes('gbv') || lowerResponse.includes('safety')) {
      links.push('\n\n🔗 [Find Safe Shelters](/gbv-support)');
    }
    if (lowerResponse.includes('finance') || lowerResponse.includes('money') || lowerResponse.includes('investment') || lowerResponse.includes('business')) {
      links.push('\n\n🔗 [Financial Resources](/finance)');
    }
    if (lowerResponse.includes('sanitary') || lowerResponse.includes('pads') || lowerResponse.includes('tampons') || lowerResponse.includes('donation')) {
      links.push('\n\n🔗 [Find Donation Bins](/sanitary-aid)');
    }
    if (lowerResponse.includes('emergency') || lowerResponse.includes('police') || lowerResponse.includes('10111')) {
      links.push('\n\n🚨 [Emergency Contacts](/gbv-support)'); // Removed hash anchor as simple routing is safer
    }

    // Append unique links to response
    if (links.length > 0) {
      aiResponse += [...new Set(links)].join(' ');
    }
    
    // Update our local history with the new turn
    // (Note: startChat takes history as input but doesn't automatically sync it back to our external store unless we do it)
    // Actually, the `chat` object maintains its own history state during the object's lifecycle,
    // but since we recreate `startChat` every request (stateless server), we must re-feed the updated history.
    // We need to manually append the new turn to our `history` array for the NEXT request.
    const newHistory = await chat.getHistory();
    chatHistory.set(sessionId, newHistory);

    console.log('✅ [Gemini AI] Generated response successfully');
    return aiResponse;
    
  } catch (error) {
    console.error('❌ [Gemini AI] AI processing failed:', error);
    
    // Fallback to contextual responses if Gemini API fails
    if (error.message.includes('API_KEY') || error.message.includes('authentication')) {
      return "I apologize, but I'm experiencing authentication issues with my AI service. Please check with our support team to ensure the AI assistant is properly configured.";
    }
    
    if (error.message.includes('quota') || error.message.includes('rate') || error.message.includes('limit')) {
      return "I'm experiencing high demand right now. Please try again in a few minutes, or contact our support team if you need immediate assistance.";
    }
    
    return "I apologize, but I'm experiencing some technical difficulties right now. Please try again in a moment, or contact our support team if you need immediate assistance.";
  }
}

/**
 * Generate response suggestions
 * @param {string} context - Conversation context
 * @returns {Promise<Array<string>>} - Suggested responses
 */
async function generateResponseSuggestions(context) {
  try {
    const prompt = `Based on this conversation context, suggest 3 short, relevant options for what the USER might say next.
    
    Rules:
    - Write from the USER's perspective (e.g., "Where can I find help?", "Tell me more")
    - Keep them under 10 words each
    - Do NOT suggest responses for the AI to say
    - Do NOT use asterisks, numbering, or quotes
    
    Context: "${context}"
    
    Return only the 3 lines of text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse suggestions (split by lines and clean up)
    const suggestions = text.split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.match(/^\d+\./))
      .slice(0, 3);
    
    console.log('✅ [Gemini AI] Generated suggestions successfully');
    return suggestions.length > 0 ? suggestions : getDefaultSuggestions();
    
  } catch (error) {
    console.error('❌ [Gemini AI] Suggestion generation failed:', error);
    return getDefaultSuggestions();
  }
}

/**
 * Get default response suggestions
 * @returns {Array<string>} - Default suggestions
 */
function getDefaultSuggestions() {
  return [
    "Tell me more about financial seminars",
    "How do I find safe shelters?",
    "Where are the nearest donation bins?"
  ];
}

/**
 * Enhanced chat with suggestions
 * @param {string} message - User message
 * @returns {Promise<Object>} - AI response with suggestions
 */
async function chatWithSuggestions(message, sessionId) {
  try {
    // Get AI response
    const aiResponse = await chatWithAI(message, sessionId);
    
    // Generate suggestions based on context
    const suggestions = await generateResponseSuggestions(message);
    
    return {
      response: aiResponse,
      suggestions: suggestions,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ [Gemini AI] Enhanced chat failed:', error);
    return {
      response: "I apologize, but I'm experiencing technical difficulties. Please try again or contact our support team.",
      suggestions: getDefaultSuggestions(),
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = {
  chatWithAI,
  chatWithSuggestions,
  generateResponseSuggestions,
  getDefaultSuggestions
};
