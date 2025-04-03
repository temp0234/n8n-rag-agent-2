/**
 * Main JavaScript for n8n RAG Chat Interface
 */
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const messagesContainer = document.getElementById('messages');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const docsButton = document.getElementById('docs-button');
    const resetButton = document.getElementById('reset-button');
    const docsModal = document.getElementById('docs-modal');
    const closeModal = document.getElementById('close-modal');
    const docsList = document.getElementById('docs-list');

    // Chat state
    let sessionId = getOrCreateSessionId();
    let chatHistory = getChatHistory();
    let isWaitingForResponse = false;

    // Initialize the UI
    initializeUI();

    /**
     * Initialize the UI components and event listeners
     */
    function initializeUI() {
        // Render existing chat history if available
        if (chatHistory.length > 0) {
            chatHistory.forEach(message => {
                appendMessage(message.role, message.content);
            });
            scrollToBottom();
        }

        // Set up event listeners
        chatForm.addEventListener('submit', handleChatSubmit);
        docsButton.addEventListener('click', handleShowDocuments);
        resetButton.addEventListener('click', handleResetChat);
        closeModal.addEventListener('click', () => docsModal.classList.remove('active'));
        
        // Close modal when clicking outside content
        docsModal.addEventListener('click', (e) => {
            if (e.target === docsModal) {
                docsModal.classList.remove('active');
            }
        });

        // Focus the input field
        userInput.focus();
    }

    /**
     * Handle chat form submission
     * @param {Event} e - Form submit event
     */
    async function handleChatSubmit(e) {
        e.preventDefault();
        
        const message = userInput.value.trim();
        if (!message || isWaitingForResponse) return;
        
        // Clear input and set waiting state
        userInput.value = '';
        isWaitingForResponse = true;
        
        // Add user message to UI and history
        appendMessage('user', message);
        addToHistory('user', message);
        scrollToBottom();
        
        // Add typing indicator
        const typingIndicator = appendTypingIndicator();
        
        try {
            // Send message to n8n
            const response = await apiService.sendChatMessage(message, sessionId);
            
            // Remove typing indicator after a small delay
            setTimeout(() => {
                if (typingIndicator) {
                    typingIndicator.remove();
                }
                
                // Extract and display the assistant's response
                if (response && response.output) {
                    const assistantMessage = response.output;
                    appendMessage('assistant', assistantMessage);
                    addToHistory('assistant', assistantMessage);
                } else {
                    appendMessage('system', 'Sorry, I encountered an error processing your request.');
                }
                
                scrollToBottom();
                isWaitingForResponse = false;
            }, CONFIG.messageSettings.typingIndicatorDelay);
        } catch (error) {
            // Handle errors
            console.error('Chat error:', error);
            if (typingIndicator) {
                typingIndicator.remove();
            }
            appendMessage('system', 'Sorry, I encountered an error connecting to the service.');
            scrollToBottom();
            isWaitingForResponse = false;
        }
    }

    /**
     * Handle showing available documents
     */
    async function handleShowDocuments() {
        docsModal.classList.add('active');
        docsList.innerHTML = '<p class="loading-text">Loading documents...</p>';
        
        try {
            const documents = await apiService.fetchAvailableDocuments(sessionId);
            
            if (documents.length === 0) {
                docsList.innerHTML = `
                    <div class="empty-state">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path d="M20 2a3 3 0 0 1 3 3v2h-2v12a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3v-2h16v2a1 1 0 0 0 .883.993L18 20a1 1 0 0 0 .993-.883L19 19v-4H3V5a3 3 0 0 1 3-3h14zm0 2H6a1 1 0 0 0-.993.883L5 5v10h12V5a1 1 0 0 0-.883-.993L16 4h-3V3h7a1 1 0 0 1 .993.883L21 4v1h-1V4zm-7 3a3 3 0 0 1 3 3v3h-2V9a1 1 0 0 0-2 0v2H9V9a3 3 0 0 1 3-3zm0 1a1 1 0 0 0-1 1v1h2V9a1 1 0 0 0-1-1z" fill="currentColor"/>
                        </svg>
                        <div class="empty-state-title">No documents found</div>
                        <div class="empty-state-description">Upload documents to the system first to see them here.</div>
                    </div>
                `;
                return;
            }
            
            // Render document list
            docsList.innerHTML = '';
            documents.forEach(doc => {
                const docItem = document.createElement('div');
                docItem.className = 'doc-item';
                
                // Determine icon based on document title/extension
                const iconPath = getDocumentIcon(doc.title);
                const hasUrl = doc.url && doc.url.startsWith('http');
                
                docItem.innerHTML = `
                    <div class="doc-icon">
                        ${iconPath}
                    </div>
                    <div class="doc-info">
                        <div class="doc-title">${doc.title}</div>
                        <div class="doc-metadata">
                            <span>ID: ${doc.id}</span>
                            ${hasUrl ? `<a href="${doc.url}" target="_blank" class="doc-link">View Document</a>` : ''}
                        </div>
                    </div>
                `;
                
                // Add click handler to insert document reference in chat
                docItem.addEventListener('click', (e) => {
                    // Don't trigger if clicking on the View Document link
                    if (e.target.classList.contains('doc-link')) {
                        e.stopPropagation();
                        return;
                    }
                    
                    userInput.value = `Tell me about the document "${doc.title}"`;
                    docsModal.classList.remove('active');
                    userInput.focus();
                });
                
                docsList.appendChild(docItem);
            });
        } catch (error) {
            console.error('Error fetching documents:', error);
            docsList.innerHTML = `
                <div class="empty-state">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" fill="currentColor"/>
                    </svg>
                    <div class="empty-state-title">Error loading documents</div>
                    <div class="empty-state-description">There was a problem connecting to the service. Please try again later.</div>
                </div>
            `;
        }
    }
    
    /**
     * Get appropriate icon based on document title/extension
     * @param {string} title - Document title
     * @returns {string} - SVG icon markup
     */
    function getDocumentIcon(title) {
        const extension = title.split('.').pop().toLowerCase();
        
        // Default document icon
        let iconPath = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M3 4h18v16H3V4zm2 2v12h14V6H5zm2 2h10v2H7V8zm0 4h10v2H7v-2z" fill="currentColor"/>
        </svg>`;
        
        // Specific icons based on file type
        if (['pdf'].includes(extension)) {
            iconPath = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M12 16H8V8h4a4 4 0 1 1 0 8zm-2-6v4h2a2 2 0 1 0 0-4h-2zm10-3v10h2V7h-2zm-6 11v2h6v-2h-6z" fill="currentColor"/>
            </svg>`;
        } else if (['doc', 'docx'].includes(extension)) {
            iconPath = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M16 8v8h-2l-2-2-2 2H8V8h2v5l2-2 2 2V8h2zm-9 12v-2H5v-2H3v4h4zM3 8h2V6h2V4H3v4zm18-4v2h-2v2h2v8h-2v2h2v2h2V4h-2zm-7-2v2h4v16h-4v2h6V2h-6z" fill="currentColor"/>
            </svg>`;
        } else if (['xls', 'xlsx', 'csv'].includes(extension)) {
            iconPath = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M13.2 12l2.8 4h-2.4L12 13.714 10.4 16H8l2.8-4L8 8h2.4l1.6 2.286L13.6 8H16l-2.8 4zM3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4z" fill="currentColor"/>
            </svg>`;
        } else if (['txt', 'md'].includes(extension)) {
            iconPath = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M21 8v12.993A1 1 0 0 1 20.007 22H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.444 3.445 2 3.993 2H16l5 6zm-2 1h-5V4H5v16h14V9z" fill="currentColor"/>
            </svg>`;
        }
        
        return iconPath;
    }

    /**
     * Handle resetting the chat
     */
    function handleResetChat() {
        // Show confirmation dialog
        if (confirm('Are you sure you want to reset the chat? This will clear your conversation history.')) {
            // Generate new session ID
            sessionId = CONFIG.generateSessionId();
            localStorage.setItem(CONFIG.storageKeys.sessionId, sessionId);
            
            // Clear chat history
            chatHistory = [];
            localStorage.setItem(CONFIG.storageKeys.chatHistory, JSON.stringify(chatHistory));
            
            // Clear UI and add welcome message
            messagesContainer.innerHTML = '';
            appendMessage('system', 'Hello! I\'m your document assistant. Ask me anything about the documents in the database.');
            
            // Reset input field
            userInput.value = '';
            userInput.focus();
        }
    }

    /**
     * Append a message to the chat UI
     * @param {string} role - 'user', 'assistant', or 'system'
     * @param {string} content - Message content
     * @returns {HTMLElement} - The created message element
     */
    function appendMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Process markdown-like syntax
        const formattedContent = formatMessage(content);
        messageContent.innerHTML = formattedContent;
        
        messageDiv.appendChild(messageContent);
        messagesContainer.appendChild(messageDiv);
        
        return messageDiv;
    }

    /**
     * Format message text with markdown-like syntax
     * @param {string} text - Raw message text
     * @returns {string} - Formatted HTML
     */
    function formatMessage(text) {
        // Configure marked renderer to open links in new tabs
        const renderer = new marked.Renderer();
        renderer.link = function(href, title, text) {
            const link = marked.Renderer.prototype.link.apply(this, arguments);
            return link.replace('<a href', '<a target="_blank" rel="noopener noreferrer" href');
        };
        
        // Use marked library to parse markdown
        return marked.parse(text, {
            breaks: true,        // Enable line breaks
            gfm: true,           // Enable GitHub Flavored Markdown
            headerIds: false,    // Disable automatic header IDs
            mangle: false,       // Disable mangling email links
            sanitize: false,     // Marked handles sanitization with DOMPurify
            renderer: renderer   // Use our custom renderer
        });
    }

    /**
     * Append typing indicator to the chat
     * @returns {HTMLElement} - The typing indicator element
     */
    function appendTypingIndicator() {
        const indicatorDiv = document.createElement('div');
        indicatorDiv.className = 'message assistant';
        
        const content = document.createElement('div');
        content.className = 'message-content typing-indicator';
        content.innerHTML = '<span></span><span></span><span></span>';
        
        indicatorDiv.appendChild(content);
        messagesContainer.appendChild(indicatorDiv);
        
        scrollToBottom();
        return indicatorDiv;
    }

    /**
     * Add a message to chat history
     * @param {string} role - 'user' or 'assistant'
     * @param {string} content - Message content
     */
    function addToHistory(role, content) {
        chatHistory.push({ role, content });
        
        // Trim history if too long
        if (chatHistory.length > CONFIG.messageSettings.maxHistoryLength) {
            chatHistory = chatHistory.slice(chatHistory.length - CONFIG.messageSettings.maxHistoryLength);
        }
        
        // Save to local storage
        localStorage.setItem(CONFIG.storageKeys.chatHistory, JSON.stringify(chatHistory));
    }

    /**
     * Scroll chat container to bottom
     */
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    /**
     * Get or create a session ID
     * @returns {string} - Session ID
     */
    function getOrCreateSessionId() {
        let id = localStorage.getItem(CONFIG.storageKeys.sessionId);
        if (!id) {
            id = CONFIG.generateSessionId();
            localStorage.setItem(CONFIG.storageKeys.sessionId, id);
        }
        return id;
    }

    /**
     * Get chat history from local storage
     * @returns {Array} - Chat history
     */
    function getChatHistory() {
        const history = localStorage.getItem(CONFIG.storageKeys.chatHistory);
        return history ? JSON.parse(history) : [];
    }
}); 