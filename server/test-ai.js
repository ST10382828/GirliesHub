require('dotenv').config();
const { chatWithAI, generateResponseSuggestions, chatWithSuggestions } = require('./ai');

async function testAI() {
  console.log('🧪 Testing Gemini AI Integration...\n');
  
  try {
    // Test 1: Basic chat
    console.log('📝 Test 1: Basic Chat');
    console.log('User: "How can I find financial seminars?"');
    const response1 = await chatWithAI("How can I find financial seminars?");
    console.log(`AI: ${response1}\n`);
    
    // Test 2: Response suggestions
    console.log('💡 Test 2: Response Suggestions');
    const suggestions = await generateResponseSuggestions("User asked about financial seminars");
    console.log(`Suggestions: ${suggestions.join(', ')}\n`);
    
    // Test 3: Enhanced chat with suggestions
    console.log('🚀 Test 3: Enhanced Chat with Suggestions');
    console.log('User: "I need information about safe shelters"');
    const enhancedResponse = await chatWithSuggestions("I need information about safe shelters");
    console.log(`AI Response: ${enhancedResponse.response}`);
    console.log(`Suggestions: ${enhancedResponse.suggestions.join(', ')}\n`);
    
    // Test 4: GBV Support query
    console.log('🆘 Test 4: GBV Support Query');
    console.log('User: "I need information about safe shelters"');
    const response2 = await chatWithAI("I need information about safe shelters");
    console.log(`AI: ${response2}\n`);
    
    // Test 5: Sanitary Aid query
    console.log('🧴 Test 5: Sanitary Aid Query');
    console.log('User: "Where can I find donation bins for sanitary products?"');
    const response3 = await chatWithAI("Where can I find donation bins for sanitary products?");
    console.log(`AI: ${response3}\n`);
    
    console.log('✅ All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.message.includes('API_KEY') || error.message.includes('authentication')) {
      console.log('\n🔑 To fix this:');
      console.log('1. Get your Gemini API key from: https://makersuite.google.com/app/apikey');
      console.log('2. Add it to your .env file: GEMINI_API_KEY=your_actual_api_key');
      console.log('3. Restart the server');
    }
  }
}

// Run the test
testAI();
