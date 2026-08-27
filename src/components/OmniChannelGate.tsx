import React, { useState } from 'react';
import { 
  Radio, 
  MessageSquare, 
  Send, 
  Bot, 
  Mic, 
  Volume2, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Smartphone, 
  ShieldCheck, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OmniChannelGateProps {
  lang: 'ar' | 'en';
  onPlaySound?: (type: 'beep' | 'radar' | 'alarm' | 'click') => void;
}

interface ChatMessage {
  id: string;
  sender: 'FOUNDER' | 'BLACK_MATRIX';
  channel: 'TELEGRAM' | 'WHATSAPP' | 'VOICE_WEB';
  contentAr: string;
  contentEn: string;
  time: string;
  hasAudio?: boolean;
}

export const OmniChannelGate: React.FC<OmniChannelGateProps> = ({
  lang,
  onPlaySound
}) => {
  const isAr = lang === 'ar';

  const [activeChannel, setActiveChannel] = useState<'TELEGRAM' | 'WHATSAPP' | 'VOICE_WEB'>('TELEGRAM');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'FOUNDER',
      channel: 'TELEGRAM',
      contentAr: 'بلاك، لخص لي وضع جولة التمويل وعقود الـ SAFE اليوم.',
      contentEn: 'Black, summarize the status of our current funding round and SAFE notes.',
      time: '10:14 AM'
    },
    {
      id: 'm2',
      sender: 'BLACK_MATRIX',
      channel: 'TELEGRAM',
      contentAr: 'أهلاً يا صديقي. قمت بمراجعة الذاكرة المتجهية (RAG): لدينا عرضان من صندوقين. الصندوق الأول يطلب تقييم 20M مع شروط حماية التخفيف. قمت بصياغة الرد المقترح في الخزنة.',
      contentEn: 'Hello Founder. RAG retrieval complete: We have 2 term sheets. Tier-1 VC offers $20M cap with anti-dilution terms. Draft counter-proposal generated in Sovereign Vault.',
      time: '10:14 AM',
      hasAudio: true
    }
  ]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    if (onPlaySound) onPlaySound('beep');

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'FOUNDER',
      channel: activeChannel,
      contentAr: inputText,
      contentEn: inputText,
      time: 'Just Now'
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    setTimeout(() => {
      const botReply: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'BLACK_MATRIX',
        channel: activeChannel,
        contentAr: 'تم استلام طلبك ومعالجته عبر سرب الوكلاء ومطابقته مع الذاكرة المتجهية.',
        contentEn: 'Acknowledged. Processed through Agent Swarm & Vector memory graph.',
        time: 'Just Now',
        hasAudio: true
      };
      setMessages(prev => [...prev, botReply]);
      if (onPlaySound) onPlaySound('radar');
    }, 900);
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner */}
      <div className="p-4 rounded-xl cyber-panel border border-cyan-500/30 bg-black/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 cyber-glow-cyan">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-cyan-300">
                {isAr ? 'بوابة القنوات الموحدة (Omni-Channel Telegram & WhatsApp Gate)' : 'Omni-Channel Telegram & WhatsApp Gate'}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                WEBHOOKS + RAG ROUTER
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr 
                ? 'تواصل مباشر مع "بلاك" عبر تيليجرام وواتساب مع معالجة الرسائل الصوتية واسترجاع الذاكرة اللحظي'
                : 'Encrypted omni-channel bridge routing Telegram/WhatsApp voice & text to the sovereign AI agent'}
            </p>
          </div>
        </div>

        {/* Channel Selector Buttons */}
        <div className="flex items-center gap-2">
          {(['TELEGRAM', 'WHATSAPP', 'VOICE_WEB'] as const).map(ch => (
            <button
              key={ch}
              onClick={() => {
                setActiveChannel(ch);
                if (onPlaySound) onPlaySound('click');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeChannel === ch
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Stage */}
      <div className="cyber-panel rounded-2xl p-6 border border-slate-800 bg-black/80 backdrop-blur-xl space-y-4 shadow-2xl min-h-[420px] flex flex-col justify-between">
        
        {/* Messages Thread */}
        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'FOUNDER' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-4 rounded-2xl border text-xs space-y-1.5 ${
                msg.sender === 'FOUNDER'
                  ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-100 rounded-br-none'
                  : 'bg-slate-900/90 border-slate-800 text-slate-200 rounded-bl-none'
              }`}>
                <div className="flex items-center justify-between gap-4 text-[10px] text-slate-400 border-b border-slate-800/80 pb-1">
                  <span className="font-bold text-cyan-300">
                    {msg.sender === 'FOUNDER' ? (isAr ? 'المؤسس' : 'Founder') : 'BLACK MATRIX'}
                  </span>
                  <span>{msg.time} via {msg.channel}</span>
                </div>

                <p className="leading-relaxed font-sans text-[12px]">
                  {isAr ? msg.contentAr : msg.contentEn}
                </p>

                {msg.hasAudio && (
                  <div className="flex items-center gap-2 pt-1 text-[10px] text-cyan-400">
                    <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    <span>{isAr ? 'تم توليد صوت طبيعي فائق الواقعية (ElevenLabs WebRTC)' : 'Synthetic Low-Latency Voice Generated'}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="border-t border-slate-800 pt-3 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isAr ? 'اكتب رسالتك لـ "بلاك"...' : 'Message Black Matrix...'}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans"
          />

          <button
            onClick={handleSendMessage}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{isAr ? 'إرسال' : 'Send'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
