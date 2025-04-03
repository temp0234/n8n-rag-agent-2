/**
 * Configuration for the n8n RAG Chat Interface
 */
const CONFIG = {
    // Replace with your actual n8n webhook URL
    chatEndpoint: 'https://a3ai.app.n8n.cloud/webhook/e104e40e-6134-4825-a6f0-8a646d882662',
    
    // Unique session ID generation
    generateSessionId: () => {
        return 'session_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },
    
    // Local storage keys
    storageKeys: {
        sessionId: 'n8n_rag_session_id',
        chatHistory: 'n8n_rag_chat_history'
    },
    
    // Message display settings
    messageSettings: {
        typingIndicatorDelay: 500,  // ms
        messageDisplayDelay: 25,    // ms per character
        maxHistoryLength: 50        // max number of messages to keep in history
    }
}; 