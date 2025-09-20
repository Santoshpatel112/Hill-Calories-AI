# Meal Analysis Webhook Integration

This document explains how the meal analysis webhook integration works in the FoodSense AI application.

## Overview

The application now integrates with the webhook endpoint `https://rajsant123.app.n8n.cloud/webhook-test/meal analysis` to analyze meal photos and return detailed nutritional information.

## How it Works

1. **Image Upload**: User uploads or takes a photo of their meal using the ImageUpload component
2. **API Call**: The image is sent to the webhook via a POST request with multipart/form-data
3. **Analysis**: The webhook processes the image and returns detailed nutrition data
4. **Display**: The response is parsed and displayed using the enhanced NutritionResults component

## API Response Format

The webhook returns an array with one object containing the analysis output:

```json
[
  {
    "output": {
      "status": "success",
      "food": [
        {
          "name": "Grilled Chicken Breast",
          "quantity": "150g",
          "calories": 248,
          "protein": 46,
          "carbs": 0,
          "fat": 5.3
        }
        // ... more food items
      ],
      "total": {
        "calories": 467,
        "protein": 51.2,
        "carbs": 54,
        "fat": 6.7
      }
    }
  }
]
```

## Components

### Types (src/types/nutrition.ts)
- Defines interfaces for the API response structure
- Maintains backward compatibility with existing components

### API Service (src/lib/mealAnalysisAPI.ts)
- `MealAnalysisAPI.analyzeImage(file)`: Sends image to webhook and returns parsed response
- Handles errors and validates response format

### UI Components
- **NutritionResults**: Enhanced to display both individual food items and total nutrition
- **DetailedNutritionResults**: New component specifically for webhook response format
- **ImageUpload**: Unchanged, supports both file upload and camera capture

## Usage

1. Navigate to the main page
2. Upload an image using the "Upload Your Meal Photo" section
3. Click "Analyze My Meal"
4. Wait for the analysis to complete
5. View detailed results showing:
   - Individual food items with quantities and nutrition
   - Total calorie count
   - Macronutrient breakdown with percentages
   - Visual progress bars

## Error Handling

The application includes comprehensive error handling:
- Network errors when calling the webhook
- Invalid response format
- User-friendly error messages via toast notifications

## Testing

To test the integration:
1. Start the development server: `npm run dev`
2. Navigate to the application
3. Upload a test meal image
4. Verify the webhook is called and results are displayed correctly

## Notes

- The webhook URL is configured in the `MealAnalysisAPI` class
- The component maintains backward compatibility with the old format
- All styling uses the existing Tailwind CSS theme