# DLZP App Backend

Express.js backend with Anthropic Claude integration.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
PORT=3000
```

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

**Request Body:**

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

```json
{
  "id": "msg_...",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Hello! How can I help you today?"
    }
  ],
  "model": "claude-3-sonnet-20240229",
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "usage": {
    "input_tokens": 10,
    "output_tokens": 20
  }
}
```

### GET /health

Health check endpoint that returns server status.

## Environment Variables

- `ANTHROPIC_API_KEY`: Your Anthropic API key (required)
- `PORT`: Server port (default: 3000)
