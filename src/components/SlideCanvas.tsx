import React from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  PhoneCall,
  ShieldAlert,
  Wrench,
} from 'lucide-react';
import { ItSupportConfig, SlideDefinition, SlideLayoutType } from '../types/presentation';
import { ResilientImage } from './ResilientImage';

interface SlideCanvasProps {
  slide: SlideDefinition;
  totalSlides: number;
  config: ItSupportConfig;
  isFullscreen?: boolean;
  onJumpToQaBoard?: () => void;
  onSelectSlideNumber?: (slideNumber: number) => void;
}

export const SlideCanvas: React.FC<SlideCanvasProps> = ({
  slide,
  totalSlides,
  config,
  isFullscreen = false,
  onJumpToQaBoard,
  onSelectSlideNumber,
}) => {
  // SLIDE 01: COVER SLIDE (Synced with supremekitchen.co.nz #23262d & #dba14d brand identity)
  if (slide.layout === SlideLayoutType.COVER) {
    return (
      <div
        className={`w-full bg-[#23262d] text-slate-50 border border-slate-800 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch ${
          isFullscreen ? 'min-h-[82vh]' : 'min-h-[580px]'
        }`}
      >
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
              <img
                src="/supreme-kitchen-logo.png"
                alt="Supreme Kitchen — Your Kitchen Expert"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
                className="h-9 sm:h-11 w-auto object-contain"
              />
              <div className="flex items-center gap-2 text-xs text-[#dba14d] font-medium tracking-wide">
                <span>内部 IT 培训演示</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">60 MIN (50M + 10M Q&A)</span>
              </div>
            </div>

            <h1
              className="mt-7 text-3xl sm:text-4xl lg:text-[2.45rem] font-bold tracking-tight text-white leading-[1.22]"
              style={{ textWrap: 'balance' }}
            >
              {slide.title}
            </h1>

            <p className="mt-4 text-base text-slate-300 leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>

            <p className="mt-3 text-xs text-[#dba14d] tracking-wide">
              Designed with Precision, Made for Quality Living · Kitchen · Wardrobe · Vanity
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-300">
            <div className="space-y-1.5">
              <p className="text-slate-400">培训部门与办公地址</p>
              <p className="font-semibold text-white">{config.departmentName}</p>
              <p className="text-slate-300">{config.officeAddress}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-slate-400">主讲与 IT 技术支持通道</p>
              <p className="font-semibold text-white">{config.presenterName}</p>
              <p className="font-mono tabular-nums text-[#dba14d]">{config.itEmail}</p>
              <p className="font-mono tabular-nums text-slate-300">{config.itPhone}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative min-h-[280px] lg:h-full">
          <ResilientImage
            src={slide.imageUrl || ''}
            alt="Supreme Kitchen 设计部双屏 CAD 工作站"
            caption={slide.imageCaption}
          />
        </div>
      </div>
    );
  }

  // STANDARD CONTENT SLIDE SHELL
  return (
    <div
      className={`w-full bg-white border border-slate-200 rounded-xl p-6 sm:p-10 flex flex-col justify-between ${
        isFullscreen ? 'min-h-[82vh]' : 'min-h-[580px]'
      }`}
    >
      <div>
        {/* Slide Kicker Metadata Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-mono font-semibold text-sky-700 tabular-nums">
              {String(slide.slideNumber).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-slate-700">{slide.sectionLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">时间段 {slide.timeSlot}</span>
          </div>

          <div className="text-xs text-slate-400 font-mono tabular-nums">
            {config.companyName} · IT Support
          </div>
        </div>

        <div className="mt-5">
          <h2
            className="text-2xl sm:text-[1.75rem] font-bold text-slate-900 tracking-tight leading-snug"
            style={{ textWrap: 'balance' }}
          >
            {slide.title}
          </h2>
          <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{slide.subtitle}</p>
        </div>

        {/* SLIDE BODY BY LAYOUT */}
        <div className="mt-6">
          {/* SLIDE 02: WHY TRAINING (总体概况为什么要培训) */}
          {slide.layout === SlideLayoutType.WHY_TRAINING && slide.whyPoints && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {slide.whyPoints.map((pt) => (
                  <div
                    key={pt.number}
                    className="p-5 bg-slate-50/70 border border-slate-200 rounded-lg flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-mono text-sm font-bold text-sky-700 tabular-nums shrink-0">
                          {pt.number}.
                        </span>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {pt.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {pt.detail}
                      </p>
                    </div>
                    <div className="pt-2.5 border-t border-slate-200/80 text-xs font-semibold text-slate-800">
                      {pt.outcome}
                    </div>
                  </div>
                ))}
              </div>

              {slide.timeOverview && (
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-500 mb-3">
                    今日 60 分钟培训时间节奏（50 分钟实操讲解 + 最后 10 分钟答疑）
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {slide.timeOverview.map((t, idx) => {
                      const isLastQa = idx === slide.timeOverview!.length - 1;
                      return (
                        <div
                          key={t.phase}
                          className={`p-3.5 border rounded-lg text-xs space-y-1 ${
                            isLastQa
                              ? 'bg-sky-50/80 border-sky-200 text-slate-900'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-slate-900">{t.phase}</span>
                            <span className="font-mono font-bold text-sky-700 tabular-nums">
                              {t.duration}
                            </span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">{t.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SLIDE 03: BULLET POINT LIST OF DAILY ISSUES (Bullet Point 列出今天要讲的日常问题) */}
          {slide.layout === SlideLayoutType.ISSUE_BULLETS && slide.issueBullets && (
            <div className="border border-slate-200 rounded-lg divide-y divide-slate-200 bg-slate-50/40">
              {slide.issueBullets.map((item) => (
                <div
                  key={item.index}
                  className="p-4 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2.5">
                      <span className="text-sky-700 font-bold select-none mt-0.5">•</span>
                      <div>
                        <span className="font-mono text-xs font-bold text-sky-700 mr-2 tabular-nums">
                          {item.index}
                        </span>
                        <span className="text-sm font-bold text-slate-900">{item.title}</span>
                      </div>
                    </div>

                    <ul className="pl-5 space-y-1 text-xs text-slate-600 leading-relaxed list-disc list-inside">
                      {item.subPoints.map((sub, sIdx) => (
                        <li key={sIdx}>{sub}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                    <span className="font-mono text-xs text-slate-400 tabular-nums whitespace-nowrap">
                      {item.timeAllocate}
                    </span>
                    {onSelectSlideNumber && (
                      <button
                        type="button"
                        onClick={() => onSelectSlideNumber(item.targetSlideNumber)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:text-slate-900 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>看详解 P{String(item.targetSlideNumber).padStart(2, '0')}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SLIDES 04, 06, 08, 09: DUAL CASE WITH SOLUTIONS + PRECAUTIONS */}
          {slide.layout === SlideLayoutType.DUAL_CASE && slide.cases && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {slide.cases.map((c, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-slate-50/60 border border-slate-200 rounded-lg flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3.5">
                    <div>
                      <div className="text-xs font-semibold text-slate-500">
                        典型场景 0{idx + 1}
                      </div>
                      <h3 className="mt-1 text-base font-bold text-slate-900 leading-snug">
                        {c.symptom}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                        <span className="font-semibold text-slate-700">常见原因：</span>
                        {c.cause}
                      </p>
                    </div>

                    {/* 如何解决 */}
                    <div className="pt-2.5 border-t border-slate-200/80">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                        <Wrench className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>如何解决（自助步骤）</span>
                      </div>
                      <ul className="mt-2 space-y-1.5 text-xs text-slate-700 leading-relaxed">
                        {c.selfFix.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="font-mono text-slate-400 shrink-0 tabular-nums">
                              {sIdx + 1}.
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 注意事项 */}
                    {c.precautions && c.precautions.length > 0 && (
                      <div className="p-3 bg-white border border-slate-200 rounded-md space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900">
                          <AlertCircle className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span>注意事项（避坑提醒）</span>
                        </div>
                        <ul className="space-y-1 text-xs text-slate-600 leading-relaxed">
                          {c.precautions.map((pre, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2">
                              <span className="text-sky-700 font-bold shrink-0">•</span>
                              <span>{pre}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* 何时联系 IT */}
                  <div className="pt-3 border-t border-slate-200/80 text-xs">
                    <div className="flex items-start gap-1.5 text-amber-900">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                      <div>
                        <span className="font-bold">何时联系 IT Support：</span>
                        <span>{c.escalateTrigger}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SLIDES 05, 07: SPLIT TROUBLESHOOT WITH VISUAL + SOLUTIONS + PRECAUTIONS */}
          {slide.layout === SlideLayoutType.SPLIT_TROUBLESHOOT && slide.cases && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-8 space-y-4">
                {slide.cases.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50/60 border border-slate-200 rounded-lg space-y-3"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        0{idx + 1}. {c.symptom}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-500">常见原因：{c.cause}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-bold text-emerald-800">如何解决：</div>
                      <ul className="space-y-1 text-xs text-slate-700 leading-relaxed">
                        {c.selfFix.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {c.precautions && c.precautions.length > 0 && (
                      <div className="p-2.5 bg-white border border-slate-200 rounded-md space-y-1">
                        <div className="text-xs font-bold text-sky-900">注意事项：</div>
                        <ul className="space-y-1 text-xs text-slate-600 leading-relaxed">
                          {c.precautions.map((pre, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2">
                              <span className="text-sky-700 font-bold shrink-0">•</span>
                              <span>{pre}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-200/70 flex items-start gap-1.5 text-xs text-amber-900">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-bold">何时联系 IT：</strong>
                        {c.escalateTrigger}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-4 border border-slate-200 rounded-lg overflow-hidden min-h-[260px]">
                <ResilientImage
                  src={slide.imageUrl || ''}
                  alt={slide.title}
                  caption={slide.imageCaption}
                />
              </div>
            </div>
          )}

          {/* SLIDE 10: ESCALATION MATRIX */}
          {slide.layout === SlideLayoutType.ESCALATION_MATRIX && slide.escalationTiers && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
              {slide.escalationTiers.map((tier) => {
                const isSelf = tier.levelCode === 'SELF';
                const isStd = tier.levelCode === 'STANDARD';
                const surfaceClass = isSelf
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : isStd
                  ? 'bg-amber-50/40 border-amber-200'
                  : 'bg-rose-50/50 border-rose-200';
                const headingColor = isSelf
                  ? 'text-emerald-900'
                  : isStd
                  ? 'text-amber-900'
                  : 'text-rose-900';

                return (
                  <div
                    key={tier.levelCode}
                    className={`p-5 border rounded-lg flex flex-col justify-between space-y-4 ${surfaceClass}`}
                  >
                    <div className="space-y-3">
                      <div className={`flex items-center gap-1.5 text-sm font-bold ${headingColor}`}>
                        {isSelf && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        {isStd && <Clock className="w-4 h-4 text-amber-600 shrink-0" />}
                        {!isSelf && !isStd && (
                          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                        <span>{tier.label}</span>
                      </div>

                      <p className="text-xs font-mono font-semibold text-slate-600 tabular-nums">
                        响应目标：{tier.slaText}
                      </p>

                      <p className="text-xs text-slate-600 leading-relaxed">{tier.summary}</p>

                      <ul className="pt-2 border-t border-slate-200/70 space-y-2 text-xs text-slate-800 leading-relaxed">
                        {tier.scenarios.map((sc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="font-mono text-slate-400 shrink-0 tabular-nums">
                              {i + 1}.
                            </span>
                            <span>{sc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-200/80 text-xs font-semibold text-slate-900">
                      行动准则：{tier.actionRule}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SLIDE 11: TICKET PROTOCOL */}
          {slide.layout === SlideLayoutType.TICKET_PROTOCOL && slide.ticketChecklist && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slide.ticketChecklist.map((item) => (
                  <div
                    key={item.step}
                    className="p-4 bg-slate-50/70 border border-slate-200 rounded-lg space-y-2"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-sm font-bold text-sky-700 tabular-nums">
                        {item.step}.
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    </div>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      <span className="font-semibold">推荐示范：</span>
                      {item.example}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      <span className="font-semibold">避免描述：</span>
                      {item.badExample}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 sm:p-5 bg-slate-900 text-slate-100 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="text-slate-400">常规报修邮箱与电话</p>
                  <p className="mt-1 font-mono font-semibold text-sky-300">{config.itEmail}</p>
                  <p className="mt-0.5 font-mono tabular-nums text-slate-200">{config.itPhone}</p>
                </div>
                <div>
                  <p className="text-slate-400">紧急故障呼叫方式</p>
                  <p className="mt-1 font-semibold text-white flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>{config.urgentChannel}</span>
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">远程协助准备</p>
                  <p className="mt-1 font-semibold text-white">{config.remoteTool}</p>
                  <p className="mt-0.5 text-slate-400">{config.officeHours}</p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 12: TAKEAWAY CHEAT SHEET */}
          {slide.layout === SlideLayoutType.CHEAT_SHEET && slide.shortcuts && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                      <th className="py-2.5 px-3.5">Windows 自救热键</th>
                      <th className="py-2.5 px-3.5">作用</th>
                      <th className="py-2.5 px-3.5">设计部实战用途</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {slide.shortcuts.map((sc) => (
                      <tr key={sc.keys} className="hover:bg-slate-50/70">
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-sky-700 whitespace-nowrap">
                          {sc.keys}
                        </td>
                        <td className="py-2.5 px-3.5 font-semibold text-slate-900 whitespace-nowrap">
                          {sc.purpose}
                        </td>
                        <td className="py-2.5 px-3.5 text-slate-600">{sc.scenario}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:col-span-5 space-y-4">
                {slide.dailyHabits && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5">
                    <h3 className="text-sm font-bold text-slate-900">设计工作站日常保养四习惯</h3>
                    <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                      {slide.dailyHabits.map((habit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="font-mono font-semibold text-sky-700 shrink-0 tabular-nums">
                            0{idx + 1}.
                          </span>
                          <span>{habit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs space-y-1.5">
                  <p className="font-semibold text-white">{config.companyName} · IT Support 联络卡</p>
                  <p className="text-slate-300">邮箱：{config.itEmail}</p>
                  <p className="text-slate-300 tabular-nums">电话：{config.itPhone}</p>
                  <p className="text-slate-400">地址：{config.officeAddress}</p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 13: FINAL 10-MINUTE Q&A SESSION */}
          {slide.layout === SlideLayoutType.QA_SESSION && slide.qaPrompts && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slide.qaPrompts.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-slate-50/70 border border-slate-200 rounded-lg space-y-2"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-700">
                      <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>常见提问方向 0{idx + 1} · {p.topic}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 leading-snug">
                      {p.question}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-700">IT 现场支持：</span>
                      {p.quickAnswer}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-sky-50 border border-sky-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs sm:text-sm text-slate-800">
                  <span className="font-bold text-sky-900">最后 10 分钟现场答疑环节 (50:00 – 60:00)：</span>{' '}
                  可切换至答疑看板启动 10 分钟倒计时，并现场登记需要到工位处理的电脑问题。
                </div>
                {onJumpToQaBoard && (
                  <button
                    type="button"
                    onClick={onJumpToQaBoard}
                    className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    打开 10 分钟答疑看板
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Slide Footer */}
      <div className="mt-8 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
        <span>
          {config.companyName} · {config.officeAddress}
        </span>
        <span className="font-mono tabular-nums">
          IT Helpdesk: {config.itEmail} · Slide {slide.slideNumber}/{totalSlides}
        </span>
      </div>
    </div>
  );
};
