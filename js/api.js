/**
 * API Service for n8n RAG Chat Interface
 * Handles all communications with the n8n backend
 */
class ApiService {
    constructor(config) {
        this.config = config;
    }

    /**
     * Send a chat message to the n8n webhook
     * @param {string} message - The user's message
     * @param {string} sessionId - The current session ID
     * @returns {Promise} - Response from the n8n webhook
     */
    async sendChatMessage(message, sessionId) {
        try {
            const response = await fetch(this.config.chatEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chatInput: message,
                    sessionId: sessionId
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error sending chat message:', error);
            throw error;
        }
    }

    /**
     * Fetch available documents from the n8n backend
     * @param {string} sessionId - The current session ID
     * @returns {Promise} - List of available documents
     */
    async fetchAvailableDocuments(sessionId) {
        try {
            // Send special command to list documents
            const response = await fetch(this.config.chatEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chatInput: "!list_documents",
                    sessionId: sessionId
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            // Parse the document list from the AI's response
            if (data.output) {
                return this.parseDocumentList(data.output);
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
            throw error;
        }
    }

    /**
     * Parse document list from AI response text
     * @param {string} responseText - The AI's response text
     * @returns {Array} - Parsed document objects
     */
    parseDocumentList(responseText) {
        const documents = [];
        
        // Check if the response contains the document list header
        if (!responseText.includes("Available documents:")) {
            return documents;
        }
        
        // Split the response by sections
        const docSection = responseText.split("Available documents:")[1].trim();
        
        // Each document entry is separated by blank lines
        const docEntries = docSection.split(/\n\s*\n/);
        
        for (const entry of docEntries) {
            if (!entry.trim()) continue;
            
            // Parse title and URL from markdown format: **[Title](url)** or [Title](url)
            let titleMatch = entry.match(/\*\*\[(.*?)\]\((.*?)\)\*\*/);
            
            // If not found with asterisks, try without them
            if (!titleMatch) {
                titleMatch = entry.match(/\[(.*?)\]\((.*?)\)/);
            }
            
            // Parse ID from format: id: doc-id
            const idMatch = entry.match(/id:\s*([^\s\n]+)/);
            
            if (titleMatch && idMatch) {
                documents.push({
                    id: idMatch[1].trim(),
                    title: titleMatch[1].trim(),
                    url: titleMatch[2].trim()
                });
            }
        }
        
        return documents;
    }
}

// Create and export API service instance
const apiService = new ApiService(CONFIG); 