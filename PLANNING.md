# n8n RAG Chat Interface - Project Planning

## Project Overview
This project provides a frontend chat interface for interacting with an n8n-powered RAG (Retrieval Augmented Generation) system. The interface allows users to ask questions about documents stored in a vector database and receive AI-generated answers based on the content of those documents.

## Architecture

### Components
1. **Frontend**: Static web application hosted on GitHub Pages
2. **Backend**: n8n cloud workflow providing:
   - Chat API endpoint
   - Vector store management
   - Document processing
   - RAG capabilities

### Data Flow
1. User sends a message through the chat interface
2. Frontend sends request to n8n webhook
3. n8n processes the request using its RAG AI Agent
4. n8n returns the response
5. Frontend displays the response to the user

## Technical Stack

### Frontend
- **HTML/CSS/JS**: Core web technologies
- **GitHub Pages**: Hosting platform
- **Fetch API**: For making HTTP requests to n8n
- **LocalStorage**: For storing chat history and session information

### Backend (existing n8n workflow)
- **n8n cloud**: Workflow automation platform
- **OpenAI**: For embeddings and chat model
- **Supabase**: Vector database for document storage
- **PostgreSQL**: For chat history and metadata

## Design Principles
- Mobile-first responsive design
- Clean, modern interface with blue theme
- Accessibility compliance
- Minimal dependencies (no heavy frameworks)

## Constraints
- Static hosting only (GitHub Pages)
- No server-side processing (except via n8n)
- Must work with existing n8n workflow
- Cross-origin resource sharing considerations

## Future Improvements
- User authentication
- Document upload interface
- Chat history persistence
- Theme customization
- Performance optimizations 