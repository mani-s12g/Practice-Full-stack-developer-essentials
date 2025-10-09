import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

function Chat({messages}) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    return(
        <>
        <div>
            {messages?.map((msg, i) =>  
            <p key={i} >{msg}</p>
            )}
        </div>
        <div ref={bottomRef} />
        </>
    )
}

function UseRef6() {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        if(text.trim()) {
            setMessages(m => [...m, text.trim()]);
            setText("");
        }
    }
    return (
    <div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder='Type Message'></textarea>
        <button onClick={sendMessage}>Send Message</button>
        <Chat messages={messages} />
    </div>
  )
}

export default UseRef6;

// Chat App (Auto-scroll to latest message)
// When new messages arrive, you want the chat window to scroll to the bottom.
// ✅ Real-world use: WhatsApp, Slack, Discord — always scroll to latest message.


// useRef in real-world apps is used for:

// DOM control (focus, scroll, video, canvas).

// Storing mutable values (timers, debounce IDs, WebSocket connections).

// Integrating with third-party libraries (Chart.js, Three.js, Leaflet).

// Improving UX (auto-focus, scroll-to-bottom, remembering previous state).