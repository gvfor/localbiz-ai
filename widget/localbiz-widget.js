(function() {
    // Configuration
    const currentScript = document.currentScript || (function() {
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src.includes('localbiz-widget.js')) return scripts[i];
        }
        return null;
    })();

    if (!currentScript) {
        console.error('LocalBiz Widget: Could not find script tag.');
        return;
    }

    const config = {
        businessId: currentScript.getAttribute('data-business-id'),
        primaryColor: currentScript.getAttribute('data-primary-color') || '#0ea5e9',
        businessName: currentScript.getAttribute('data-business-name') || 'Assistant',
        apiUrl: currentScript.getAttribute('data-api-url') || 'http://localhost:8000'
    };

    if (!config.businessId) {
        console.error('LocalBiz Widget: data-business-id is required.');
        return;
    }

    // Session Management
    function getSessionId() {
        let sessionId = sessionStorage.getItem('localbiz_session_id');
        if (!sessionId) {
            sessionId = 'sess_' + Math.random().toString(36).substring(2, 15);
            sessionStorage.setItem('localbiz_session_id', sessionId);
        }
        return sessionId;
    }
    const sessionId = getSessionId();

    // Helper for HEX to RGB (for pulse animation shadow)
    function hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        if (hex.length == 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        } else if (hex.length == 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        } else {
            return "14, 165, 233"; // default primary blue
        }
        return +(r) + "," + +(g) + "," + +(b);
    }

    // Inject Styles
    const styleId = 'localbiz-widget-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            #localbiz-widget-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 999999;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            }
            #localbiz-bubble {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: ${config.primaryColor};
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                transition: transform 0.2s;
                animation: localbiz-pulse 2s infinite;
            }
            #localbiz-bubble:hover {
                transform: scale(1.05);
            }
            #localbiz-bubble svg {
                width: 30px;
                height: 30px;
                fill: currentColor;
            }
            @keyframes localbiz-pulse {
                0% { box-shadow: 0 0 0 0 rgba(${hexToRgb(config.primaryColor)}, 0.4); }
                70% { box-shadow: 0 0 0 15px rgba(${hexToRgb(config.primaryColor)}, 0); }
                100% { box-shadow: 0 0 0 0 rgba(${hexToRgb(config.primaryColor)}, 0); }
            }
            #localbiz-chat-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 350px;
                height: 500px;
                max-height: 80vh;
                background: white;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                transform-origin: bottom right;
                transform: scale(0);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
                pointer-events: none;
            }
            #localbiz-chat-window.localbiz-open {
                transform: scale(1);
                opacity: 1;
                pointer-events: auto;
            }
            @media (max-width: 480px) {
                #localbiz-widget-container { bottom: 10px; right: 10px; }
                #localbiz-chat-window { width: calc(100vw - 20px); height: calc(100vh - 100px); }
            }
            #localbiz-header {
                background: ${config.primaryColor};
                color: white;
                padding: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: 600;
                font-size: 16px;
            }
            #localbiz-close {
                cursor: pointer;
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                padding: 0;
                line-height: 1;
            }
            #localbiz-messages {
                flex: 1;
                overflow-y: auto;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                background: #f9f9f9;
            }
            .localbiz-message {
                max-width: 80%;
                padding: 10px 14px;
                border-radius: 16px;
                font-size: 14px;
                line-height: 1.4;
                word-wrap: break-word;
            }
            .localbiz-user {
                background: ${config.primaryColor};
                color: white;
                align-self: flex-end;
                border-bottom-right-radius: 4px;
            }
            .localbiz-assistant {
                background: #e5e5ea;
                color: #333;
                align-self: flex-start;
                border-bottom-left-radius: 4px;
            }
            #localbiz-input-area {
                padding: 12px;
                background: white;
                border-top: 1px solid #eee;
                display: flex;
                gap: 8px;
            }
            #localbiz-input {
                flex: 1;
                padding: 10px 12px;
                border: 1px solid #ddd;
                border-radius: 20px;
                outline: none;
                font-size: 14px;
            }
            #localbiz-input:focus {
                border-color: ${config.primaryColor};
            }
            #localbiz-send {
                background: ${config.primaryColor};
                color: white;
                border: none;
                border-radius: 20px;
                padding: 0 16px;
                cursor: pointer;
                font-weight: 600;
                transition: opacity 0.2s;
            }
            #localbiz-send:hover { opacity: 0.9; }
            #localbiz-send:disabled { background: #ccc; cursor: not-allowed; }
            
            /* Loading Indicator */
            .localbiz-typing {
                align-self: flex-start;
                background: #e5e5ea;
                padding: 12px 16px;
                border-radius: 16px;
                display: none;
            }
            .localbiz-typing span {
                display: inline-block;
                width: 6px;
                height: 6px;
                background-color: #888;
                border-radius: 50%;
                margin: 0 2px;
                animation: localbiz-bounce 1.4s infinite ease-in-out both;
            }
            .localbiz-typing span:nth-child(1) { animation-delay: -0.32s; }
            .localbiz-typing span:nth-child(2) { animation-delay: -0.16s; }
            @keyframes localbiz-bounce {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
            }
            
            /* Lead Form */
            .localbiz-lead-form {
                background: white;
                border: 1px solid #eee;
                border-radius: 12px;
                padding: 16px;
                margin-top: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                align-self: flex-start;
                width: 90%;
            }
            .localbiz-lead-form h4 {
                margin: 0 0 12px 0;
                font-size: 14px;
                color: #333;
            }
            .localbiz-input-group {
                margin-bottom: 10px;
            }
            .localbiz-lead-form input {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 6px;
                box-sizing: border-box;
                font-size: 13px;
            }
            .localbiz-lead-btn {
                width: 100%;
                padding: 10px;
                background: ${config.primaryColor};
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                font-size: 14px;
            }
            .localbiz-lead-btn:disabled { background: #ccc; }
        `;
        document.head.appendChild(style);
    }

    // Inject HTML
    const container = document.createElement('div');
    container.id = 'localbiz-widget-container';
    container.innerHTML = `
        <div id="localbiz-chat-window">
            <div id="localbiz-header">
                <span>${config.businessName} AI Assistant</span>
                <button id="localbiz-close">&times;</button>
            </div>
            <div id="localbiz-messages">
                <div class="localbiz-message localbiz-assistant">Hi! How can I help you today?</div>
                <div class="localbiz-typing" id="localbiz-typing">
                    <span></span><span></span><span></span>
                </div>
            </div>
            <div id="localbiz-input-area">
                <input type="text" id="localbiz-input" placeholder="Type your message..." autocomplete="off" />
                <button id="localbiz-send">Send</button>
            </div>
        </div>
        <div id="localbiz-bubble">
            <svg viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
        </div>
    `;
    document.body.appendChild(container);

    // Elements
    const bubble = document.getElementById('localbiz-bubble');
    const chatWindow = document.getElementById('localbiz-chat-window');
    const closeBtn = document.getElementById('localbiz-close');
    const messagesContainer = document.getElementById('localbiz-messages');
    const inputField = document.getElementById('localbiz-input');
    const sendBtn = document.getElementById('localbiz-send');
    const typingIndicator = document.getElementById('localbiz-typing');

    let currentLeadQuery = "";

    // Toggle Chat
    function toggleChat() {
        chatWindow.classList.toggle('localbiz-open');
        if (chatWindow.classList.contains('localbiz-open')) {
            inputField.focus();
        }
    }
    bubble.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `localbiz-message localbiz-${sender}`;
        msgDiv.textContent = text;
        messagesContainer.insertBefore(msgDiv, typingIndicator);
        scrollToBottom();
    }

    function showLeadForm() {
        const formHtml = `
            <div class="localbiz-lead-form">
                <h4>Please share your details</h4>
                <div class="localbiz-input-group">
                    <input type="text" id="localbiz-lead-name" placeholder="Your Name" required>
                </div>
                <div class="localbiz-input-group">
                    <input type="tel" id="localbiz-lead-phone" placeholder="Your Phone Number" required>
                </div>
                <button class="localbiz-lead-btn" id="localbiz-submit-lead">Submit</button>
            </div>
        `;
        const wrap = document.createElement('div');
        wrap.innerHTML = formHtml;
        messagesContainer.insertBefore(wrap, typingIndicator);
        scrollToBottom();

        document.getElementById('localbiz-submit-lead').addEventListener('click', function() {
            const name = document.getElementById('localbiz-lead-name').value;
            const phone = document.getElementById('localbiz-lead-phone').value;
            if (!name || !phone) {
                alert("Please fill in both fields");
                return;
            }
            this.disabled = true;
            this.textContent = "Submitting...";
            submitLead(name, phone, wrap);
        });
    }

    // API Calls
    async function sendMessage(text) {
        currentLeadQuery = text;
        addMessage(text, 'user');
        inputField.value = '';
        sendBtn.disabled = true;
        typingIndicator.style.display = 'flex';
        scrollToBottom();

        try {
            const res = await fetch(`${config.apiUrl}/api/chat/message/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    business_id: config.businessId,
                    session_id: sessionId,
                    message: text,
                    source: 'website'
                })
            });
            const data = await res.json();
            
            typingIndicator.style.display = 'none';
            sendBtn.disabled = false;
            
            if (data.response) {
                addMessage(data.response, 'assistant');
            }
            if (data.needs_lead_capture) {
                showLeadForm();
            }
        } catch (err) {
            typingIndicator.style.display = 'none';
            sendBtn.disabled = false;
            addMessage("Sorry, I'm having trouble connecting right now.", 'assistant');
            console.error(err);
        }
    }

    async function submitLead(name, phone, formWrap) {
        try {
            await fetch(`${config.apiUrl}/api/chat/capture-lead/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    business_id: config.businessId,
                    session_id: sessionId,
                    name: name,
                    phone: phone,
                    query: currentLeadQuery,
                    source: 'website'
                })
            });
            formWrap.innerHTML = '<div class="localbiz-message localbiz-assistant">Thank you! Our team will contact you soon.</div>';
            scrollToBottom();
        } catch (err) {
            const btn = document.getElementById('localbiz-submit-lead');
            btn.disabled = false;
            btn.textContent = "Submit";
            alert("Error submitting details. Please try again.");
            console.error(err);
        }
    }

    // Input Events
    sendBtn.addEventListener('click', () => {
        const text = inputField.value.trim();
        if (text) sendMessage(text);
    });

    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = inputField.value.trim();
            if (text) sendMessage(text);
        }
    });

})();
