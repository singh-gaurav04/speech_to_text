import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Mic, MicOff, Copy, Check, Volume2, VolumeX } from 'lucide-react'

const App = () => {

    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const { resetTranscript } = useSpeechRecognition();

    const handleCopyText = async () => {
        try {
            await navigator.clipboard.writeText(displayText);
            setIsCopied(true);
            setDisplayText('');
            setTimeout(() => setIsCopied(false), 2000);
            resetTranscript();

        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    useEffect(() => {
        if (browserSupportsSpeechRecognition) {
            SpeechRecognition.startListening({
                continuous: true,
                language: 'en-IN',
                interimResults: true
            });
        }
    }, [browserSupportsSpeechRecognition]);

    useEffect(() => {
        if (transcript) {
            const text = transcript.toLowerCase().trim();
            const words = text.split(' ');
            
            console.log('Transcript:', transcript);
            console.log('Words:', words);
            console.log('Is transcribing:', isTranscribing);
            
            if(words.includes('hi') || words.includes('start')) {
                console.log('Starting transcribing...');
                setIsTranscribing(true);
                resetTranscript();
                
            } if(words.includes('bye') || words.includes('stop')) {
                console.log('Stopping transcribing...');
                setIsTranscribing(false);
            }
        }
    }, [transcript]);

    useEffect(() => {
        if (isTranscribing && transcript) {
            setDisplayText(transcript);
        }else{
            setDisplayText('');
        }
    }, [transcript, isTranscribing]);

    if (!browserSupportsSpeechRecognition) {
        return null
      }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-200 to-indigo-300 flex items-center justify-center p-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 w-full max-w-3xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                        <Volume2 className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                        Speech to Text
                    </h1>
                    <p className="text-gray-600 text-lg">
                        {
                            isTranscribing ? <span>Say <b>BYE</b> to stop transcribing</span> : <span>Say <b>HI</b> to start transcribing</span>
                        }
                    </p>

                    {/* Status Badge */}
                    <div className="mt-6">
                        <div className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold shadow-lg transition-all duration-300 ${isTranscribing
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-emerald-200/50'
                                : 'bg-blue-100 text-blue-800 border border-blue-200 shadow-blue-200/50'
                            }`}>
                            <div className={`w-3 h-3 rounded-full mr-3 transition-all duration-300 ${isTranscribing ? 'bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50' : 'bg-blue-500 animate-pulse shadow-lg shadow-blue-500/50'
                                }`}></div>
                            {isTranscribing ? (
                                <>
                                    <Mic className="w-4 h-4 mr-2" />
                                    Transcribing...
                                </>
                            ) : (
                                <>
                                    <Volume2 className="w-4 h-4 mr-2" />
                                    Listening for commands
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Text Display Area */}
                <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 mb-8 min-h-[250px] border border-slate-200 shadow-inner">
                    <div className="h-full flex items-center justify-center">
                        <p className={`text-center transition-all duration-300 ${displayText
                                ? 'text-gray-800 text-lg leading-relaxed'
                                : 'text-gray-400 text-lg'
                            }`}>
                            {
                                displayText || 'Your transcribed text will appear here...'
                            }
                        </p>
                    </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleCopyText}
                        disabled={!displayText}
                        className={`group relative overflow-hidden px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${isCopied
                                ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25 scale-105'
                                : displayText
                                    ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105'
                                    : 'bg-gray-300 cursor-not-allowed'
                            }`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        {isCopied ? (
                            <>
                                <Check className="w-5 h-5" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-5 h-5" />
                                Copy Text
                            </>
                        )}
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Created By Gaurav Singh
                    </p>
                </div>
            </div>
        </div>
    )
}

export default App