# n8n RAG Chat Interface

A modern, responsive chat interface for interacting with an n8n-powered RAG (Retrieval Augmented Generation) system.

## Overview

This project provides a frontend interface for an n8n workflow that implements a RAG system. Users can ask questions about documents stored in a vector database and receive AI-generated answers based on the content of those documents.

## Features

- Mobile-responsive design
- Document listing functionality
- Chat history management
- Session persistence
- Reset chat functionality
- Full Markdown formatting support

## Setup

1. Clone this repository:
   ```   git clone <repository-url>
   cd n8n-rag-chat
   ```

2. Configure your n8n endpoint:
   Open `js/config.js` and update the `chatEndpoint` with your n8n webhook URL.
   ```javascript
   chatEndpoint: 'https://your-n8n-instance.app/webhook/e104e40e-6134-4825-a6f0-8a646d882662'
   ```

3. Deploy on hosting service, or locally with `npx serve`

## n8n Workflow Requirements

This interface is designed to work with the n8n RAG workflow included in this repository (`n8n-workflow.md`). The workflow should:

1. Provide a webhook endpoint for chat messages
2. Accept a JSON payload with `chatInput` and `sessionId` properties
3. Return a JSON response with an `output` property containing the AI-generated answer

## License

MIT 
