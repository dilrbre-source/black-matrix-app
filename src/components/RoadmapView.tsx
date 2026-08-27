import React, { useState } from 'react';
import { 
  CalendarClock, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  Award, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Download
} from 'lucide-react';
import { RoadmapPhase } from '../types';
import { ROADMAP_PHASES } from '../data';

interface RoadmapViewProps {
  lang: 'ar' | 'en';
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [phases, setPhases] = useState<RoadmapPhase[]>(ROADMAP_PHASES);
  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase>(ROADMAP_PHASES[1]); // Default to Phase 2 (In progress)

  const handleToggleDeliverable = (phaseNum: number, weekIdx: number) => {
    setPhases((prev) =>
      prev.map((p) => {
        if (p.phase !== phaseNum) return p;
        const updatedWeeks = [...p.weeks];
        updatedWeeks[weekIdx] = {
          ...updatedWeeks[weekIdx],
          completed: !updatedWeeks[weekIdx].completed
        };
        const completedCount = updatedWeeks.filter((w) => w.completed).length;
        const newProgress = Math.round((completedCount / updatedWeeks.length) * 100);
        return {
          ...p,
          weeks: updatedWeeks,
          progress: newProgress,
          status: newProgress === 100 ? 'completed' : newProgress > 0 ? 'in_progress' : 'upcoming'
        };
      })
    );
  };

  const totalCompletedWeeks = phases.reduce(
    (acc, p) => acc + p.weeks.filter((w) => w.completed).length,
    0
  );
  const totalWeeks = phases.reduce((acc, p) => acc + p.weeks.length, 0);
  const overallProgress = Math.round((totalCompletedWeeks / totalWeeks) * 100);

  return (
    <div className="space-y-6 font-mono">
      {/* Header Overview */}
      <div className="cyber-panel p-5 rounded-xl border border-emerald-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 cyber-glow-emerald">
              <CalendarClock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>{isAr ? 'خارطة الطريق التنفيذية (90 يوماً)' : '90-Day Strategic Execution Roadmap'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
                  {overallProgress}% COMPLETED
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {isAr
                  ? 'ثلاث مراحل استراتيجية لتأسيس النواة، المحاكاة الميدانية، واعتماد المنظومة مع كبرى المنصات والمحافظ'
                  : '3 distinct strategic phases: Core Probing, Testnet Rescue Trials, and Institutional CEX Adoption'}
              </p>
            </div>
          </div>

          <div className="w-full md:w-64 space-y-1 text-xs">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">{isAr ? 'الإنجاز الكلي للمشروع' : 'Total Completion'}</span>
              <span className="text-emerald-400 font-bold">{overallProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 to-cyan-500 transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3 Phases Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {phases.map((phase) => {
          const isSelected = selectedPhase.phase === phase.phase;
          const isDone = phase.status === 'completed';
          const isInProgress = phase.status === 'in_progress';

          return (
            <div
              key={phase.phase}
              onClick={() => setSelectedPhase(phase)}
              className={`cyber-panel p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-400 cyber-glow-emerald bg-emerald-950/20'
                  : 'border-slate-800 hover:border-emerald-500/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
                  <span className="text-slate-500 font-bold">{phase.days}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      isDone
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : isInProgress
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 animate-pulse'
                        : 'bg-slate-900 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {isDone
                      ? (isAr ? 'مكتملة' : 'COMPLETED')
                      : isInProgress
                      ? (isAr ? 'قيد التنفيذ' : 'IN PROGRESS')
                      : (isAr ? 'قادمة' : 'UPCOMING')}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-100 mb-1">
                  {isAr ? phase.titleAr : phase.title}
                </h3>
              </div>

              <div className="pt-4 mt-2">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">{isAr ? 'نسبة الإنجاز' : 'Progress'}</span>
                  <span className="text-emerald-400 font-bold">{phase.progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Phase Detail Breakdown */}
      <div className="cyber-panel p-6 rounded-xl border border-emerald-500/30 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs text-emerald-400 font-semibold">{selectedPhase.days}</span>
            <h3 className="text-base font-bold text-slate-100">
              {isAr ? selectedPhase.titleAr : selectedPhase.title}
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {selectedPhase.weeks.filter((w) => w.completed).length} / {selectedPhase.weeks.length} {isAr ? 'أسابيع منجزة' : 'Weeks Completed'}
          </span>
        </div>

        {/* Weeks Breakdown List */}
        <div className="space-y-4">
          {selectedPhase.weeks.map((week, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border transition-all ${
                week.completed
                  ? 'bg-emerald-950/20 border-emerald-500/30'
                  : 'bg-black/50 border-slate-800 hover:border-emerald-500/30'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div
                    onClick={() => handleToggleDeliverable(selectedPhase.phase, idx)}
                    className="cursor-pointer"
                  >
                    {week.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Clock className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-200">
                    {isAr ? week.weekAr : week.week}
                  </h4>
                </div>

                <button
                  onClick={() => handleToggleDeliverable(selectedPhase.phase, idx)}
                  className="px-2.5 py-1 rounded bg-black/60 border border-slate-700 text-slate-300 hover:text-emerald-400 text-xs font-mono transition-colors cursor-pointer w-fit"
                >
                  {week.completed ? (isAr ? 'مكتمل ✓' : 'Completed ✓') : (isAr ? 'تحديد كمكتمل' : 'Mark Done')}
                </button>
              </div>

              {/* 2-Column Goals & Deliverables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Goals */}
                <div className="space-y-2">
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                    {isAr ? 'الأهداف والأنشطة التشغيلية:' : 'Strategic Goals:'}
                  </span>
                  <div className="space-y-1.5">
                    {week.goals.map((goal, gIdx) => (
                      <div
                        key={gIdx}
                        className="p-2 rounded bg-black/40 border border-slate-800/80 text-slate-300 flex items-start gap-2"
                      >
                        <span className="text-emerald-400">•</span>
                        <span>{isAr ? week.goalsAr[gIdx] || goal : goal}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div className="space-y-2">
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                    {isAr ? 'المخرجات والوثائق المعتمدة:' : 'Key Deliverables:'}
                  </span>
                  <div className="space-y-1.5">
                    {week.deliverables.map((deliv, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-2 rounded bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 flex items-start gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{isAr ? week.deliverablesAr[dIdx] || deliv : deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
