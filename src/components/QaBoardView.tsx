import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, Pause, Play, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { QaQuestionItem } from '../types/presentation';

interface QaBoardViewProps {
  items: QaQuestionItem[];
  onAddQuestion: (asker: string, category: string, question: string, itNote: string) => void;
  onToggleResolved: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
  onDeleteQuestion: (id: string) => void;
}

export const QaBoardView: React.FC<QaBoardViewProps> = ({
  items,
  onAddQuestion,
  onToggleResolved,
  onUpdateNote,
  onDeleteQuestion,
}) => {
  // Dedicated 10-minute Q&A countdown timer (600 seconds)
  const [secondsLeft, setSecondsLeft] = useState(10 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  const [asker, setAsker] = useState('');
  const [category, setCategory] = useState('显卡与渲染');
  const [question, setQuestion] = useState('');
  const [itNote, setItNote] = useState('');

  useEffect(() => {
    if (!timerRunning) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerRunning]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    onAddQuestion(
      asker.trim() || '现场提问同事',
      category,
      question.trim(),
      itNote.trim() || '已登记，现场演示或培训结束后到工位跟进处理。'
    );
    setAsker('');
    setQuestion('');
    setItNote('');
  };

  return (
    <div className="space-y-6">
      {/* Header + 10-Minute Dedicated Q&A Countdown */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-semibold text-sky-700">
            培训最后 10 分钟专属环节 · 50:00 – 60:00
          </div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 tracking-tight">
            设计部现场提问与工位问题跟进看板 (Q&A)
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            现场记录设计师提出的电脑痛点、外设更换需求与软件疑问，避免口头沟通遗漏。
          </p>
        </div>

        <div className="p-4 bg-slate-950 text-white rounded-xl flex items-center gap-5 shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>10 分钟答疑倒计时</span>
            </div>
            <div
              className={`mt-1 font-mono text-2xl font-bold tabular-nums ${
                secondsLeft <= 120 ? 'text-amber-400' : 'text-white'
              }`}
            >
              {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTimerRunning((r) => !r)}
              className="px-3.5 py-2 text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{timerRunning ? '暂停' : '开始计时'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTimerRunning(false);
                setSecondsLeft(10 * 60);
              }}
              aria-label="重置 10 分钟倒计时"
              className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Live Question Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
      >
        <h2 className="text-sm font-bold text-slate-900">登记现场新问题 / 课后工位检修需求</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
          <div className="md:col-span-3">
            <label className="block font-semibold text-slate-700 mb-1">提问人 / 工位号</label>
            <input
              type="text"
              value={asker}
              onChange={(e) => setAsker(e.target.value)}
              placeholder="例如：Jason (Design-02)"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block font-semibold text-slate-700 mb-1">问题归类</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
            >
              <option value="显卡与渲染">显卡与渲染</option>
              <option value="CAD 与 C 盘存储">CAD 与 C 盘存储</option>
              <option value="双屏与投屏">双屏与投屏</option>
              <option value="网络与共享盘">网络与共享盘</option>
              <option value="A3 打印与外设">A3 打印与外设</option>
              <option value="账号权限与安全">账号权限与安全</option>
            </select>
          </div>

          <div className="md:col-span-6">
            <label className="block font-semibold text-slate-700 mb-1">具体问题描述 *</label>
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="记录同事现场提出的问题或需要更换的配件..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-4 text-xs">
          <div className="flex-1">
            <label className="block font-semibold text-slate-700 mb-1">
              IT 解答要点或后续跟进备注（选填）
            </label>
            <input
              type="text"
              value={itNote}
              onChange={(e) => setItNote(e.target.value)}
              placeholder="例如：培训结束后去工位帮迁移微信目录到 D 盘 / 更换 DP 线"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>添加至答疑列表</span>
          </button>
        </div>
      </form>

      {/* Questions List */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-5 bg-white border rounded-xl transition-colors ${
              item.resolved ? 'border-slate-200' : 'border-sky-300'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-900">{item.asker}</span>
                <span aria-hidden="true">·</span>
                <span>{item.category}</span>
                <span aria-hidden="true">·</span>
                <span>{item.createdAt}</span>
                <span aria-hidden="true">·</span>
                <span
                  className={`font-semibold ${
                    item.resolved ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {item.resolved ? '✓ 已解答' : '待现场解答 / 跟进'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggleResolved(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    item.resolved
                      ? 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{item.resolved ? '标为待跟进' : '标记已解答'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteQuestion(item.id)}
                  aria-label="删除此条记录"
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="mt-2.5 text-sm font-bold text-slate-900 leading-snug">{item.question}</p>

            <div className="mt-3 pt-3 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                IT 现场答复与处理记录：
              </label>
              <input
                type="text"
                value={item.itNote}
                onChange={(e) => onUpdateNote(item.id, e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-700 focus:outline-none focus:border-sky-600"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
