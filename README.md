# n8n RAG Chat Interface

A modern, responsive chat interface for interacting with an n8n-powered RAG (Retrieval Augmented Generation) system.

## Overview

This project provides a frontend interface for an n8n workflow that implements a RAG system. Users can ask questions about documents stored in a vector database and receive AI-generated answers based on the content of those documents.

## Features

- Modern, aesthetic chat interface with a blue theme
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

3. Deploy to GitHub Pages:
   - Go to your GitHub repository settings
   - Navigate to the "Pages" section
   - Set the source to the branch containing your code
   - Click "Save"

   Alternatively, you can serve the files locally with any static file server:
   ```
   npx serve
   ```

## Usage

1. Open the deployed website in your browser
2. Type a message in the input field and press Enter or click the send button
3. View available documents by clicking the Documents button
4. Reset the chat and start a new session by clicking the Reset button

## Markdown Support

The chat interface supports the following Markdown features:
- **Headings** (# H1, ## H2, etc.)
- **Formatting** (*italic*, **bold**, ~~strikethrough~~)
- **Lists** (ordered and unordered)
- **Links** ([link text](url))
- **Images** (![alt text](image-url))
- **Code blocks** (inline `code` and ```multi-line code blocks```)
- **Blockquotes** (> quote)
- **Tables** (standard Markdown table syntax)
- **Horizontal rules** (---)

Messages are automatically formatted when displayed in the chat.

## n8n Workflow Requirements

This interface is designed to work with the n8n RAG workflow included in this repository (`n8n-workflow.md`). The workflow should:

1. Provide a webhook endpoint for chat messages
2. Accept a JSON payload with `chatInput` and `sessionId` properties
3. Return a JSON response with an `output` property containing the AI-generated answer

## Customization

- Colors: Modify the CSS variables in `css/styles.css` to change the color scheme
- Layout: Adjust the CSS styles to modify the layout and appearance

## Browser Compatibility

This interface is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## License

MIT 
