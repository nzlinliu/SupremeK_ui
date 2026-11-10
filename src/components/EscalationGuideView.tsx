import React, { useState } from 'react';
import { Check, Copy, PhoneCall, ShieldAlert, Wrench } from 'lucide-react';
import { ItSupportConfig } from '../types/presentation';

interface EscalationGuideViewProps {
  config: ItSupportConfig;
}

interface DecisionQuizOption {
  id: string;
  label: string;
  verdict: 'SELF' | 'STANDARD' | 'URGENT';
  advice: string;
}

const DECISION_SCENARIOS: DecisionQuizOption[] = [
  {
    id: 'sc-1',
    label: 'SketchUp / CAD 正在导大图显示“未响应”刚满 1 分钟',
    verdict: 'SELF',
    advice:
      '【建议先自检观察】按 Ctrl + Shift + Esc 看任务管理器，若 CPU / 内存数值仍在跳动说明正在后台计算，请等待 2–3 分钟切勿强杀！',
  },
  {
    id: 'sc-2',
    label: '挪了机箱后第二块屏幕黑屏提示 No Signal',
    verdict: 'SELF',
    advice:
      '【3 分钟自检】优先检查机箱背面显示器线是否误插在竖排主板接口上（应插在下方横排独立显卡口），并按 Win + P 确认处于“扩展”模式。若换口仍不亮再报修 IT。',
  },
  {
    id: 'sc-3',
    label: '新项目需要安装字体包、更新渲染插件或软件弹框索要管理员密码',
    verdict: 'STANDARD',
    advice:
      '【提交常规 IT 工单】涉及 Windows 管理员权限与正版授权合规，切勿网上自行找破解版！发邮件/消息给 IT，我们远程 5 分钟即可为您安全部署。',
  },
  {
    id: 'sc-4',
    label: '全设计部同事都打不开 Z: 共享盘，或下午见客户的唯一工程文件损坏报错',
    verdict: 'URGENT',
    advice:
      '【立即直联 IT Support！】属于生产阻断级故障，请直接拨打 IT 电话或当面联系，IT 可立即排查核心交换机或调取 NAS 服务器历史快照恢复。',
  },
  {
    id: 'sc-5',
    label: '不小心双击了可疑报价单附件，或者水洒进了键盘/主机冒异味',
    verdict: 'URGENT',
    advice:
      '【最高红线 · 1秒停手直呼 IT！】疑似中毒请第一秒拔掉网线并关 Wi-Fi；进水或焦味请直接拔掉电源插头切勿尝试重启，原地电话呼叫 IT！',
  },
];

export const EscalationGuideView: React.FC<EscalationGuideViewProps> = ({ config }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('sc-1');
  const [workstation, setWorkstation] = useState('Design-03');
  const [urgency, setUrgency] = useState('常规（今日内处理即可）');
  const [softwareAndFile, setSoftwareAndFile] = useState(
    'AutoCAD 2026 打开 Z:\\Projects\\Epsom_Joinery.dwg 时弹 License 错误'
  );
  const [triedSteps, setTriedSteps] = useState('已保存其他文件并重启过一次电脑，故障依旧');
  const [remoteId, setRemoteId] = useState('AnyDesk: 819 402 551');
  const [copied, setCopied] = useState(false);

  const activeScenario =
    DECISION_SCENARIOS.find((s) => s.id === selectedScenarioId) || DECISION_SCENARIOS[0];

  const generatedTicketText = [
    `【Supreme Kitchens 设计部 IT 报修单】`,
    `• 工位 / 姓名：${workstation}`,
    `• 紧急程度：${urgency}`,
    `• 故障现象与文件路径：${softwareAndFile}`,
    `• 已尝试自检步骤：${triedSteps}`,
    `• 远程协助 ID：${remoteId}`,
    `（已按 Win + Shift + S 附报错截图）`,
  ].join('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedTicketText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          IT 升级判断助手与标准报修模板生成器
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          培训现场互动演示工具：快速判断“自己修 vs 找 IT”，并一键生成要素齐全的标准报修消息。
        </p>
      </div>

      {/* Interactive Scenario Selector */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            01. 互动场景快测：遇到以下情况该怎么处理？
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            点击任意常见情景，查看推荐响应等级与操作指引
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {DECISION_SCENARIOS.map((item) => {
            const active = item.id === selectedScenarioId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedScenarioId(item.id)}
                className={`p-3.5 text-left rounded-lg border text-xs leading-relaxed transition-colors cursor-pointer ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                    : 'bg-slate-50/70 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div
          className={`p-4 rounded-lg border text-xs sm:text-sm leading-relaxed flex items-start gap-3 ${
            activeScenario.verdict === 'SELF'
              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
              : activeScenario.verdict === 'STANDARD'
              ? 'bg-amber-50/60 border-amber-200 text-amber-950'
              : 'bg-rose-50/70 border-rose-200 text-rose-950'
          }`}
        >
          {activeScenario.verdict === 'SELF' && (
            <Wrench className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          )}
          {activeScenario.verdict === 'STANDARD' && (
            <PhoneCall className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          )}
          {activeScenario.verdict === 'URGENT' && (
            <ShieldAlert className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
          )}
          <div>{activeScenario.advice}</div>
        </div>
      </section>

      {/* Ticket Generator */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              02. 标准报修消息生成器（四要素示范）
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              设计师报修时填写以下 4 项关键上下文，可直接复制发送到 {config.itEmail} 或内部工作群
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <label className="space-y-1.5 block">
              <span className="font-semibold text-slate-700">工位号 / 姓名</span>
              <input
                type="text"
                value={workstation}
                onChange={(e) => setWorkstation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
              />
            </label>

            <label className="space-y-1.5 block">
              <span className="font-semibold text-slate-700">影响程度与客户截止时间</span>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
              >
                <option value="常规（今日内处理即可）">常规（今日内处理即可）</option>
                <option value="较急（2小时后需给展厅客户看图）">较急（2小时后需给展厅客户看图）</option>
                <option value="紧急阻断（车间等拆单文件 / 全组断连）">
                  紧急阻断（车间等拆单文件 / 全组断连）
                </option>
              </select>
            </label>
          </div>

          <label className="space-y-1.5 block text-xs">
            <span className="font-semibold text-slate-700">具体软件、操作步骤与报错现象</span>
            <input
              type="text"
              value={softwareAndFile}
              onChange={(e) => setSoftwareAndFile(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <label className="space-y-1.5 block">
              <span className="font-semibold text-slate-700">已做过的自检动作</span>
              <input
                type="text"
                value={triedSteps}
                onChange={(e) => setTriedSteps(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
              />
            </label>

            <label className="space-y-1.5 block">
              <span className="font-semibold text-slate-700">远程协助 ID</span>
              <input
                type="text"
                value={remoteId}
                onChange={(e) => setRemoteId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-900 focus:outline-none focus:border-sky-600"
              />
            </label>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-900 text-slate-100 rounded-xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="text-xs font-semibold text-sky-400">实时生成的规范报修文本预览</div>
            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 whitespace-pre-wrap font-mono leading-relaxed">
              {generatedTicketText}
            </pre>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="text-xs text-slate-400 space-y-1">
              <p>收件邮箱：{config.itEmail}</p>
              <p className="tabular-nums">联系电话：{config.itPhone}</p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '已复制到剪贴板！' : '一键复制标准报修内容'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
