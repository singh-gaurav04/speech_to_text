import React, { useEffect, useState, useCallback, useMemo } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

// Constants
const WAKE_WORD = "hi";
const SLEEP_WORD = "bye";
const SPEECH_CONFIG = {
    continuous: true,
    language: "en-IN",
};

// Utility functions
const cleanTranscriptText = (text, wakeWord, sleepWord) => {
    let cleanText = text.toLowerCase().trim();
    
    // Remove wake word from beginning
    if (cleanText.startsWith(wakeWord)) {
        cleanText = cleanText.replace(new RegExp(`^${wakeWord}\\s*`), "").trim();
    }
    
    // Remove sleep word from end
    if (cleanText.endsWith(sleepWord)) {
        cleanText = cleanText.replace(new RegExp(`\\s*${sleepWord}$`), "").trim();
    }
    
    return cleanText;
};

const WakeWordSpeech = () => {
    const [isActive, setIsActive] = useState(false);
    const [transcriptText, setTranscriptText] = useState("");

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    // Memoized speech config to prevent unnecessary re-renders
    const speechConfig = useMemo(() => SPEECH_CONFIG, []);

    // Optimized handlers with useCallback
    const handleStartListening = useCallback(() => {
        SpeechRecognition.startListening(speechConfig);
    }, [speechConfig]);

    const handleStopListening = useCallback(() => {
        SpeechRecognition.stopListening();
        setIsActive(false);
    }, []);

    const handleClearTranscript = useCallback(() => {
        resetTranscript();
        setTranscriptText("");
    }, [resetTranscript]);

    // Start listening continuously when component mounts
    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            alert("Your browser does not support Speech Recognition.");
            return;
        }

        SpeechRecognition.startListening(speechConfig);
    }, [browserSupportsSpeechRecognition, speechConfig]);

    // Optimized speech processing with early returns and memoization
    useEffect(() => {
        if (!transcript) return;

        const spoken = transcript.toLowerCase().trim();
        console.log("spoken");

        // Wake word detection
        if (!isActive && spoken.includes(WAKE_WORD)) {
            setIsActive(true);
            setTranscriptText("");
            resetTranscript();
            console.log("🟢 Wake word detected — transcription started");
            return;
        }

        // Sleep word detection
        if (isActive && spoken.includes(SLEEP_WORD)) {
            setIsActive(false);
            console.log("🔴 Sleep word detected — transcription stopped");
            setTranscriptText("");
            resetTranscript();
            return;
        }

        // Real-time transcription processing
        if (isActive && spoken.length > 0) {
            const cleanText = cleanTranscriptText(spoken, WAKE_WORD, SLEEP_WORD);
            
            if (cleanText.length > 0) {
                setTranscriptText(cleanText);
            }
        }
    }, [transcript, isActive, resetTranscript]);

    // Memoized status values to prevent unnecessary re-renders
    const microphoneStatus = useMemo(() => ({
        isListening: listening,
        text: listening ? "🎙 Listening" : "⏹ Stopped",
        color: listening ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
    }), [listening]);

    const transcriptionStatus = useMemo(() => ({
        isActive,
        text: isActive ? "Transcribing" : "Waiting for 'Hi'...",
        color: isActive ? 'bg-blue-500 animate-pulse' : 'bg-orange-400'
    }), [isActive]);

    // Memoized transcription content
    const transcriptionContent = useMemo(() => {
        if (!isActive) {
            return <p className="text-gray-500 text-lg">Say 'Hi' to start transcription</p>;
        }
        
        if (transcriptText) {
            return <p className="text-gray-800 text-lg leading-relaxed">{transcriptText}</p>;
        }
        
        return (
            <div className="flex items-center space-x-2 text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span>Listening...</span>
            </div>
        );
    }, [isActive, transcriptText]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-300 to-blue-400 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Header Section */}
                <div className="text-center mb-8 ">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-900 rounded-full mb-4 shadow-lg">
                        <span className="text-2xl">🎤</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Speech to Text</h1>
                    <p className="text-gray-600 text-md">Say <b>Hi</b> to start, <b>Bye</b> to stop</p>
                </div>

                {/* Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 ">
                    <StatusCard
                        title="Microphone"
                        status={microphoneStatus.text}
                        indicatorColor={microphoneStatus.color}
                    />
                    <StatusCard
                        title="Status"
                        status={transcriptionStatus.text}
                        indicatorColor={transcriptionStatus.color}
                    />
                </div>

                {/* Transcription Display */}
                <div className=" rounded-xl p-6 shadow-sm border border-gray-200 mb-6 bg-white">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Transcription</h3>
                    <div className="min-h-[120px] p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center ">
                        <div className="text-center text-sm text-blue-300">
                            {transcriptionContent}
                        </div>
                    </div>
                </div>

                {/* Control Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <ControlButton
                        onClick={handleStartListening}
                        variant="green"
                        icon="▶️"
                        text="Start Listening"
                    />
                    <ControlButton
                        onClick={handleStopListening}
                        variant="red"
                        icon="⏹️"
                        text="Stop Listening"
                    />
                    <ControlButton
                        onClick={handleClearTranscript}
                        variant="gray"
                        icon="🗑️"
                        text="Clear"
                    />
                </div>

                {/* Instructions */}
                <Instructions />
            </div>
        </div>
    );
};

// Extracted reusable components for better performance and maintainability
const StatusCard = React.memo(({ title, status, indicatorColor }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${indicatorColor}`}></div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-lg font-semibold text-gray-800">{status}</p>
            </div>
        </div>
    </div>
));

const ControlButton = React.memo(({ onClick, variant, icon, text }) => {
    const variantClasses = {
        green: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
        red: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
        gray: "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
    };

    return (
        <button
            onClick={onClick}
            className={`flex-1 ${variantClasses[variant]} text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
        >
            <span className="flex items-center justify-center space-x-2">
                <span>{icon}</span>
                <span>{text}</span>
            </span>
        </button>
    );
});

const Instructions = React.memo(() => (
    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-semibold text-blue-800 mb-2">How to use:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
            <li>• Say <strong>Hi</strong> to activate transcription</li>
            <li>• Speak naturally while active</li>
            <li>• Say <strong>Bye</strong> to stop transcription</li>
        </ul>
    </div>
));

export default WakeWordSpeech;