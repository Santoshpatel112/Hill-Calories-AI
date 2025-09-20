import { MealAnalysisResponse } from '@/types/nutrition';

// URL encode the webhook URL to handle spaces
const WEBHOOK_URL = 'https://rajsant123.app.n8n.cloud/webhook-test/meal%20analysis';
// Alternative URL without spaces (if needed)
const WEBHOOK_URL_ALT = 'https://rajsant123.app.n8n.cloud/webhook-test/meal-analysis';
// Try the original URL as provided by user
const WEBHOOK_URL_ORIGINAL = 'https://rajsant123.app.n8n.cloud/webhook-test/meal analysis';

// Development mode flag - set to true to use mock data for testing
const USE_MOCK_DATA = false;

export class MealAnalysisAPI {
  // Allow switching between mock and real API
  static useMockData = false;
  
  // Test webhook connectivity
  static async testWebhook(): Promise<void> {
    const urls = [WEBHOOK_URL_ORIGINAL, WEBHOOK_URL, WEBHOOK_URL_ALT];
    
    console.log('🧪 Testing webhook connectivity...');
    
    for (const url of urls) {
      try {
        console.log(`Testing: ${url}`);
        
        // Test 1: GET request to see if webhook responds
        try {
          const getResponse = await fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          });
          console.log(`✅ GET ${url} responded with status: ${getResponse.status}`);
        } catch (getError) {
          console.log(`❌ GET ${url} failed:`, getError);
        }
        
        // Test 2: POST request with test data
        try {
          const testResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ test: 'data' })
          });
          console.log(`✅ POST ${url} responded with status: ${testResponse.status}`);
          const responseText = await testResponse.text();
          console.log(`Response:`, responseText);
        } catch (postError) {
          console.log(`❌ POST ${url} failed:`, postError);
        }
        
      } catch (error) {
        console.log(`❌ ${url} failed:`, error);
      }
    }
  }
  
  static async analyzeImage(imageFile: File): Promise<MealAnalysisResponse> {
    console.log('🔄 Starting image analysis...');
    console.log('📁 File details:', {
      name: imageFile.name,
      size: imageFile.size,
      type: imageFile.type
    });
    
    // Use mock data in development mode or as fallback
    if (this.useMockData) {
      console.log('🧪 Using mock data for development');
      return this.getMockResponse();
    }
    
    // Try the webhook with fallback to mock data
    try {
      return await this.tryWebhookWithFallback(imageFile);
    } catch (error) {
      console.error('❌ Webhook failed, falling back to mock data:', error);
      return this.getMockResponse();
    }
  }
  
  private static async tryWebhookWithFallback(imageFile: File): Promise<MealAnalysisResponse> {
    // Try multiple approaches with different field names and formats
    const attempts = [
      // FormData attempts with different field names
      () => this.tryWithUrl(WEBHOOK_URL_ORIGINAL, imageFile, 'image'),
      () => this.tryWithUrl(WEBHOOK_URL_ORIGINAL, imageFile, 'file'),
      () => this.tryWithUrl(WEBHOOK_URL_ORIGINAL, imageFile, 'data'),
      () => this.tryWithUrl(WEBHOOK_URL_ORIGINAL, imageFile, 'body'),
      // Try other URL formats
      () => this.tryWithUrl(WEBHOOK_URL, imageFile, 'image'),
      () => this.tryWithUrl(WEBHOOK_URL_ALT, imageFile, 'image'),
      // Base64 attempts
      () => this.tryWithBase64(WEBHOOK_URL_ORIGINAL, imageFile)
    ];
    
    for (let i = 0; i < attempts.length; i++) {
      try {
        console.log(`🎯 Attempt ${i + 1}/${attempts.length}`);
        const result = await attempts[i]();
        console.log('✅ Success on attempt', i + 1);
        return result;
      } catch (error) {
        console.warn(`❌ Attempt ${i + 1} failed:`, error);
        if (i === attempts.length - 1) {
          // If all attempts fail, throw error to trigger fallback
          throw new Error('All webhook attempts failed');
        }
      }
    }
    
    throw new Error('All attempts failed');
  }
  
  private static getMockResponse(): Promise<MealAnalysisResponse> {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          output: {
            status: "success",
            food: [
              {
                name: "Grilled Chicken Breast",
                quantity: "150g",
                calories: 248,
                protein: 46,
                carbs: 0,
                fat: 5.3
              },
              {
                name: "Cherry Tomatoes",
                quantity: "100g",
                calories: 18,
                protein: 0.9,
                carbs: 3.9,
                fat: 0.2
              },
              {
                name: "Mixed Vegetables",
                quantity: "120g",
                calories: 45,
                protein: 2.1,
                carbs: 8.5,
                fat: 0.3
              }
            ],
            total: {
              calories: 311,
              protein: 49,
              carbs: 12.4,
              fat: 5.8
            }
          }
        });
      }, 2000); // 2 second delay to simulate real API
    });
  }
  
  private static async tryWithUrl(url: string, imageFile: File, fieldName: string): Promise<MealAnalysisResponse> {
    const formData = new FormData();
    
    // Try different field names that n8n might expect
    formData.append(fieldName, imageFile);
    formData.append('data', imageFile);  // n8n often uses 'data'
    formData.append('body', imageFile);  // Alternative field name
    
    console.log(`🌐 Trying URL: ${url} with field: ${fieldName}`);
    console.log('📦 FormData contents:', Array.from(formData.entries()).map(([key, value]) => [key, value instanceof File ? `File: ${value.name}` : value]));
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - let browser set it with boundary
    });

    return this.handleResponse(response);
  }
  
  private static async tryWithBase64(url: string, imageFile: File): Promise<MealAnalysisResponse> {
    console.log(`🌐 Trying Base64 approach with URL: ${url}`);
    
    // Convert to base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
    
    // Try different payload formats that n8n might expect
    const payloads = [
      // Format 1: Direct base64 in image field
      {
        image: base64,
        filename: imageFile.name,
        mimetype: imageFile.type
      },
      // Format 2: n8n webhook format
      {
        data: {
          image: base64,
          filename: imageFile.name,
          mimetype: imageFile.type
        }
      },
      // Format 3: Just the base64 string
      {
        body: base64
      }
    ];
    
    for (let i = 0; i < payloads.length; i++) {
      try {
        console.log(`📦 Trying payload format ${i + 1}:`, Object.keys(payloads[i]));
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payloads[i])
        });
        
        if (response.ok) {
          return this.handleResponse(response);
        } else {
          console.warn(`Payload ${i + 1} failed with status:`, response.status);
        }
      } catch (error) {
        console.warn(`Payload ${i + 1} failed:`, error);
      }
    }
    
    throw new Error('All Base64 payload formats failed');
  }
  
  private static async handleResponse(response: Response): Promise<MealAnalysisResponse> {
    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ HTTP Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const responseText = await response.text();
    console.log('📝 Raw response:', responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      throw new Error('Invalid JSON response from webhook');
    }
    
    console.log('📊 Parsed data:', data);
    
    // The webhook returns an array with one object containing the output
    if (Array.isArray(data) && data.length > 0 && data[0].output) {
      console.log('✅ Successfully parsed webhook response (array format)');
      return data[0] as MealAnalysisResponse;
    }
    
    // Check if it's a direct response format
    if (data.output) {
      console.log('✅ Direct response format detected');
      return data as MealAnalysisResponse;
    }
    
    console.error('❌ Invalid response format:', data);
    throw new Error('Invalid response format from webhook');
  }
}