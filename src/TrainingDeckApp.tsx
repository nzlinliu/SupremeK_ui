import React, { useCallback, useEffect, useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Settings,
} from 'lucide-react';
import { ConfigModal } from './components/ConfigModal';
import { EscalationGuideView } from './components/EscalationGuideView';
import { QaBoardView } from './components/QaBoardView';
import { QuickReferenceView } from './components/QuickReferenceView';
import { SlideCanvas } from './components/SlideCanvas';
import { DEFAULT_IT_CONFIG, INITIAL_QA_ITEMS, SLIDES_DATA } from './data/slidesData';
import { ItSupportConfig, QaQuestionItem } from './types/presentation';
import { exportTrainingPptx } from './utils/exportPptx';

type ActiveTab = 'slides' | 'reference' | 'escalation' | 'qa';

const STORAGE_CONFIG_KEY = 'supreme_kitchen_it_config_v2';
const STORAGE_QA_KEY = 'supreme_kitchen_it_qa_v1';

export const TrainingDeckApp: React.FC<{ onBackToSite: () => void }> = ({ onBackToSite }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('slides');
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [sessionRunning, setSessionRunning] = useState(false);

  const [itConfig, setItConfig] = useState<ItSupportConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CONFIG_KEY);
      return saved ? { ...DEFAULT_IT_CONFIG, ...JSON.parse(saved) } : DEFAULT_IT_CONFIG;
    } catch {
      return DEFAULT_IT_CONFIG;
    }
  });

  const [qaItems, setQaItems] = useState<QaQuestionItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_QA_KEY);
      return saved ? JSON.parse(saved) : INITIAL_QA_ITEMS;
    } catch {
      return INITIAL_QA_ITEMS;
    }
  });

  const handleSaveConfig = (next: ItSupportConfig) => {
    setItConfig(next);
    try {
      localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage quota issues
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_QA_KEY, JSON.stringify(qaItems));
    } catch {
      // Ignore storage quota issues
    }
  }, [qaItems]);

  useEffect(() => {
    if (!sessionRunning) return;
    const id = window.setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [sessionRunning]);

  const goPrev = useCallback(() => {
    setCurrentSlideIdx((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrentSlideIdx((i) => Math.min(SLIDES_DATA.length - 1, i + 1));
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')
      ) {
        return;
      }

      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        return;
      }

      if (activeTab === 'slides') {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
          e.preventDefault();
          goNext();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          goPrev();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeTab, goNext, goPrev, isFullscreen]);

  const handleExportPptx = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      await exportTrainingPptx(SLIDES_DATA, itConfig);
    } finally {
      setIsExporting(false);
    }
  };

  const handleAddQa = (asker: string, category: string, question: string, itNote: string) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')} 现场记录`;
    const newItem: QaQuestionItem = {
      id: `qa-${Date.now()}`,
      asker,
      category,
      question,
      resolved: false,
      itNote,
      createdAt: timeStr,
    };
    setQaItems((prev) => [newItem, ...prev]);
  };

  const handleToggleQaResolved = (id: string) => {
    setQaItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, resolved: !item.resolved } : item))
    );
  };

  const handleUpdateQaNote = (id: string, note: string) => {
    setQaItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, itNote: note } : item))
    );
  };

  const handleDeleteQa = (id: string) => {
    setQaItems((prev) => prev.filter((item) => item.id !== id));
  };

  const currentSlide = SLIDES_DATA[currentSlideIdx];
  const elapsedMins = Math.floor(elapsedSeconds / 60);
  const elapsedSecs = elapsedSeconds % 60;
  const isQaPhaseTime = elapsedMins >= 50;

  const handleJumpBySlideNumber = (slideNum: number) => {
    const idx = SLIDES_DATA.findIndex((item) => item.slideNumber === slideNum);
    if (idx >= 0) {
      setCurrentSlideIdx(idx);
    }
  };

  if (isFullscreen) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8">
        <div className="max-w-[1360px] w-full mx-auto flex-1 flex flex-col justify-center">
          <SlideCanvas
            slide={currentSlide}
            totalSlides={SLIDES_DATA.length}
            config={itConfig}
            isFullscreen={true}
            onSelectSlideNumber={handleJumpBySlideNumber}
            onJumpToQaBoard={() => {
              setIsFullscreen(false);
              setActiveTab('qa');
            }}
          />
        </div>

        <div className="max-w-[1360px] w-full mx-auto pt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-mono tabular-nums text-slate-200">
              Slide {String(currentSlide.slideNumber).padStart(2, '0')} /{' '}
              {String(SLIDES_DATA.length).padStart(2, '0')}
            </span>
            <span aria-hidden="true">·</span>
            <span>支持键盘 ← / → 翻页，Esc 退出全屏</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={currentSlideIdx === 0}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-lg inline-flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>上一页</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={currentSlideIdx === SLIDES_DATA.length - 1}
              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white rounded-lg inline-flex items-center gap-1 cursor-pointer"
            >
              <span>下一页</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>退出全屏</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="no-print sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
          <button
            type="button"
            onClick={onBackToSite}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold tracking-tight text-slate-900 hover:text-sky-700 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回官网首页</span>
          </button>

          <nav className="flex items-center gap-5 sm:gap-7 text-xs sm:text-sm font-medium text-slate-600 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('slides')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
                activeTab === 'slides'
                  ? 'text-slate-900 font-semibold border-sky-600'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              幻灯片演示
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reference')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
                activeTab === 'reference'
                  ? 'text-slate-900 font-semibold border-sky-600'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              排障速查表
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('escalation')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
                activeTab === 'escalation'
                  ? 'text-slate-900 font-semibold border-sky-600'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              报修规范
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('qa')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
                activeTab === 'qa'
                  ? 'text-slate-900 font-semibold border-sky-600'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              答疑看板
            </button>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleExportPptx}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? '正在生成 PPTX...' : '导出 PPTX'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'slides' && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            <aside className="no-print xl:col-span-3 bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  培训目录（共 {SLIDES_DATA.length} 页）
                </span>
                <span className="text-xs font-mono text-slate-500 tabular-nums">50m + 10m Q&A</span>
              </div>

              <div className="max-h-[220px] xl:max-h-[680px] overflow-y-auto divide-y divide-slate-100">
                {SLIDES_DATA.map((s, idx) => {
                  const isActive = idx === currentSlideIdx;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCurrentSlideIdx(idx)}
                      className={`w-full text-left px-4 py-3 transition-colors flex items-start gap-3 cursor-pointer ${
                        isActive ? 'bg-sky-50/90' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className={`font-mono text-xs font-bold tabular-nums mt-0.5 shrink-0 ${
                          isActive ? 'text-sky-700' : 'text-slate-400'
                        }`}
                      >
                        {String(s.slideNumber).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-xs truncate ${
                            isActive ? 'font-bold text-slate-900' : 'font-medium text-slate-700'
                          }`}
                        >
                          {s.title}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400 font-mono tabular-nums truncate">
                          {s.sectionLabel} · {s.timeSlot}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            <section className="xl:col-span-9 space-y-4">
              <div className="no-print bg-white border border-slate-200 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={currentSlideIdx === 0}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>上一页</span>
                  </button>
                  <span className="px-2 font-mono text-xs font-semibold text-slate-700 tabular-nums whitespace-nowrap">
                    {String(currentSlide.slideNumber).padStart(2, '0')} /{' '}
                    {String(SLIDES_DATA.length).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={currentSlideIdx === SLIDES_DATA.length - 1}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 disabled:opacity-40 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>下一页</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                    <span className="text-slate-500 whitespace-nowrap">总计时:</span>
                    <span
                      className={`font-mono font-bold tabular-nums whitespace-nowrap ${
                        isQaPhaseTime ? 'text-sky-700' : 'text-slate-900'
                      }`}
                    >
                      {String(elapsedMins).padStart(2, '0')}:{String(elapsedSecs).padStart(2, '0')}{' '}
                      / 60:00
                    </span>
                    {isQaPhaseTime && (
                      <span className="text-sky-700 font-semibold whitespace-nowrap">
                        · 已进入10分钟答疑期
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setSessionRunning((r) => !r)}
                      aria-label={sessionRunning ? '暂停总计时' : '启动总计时'}
                      className="p-1 text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      {sessionRunning ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSessionRunning(false);
                        setElapsedSeconds(0);
                      }}
                      aria-label="重置总计时"
                      className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowSpeakerNotes((v) => !v)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      showSpeakerNotes
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>演讲逐字提示</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsConfigOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>自定义信息</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsFullscreen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>全屏放映</span>
                  </button>
                </div>
              </div>

              <SlideCanvas
                slide={currentSlide}
                totalSlides={SLIDES_DATA.length}
                config={itConfig}
                onSelectSlideNumber={handleJumpBySlideNumber}
                onJumpToQaBoard={() => setActiveTab('qa')}
              />

              {showSpeakerNotes && (
                <div className="no-print bg-white border border-slate-200 rounded-xl p-5 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-slate-900">
                      IT 培训师现场口播串词提示（Speaker Notes）
                    </span>
                    <span className="font-mono text-slate-500 tabular-nums">
                      本页建议用时：{currentSlide.timeSlot}
                      {currentSlide.durationMinutes > 0
                        ? `（约 ${currentSlide.durationMinutes} 分钟）`
                        : ''}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {currentSlide.speakerNotes.map((note, idx) => (
                      <p key={idx}>
                        <span className="font-mono font-semibold text-sky-700 mr-2 tabular-nums">
                          要点 0{idx + 1}:
                        </span>
                        {note}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'reference' && (
          <QuickReferenceView
            slides={SLIDES_DATA}
            onJumpToSlide={(idx) => {
              setCurrentSlideIdx(idx);
              setActiveTab('slides');
            }}
          />
        )}

        {activeTab === 'escalation' && <EscalationGuideView config={itConfig} />}

        {activeTab === 'qa' && (
          <QaBoardView
            items={qaItems}
            onAddQuestion={handleAddQa}
            onToggleResolved={handleToggleQaResolved}
            onUpdateNote={handleUpdateQaNote}
            onDeleteQuestion={handleDeleteQa}
          />
        )}
      </main>

      <ConfigModal
        isOpen={isConfigOpen}
        config={itConfig}
        onClose={() => setIsConfigOpen(false)}
        onSave={handleSaveConfig}
      />
    </div>
  );
};
