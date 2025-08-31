const axios = require('axios');

/**
 * Test BlockDAG API Integration
 * Demonstrates the BlockDAG functionality through HTTP requests
 */

const API_BASE = 'http://localhost:5001/api';

async function testBlockDAGAPI() {
  console.log('🧪 Testing BlockDAG API Integration...\n');

  try {
    // Test 1: Health Check
    console.log('📝 Test 1: API Health Check');
    const healthResponse = await axios.get(`${API_BASE}/health`);
    console.log('✅ API Health:', healthResponse.data);
    console.log('');

    // Test 2: Submit Request (will be stored on BlockDAG)
    console.log('📝 Test 2: Submit Empowerment Request');
    const requestData = {
      type: 'financial_support',
      description: 'Need funding for small business startup - women\'s clothing boutique',
      urgency: 'medium',
      location: 'Cape Town, South Africa',
      contact: 'test@empowerhub.co.za'
    };

    const submitResponse = await axios.post(`${API_BASE}/requests`, requestData);
    console.log('✅ Request submitted:', submitResponse.data);
    const requestId = submitResponse.data.id;
    console.log('');

    // Test 3: Get All Requests
    console.log('📝 Test 3: Retrieve All Requests');
    const allRequestsResponse = await axios.get(`${API_BASE}/requests`);
    console.log('✅ All requests:', allRequestsResponse.data.length, 'requests found');
    console.log('Sample request:', allRequestsResponse.data[0]);
    console.log('');

    // Test 4: Get Specific Request
    console.log('📝 Test 4: Get Specific Request');
    const specificRequestResponse = await axios.get(`${API_BASE}/request/${requestId}`);
    console.log('✅ Specific request:', specificRequestResponse.data);
    console.log('');

    // Test 5: Blockchain Verification
    console.log('📝 Test 5: Blockchain Verification');
    const verifyResponse = await axios.get(`${API_BASE}/blockchain/verify/${requestId}`);
    console.log('✅ Blockchain verification:', verifyResponse.data);
    console.log('');

    // Test 6: Platform Statistics
    console.log('📝 Test 6: Platform Statistics');
    const statsResponse = await axios.get(`${API_BASE}/stats`);
    console.log('✅ Platform stats:', statsResponse.data);
    console.log('');

    // Test 7: AI Chat (optional)
    console.log('📝 Test 7: AI Assistant');
    const chatResponse = await axios.post(`${API_BASE}/ai/chat`, {
      message: 'How does BlockDAG improve the EmpowerHub platform?'
    });
    console.log('✅ AI Response:', chatResponse.data);
    console.log('');

    console.log('🎉 All API tests completed successfully!');
    console.log('BlockDAG integration is working perfectly with EmpowerHub.');

  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
  }
}

// Run the test
testBlockDAGAPI();
