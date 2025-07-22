// NASS AI Chat Assistant
// Version 1.2.0

document.addEventListener('DOMContentLoaded', () => {
    const chatWidget = document.getElementById('ai-chat-widget');
    const openButton = document.getElementById('ai-chat-open');
    const closeButton = document.getElementById('ai-chat-close');
    const sendButton = document.getElementById('ai-chat-send');
    const chatInput = document.getElementById('ai-chat-input');
    const messagesContainer = document.getElementById('ai-chat-messages');

    // --- Knowledge Base ---
    const knowledgeBase = {
        "admission process": "To apply for admission, you need to purchase an application form, fill it out, and submit it with your academic transcripts and two passport-sized photos. After submission, you will be scheduled for an entrance exam and an interview.",
        "admission requirements": "Applicants are required to have a pass in at least six subjects, including English and Mathematics, in the Basic Education Certificate Examination (BECE).",
        "programs": "We offer a variety of programs including Science, General Arts, Business, Visual Arts, and Home Economics. Each program is designed to provide students with a comprehensive education.",
        "facilities": "Our school is equipped with modern facilities including a science lab, a library, a computer lab, and sports facilities to support student learning and development.",
        "history": "NEW ABIREM/AFOSU SENIOR HIGH was founded in 2013 with the mission to provide quality education and foster moral values in students. The school has since grown to become a center of excellence in the region.",
        "values": "Our core values are Unity and Service. We believe in fostering a sense of community and encouraging our students to contribute positively to society.",
        "contact": "You can contact us via phone at +233 XX XXX XXXX or email at info@nafshts.edu.gh. Our office is located in New Abirem, Ghana.",
        "anthem": "Our school anthem is a song of pride and unity. It reflects our values and our commitment to excellence. You can find the full lyrics on the anthem page of our website.",
        "location": "The school is located in New Abirem/Afosu.",
        "default": "I'm sorry, I don't have information on that topic right now. Please try asking another question or contact the school administration for more details."
    };

    // --- Event Listeners ---
    openButton.addEventListener('click', () => toggleChat(true));
    closeButton.addEventListener('click', () => toggleChat(false));
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // --- Functions ---
    function toggleChat(open) {
        if (open) {
            chatWidget.style.display = 'flex';
            if (messagesContainer.children.length === 0) {
                addMessage("Welcome to the NASS AI Assistant! How can I help you today?", 'ai');
            }
        } else {
            chatWidget.style.display = 'none';
        }
    }

    function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            chatInput.value = '';
            setTimeout(() => {
                getAIResponse(userMessage);
            }, 500);
        }
    }

    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function getAIResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        let response = knowledgeBase.default;

        // More specific matching first
        for (const key in knowledgeBase) {
            if (lowerCaseMessage.includes(key)) {
                response = knowledgeBase[key];
                break;
            }
        }
        addMessage(response, 'ai');
    }

    console.log("NASS AI Assistant Initialized.");
});
