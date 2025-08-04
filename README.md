# DLZP App Backend

Express.js backend with Anthropic Claude integration.

## Features

- 🤖 Claude AI integration via Anthropic API
- 🚀 Express.js REST API
- 💬 Support for system messages and multi-turn conversations
- 🔐 Secure API key handling
- 🌐 CORS enabled for frontend integration
- 📊 Health check endpoint
- 🔍 Request/response logging

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory for local development:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
PORT=3000
```

> **Note**: Get your Anthropic API key from [https://console.anthropic.com/](https://console.anthropic.com/)

3. Start the server:

```bash
# Production
npm start

# Development (with auto-restart)
npm run dev
```

## API Endpoints

### POST /api/chat

Send messages to Claude and receive responses.

**Model**: Currently configured to use `claude-sonnet-4-20250514`  
**Max Tokens**: 500  
**Response Format**: Direct text content (simplified for frontend integration)

**Request Body:**

```json
{
  "system": "You are a helpful coding assistant.",
  "messages": [
    {
      "role": "user",
      "content": "Hello, Claude!"
    }
  ]
}
```

**Alternative Request (without system message):**

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello, Claude!"
    }
  ]
}
```

**Response:**

The API returns just the text content directly:

```json
"Hello! How can I help you with coding today?"
```

**Multi-turn Conversation Example:**

```json
{
  "system": "You are a helpful assistant.",
  "messages": [
    {
      "role": "user",
      "content": "What is Express.js?"
    },
    {
      "role": "assistant",
      "content": "Express.js is a web framework for Node.js..."
    },
    {
      "role": "user",
      "content": "How do I create middleware?"
    }
  ]
}
```

### GET /health

Health check endpoint that returns server status.

## Environment Variables

- `ANTHROPIC_API_KEY`: Your Anthropic API key (required)
- `PORT`: Server port (default: 3000)

## Testing the API

### Using cURL

```bash
# Basic request
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "Hello!"
      }
    ]
  }'

# With system message
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "system": "You are a helpful coding assistant.",
    "messages": [
      {
        "role": "user",
        "content": "Explain async/await in JavaScript"
      }
    ]
  }'
```

### Health Check

```bash
curl http://localhost:3000/health
```

## Deployment

### Heroku Deployment

1. Create a Heroku app:

```bash
heroku create your-app-name
```

2. Set environment variables:

```bash
heroku config:set ANTHROPIC_API_KEY=your_actual_api_key
```

3. Deploy:

```bash
git push heroku main
```

4. Verify deployment:

```bash
heroku logs --tail
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200`: Success
- `400`: Bad request (invalid message format)
- `500`: Server error (API key issues, Anthropic API errors)

**Common Error Response:**

```json
{
  "error": "Connection error."
}
```

## Troubleshooting

1. **"API key not configured"**: Make sure `ANTHROPIC_API_KEY` is set in your environment variables
2. **"Connection error"**: Check your API key is valid and you have sufficient credits
3. **400 errors**: Verify your request body format matches the examples above

## Project Structure

```
DLZP-app-backend/
├── app.js              # Main Express server
├── package.json        # Dependencies and scripts
├── sample-request.json # Example API request
├── .env               # Environment variables (create this)
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Dependencies

- **express**: Web framework for Node.js
- **@anthropic-ai/sdk**: Official Anthropic SDK
- **dotenv**: Environment variable loader
- **nodemon**: Development auto-restart (dev dependency)
