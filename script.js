document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const messagesContainer = document.getElementById('messages');
    const typingIndicator = document.getElementById('typingIndicator');
    const emptyState = document.querySelector('.empty-state');

    const conversation = [
        { text: "Hi there! How are you doing today?", time: "10:30 AM", received: true },
        { text: "I'm doing great! Just finished my morning coffee ☕", time: "10:32 AM", received: false },
        { text: "Nice! What type of coffee do you usually drink?", time: "10:33 AM", received: true }
    ];

    function initConversation() {
        emptyState.style.display = 'none';
        conversation.forEach(msg => {
            addMessage(msg.text, msg.time, msg.received);
        });
    }

    function addMessage(text, time, isReceived) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', isReceived ? 'received' : 'sent');
        messageDiv.innerHTML = `${text}<div class="message-time">${time}</div>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function simulateReply() {
        const replies = [
            "That sounds interesting!",
            "I see what you mean.",
            "Tell me more about that.",
            "How was your day so far?",
            "That's great to hear!",
            "We should catch up soon!"
        ];

        typingIndicator.style.display = 'flex';

        setTimeout(() => {
            typingIndicator.style.display = 'none';
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            addMessage(randomReply, timeString, true);
        }, 1500 + Math.random() * 1500);
    }

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === '') return;

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (messagesContainer.contains(emptyState)) {
            initConversation();
        }

        addMessage(messageText, timeString, false);
        messageInput.value = '';

        setTimeout(simulateReply, 800 + Math.random() * 1000);
    }

    sendButton.addEventListener('click', sendMessage);

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
