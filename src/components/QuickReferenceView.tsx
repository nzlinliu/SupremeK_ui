import React, { useMemo, useState } from 'react';
import { Printer, Search } from 'lucide-react';
import { SlideDefinition } from '../types/presentation';

interface QuickReferenceViewProps {
  slides: SlideDefinition[];
  onJumpToSlide: (slideIndex: number) => void;
}

interface FlatCaseRow {
  slideNumber: number;
  slideIndex: number;
  category: string;
  symptom: string;
  cause: string;
  selfFix: string[];
  precautions: string[];
  escalateTrigger: string;
}

const CATEGORIES = [
  '全部问题',
  '卡顿与未响应',
  '闪退与 C 盘空间',
  '双屏与外设',
  '共享盘与协作',
  '打印与断网',
  '邮件与数据安全',
];

export const QuickReferenceView: React.FC<QuickReferenceViewProps> = ({
  slides,
  onJumpToSlide,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部问题');

  const allCases = useMemo<FlatCaseRow[]>(() => {
    const list: FlatCaseRow[] = [];
    slides.forEach((s, idx) => {
      if (s.cases) {
        const cleanCategory = s.sectionLabel.includes('·')
          ? s.sectionLabel.split('·')[1].trim()
          : s.sectionLabel;
        s.cases.forEach((c) => {
          list.push({
            slideNumber: s.slideNumber,
            slideIndex: idx,
            category: cleanCategory,
            symptom: c.symptom,
            cause: c.cause,
            selfFix: c.selfFix,
            precautions: c.precautions || [],
            escalateTrigger: c.escalateTrigger,
          });
        });
      }
    });
    return list;
  }, [slides]);

  const filteredCases = useMemo(() => {
    return allCases.filter((item) => {
      const matchesCat =
        activeCategory === '全部问题' || item.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCat;
      return (
        matchesCat &&
        (item.symptom.toLowerCase().includes(q) ||
          item.cause.toLowerCase().includes(q) ||
          item.selfFix.some((st) => st.toLowerCase().includes(q)) ||
          item.precautions.some((pr) => pr.toLowerCase().includes(q)) ||
          item.escalateTrigger.toLowerCase().includes(q))
      );
    });
  }, [allCases, activeCategory, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            设计部常见电脑故障解决方法与注意事项速查表
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            汇总培训全部 6 大日常问题（12 个典型场景）的解决步骤、操作注意事项与联系 IT 边界，支持直接打印。
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="no-print self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>打印纸质速查单</span>
        </button>
      </div>

      {/* Search & Segmented Filter Controls */}
      <div className="no-print flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-4 border border-slate-200 rounded-xl">
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索故障词：如 闪退、双屏、共享盘、A3..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-600"
          />
        </div>
      </div>

      {/* Results Table */}
      {filteredCases.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
          <p className="text-sm font-semibold text-slate-800">未找到匹配的排障条目</p>
          <p className="text-xs text-slate-500">
            请尝试清空搜索词或切换上方分类筛选查看全部常见设计部问题。
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('全部问题');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            重置筛选条件
          </button>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="py-3 px-4 w-28">问题分类</th>
                  <th className="py-3 px-4 w-56">故障现象与原因</th>
                  <th className="py-3 px-4">如何解决（自助步骤）</th>
                  <th className="py-3 px-4 w-64">注意事项（避坑提醒）</th>
                  <th className="py-3 px-4 w-52">何时联系 IT Support</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 align-top">
                {filteredCases.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">{row.category}</div>
                      <button
                        type="button"
                        onClick={() => onJumpToSlide(row.slideIndex)}
                        className="no-print mt-1 font-mono text-sky-700 hover:underline tabular-nums cursor-pointer"
                      >
                        跳转至 P{String(row.slideNumber).padStart(2, '0')}
                      </button>
                    </td>
                    <td className="py-4 px-4 space-y-1.5">
                      <p className="font-bold text-slate-900 leading-snug">{row.symptom}</p>
                      <p className="text-slate-500 leading-relaxed">原因：{row.cause}</p>
                    </td>
                    <td className="py-4 px-4">
                      <ol className="space-y-1.5 text-slate-700 leading-relaxed">
                        {row.selfFix.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="font-mono text-slate-400 shrink-0 tabular-nums">
                              {sIdx + 1}.
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </td>
                    <td className="py-4 px-4">
                      <ul className="space-y-1.5 text-slate-700 leading-relaxed">
                        {row.precautions.map((pre, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-1.5">
                            <span className="text-sky-700 font-bold shrink-0">•</span>
                            <span>{pre}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-4 px-4 text-amber-900 leading-relaxed">
                      {row.escalateTrigger}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
