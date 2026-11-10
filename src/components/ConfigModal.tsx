import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ItSupportConfig } from '../types/presentation';

interface ConfigModalProps {
  isOpen: boolean;
  config: ItSupportConfig;
  onClose: () => void;
  onSave: (nextConfig: ItSupportConfig) => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  config,
  onClose,
  onSave,
}) => {
  const [draft, setDraft] = useState<ItSupportConfig>(config);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(draft);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-base font-bold text-slate-900">自定义主讲人与 IT 联络方式</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              修改后将同步更新所有在线幻灯片及导出的 .pptx 文件内容
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭窗口"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="space-y-1 block">
              <span className="font-semibold text-slate-700">公司名称</span>
              <input
                type="text"
                value={draft.companyName}
                onChange={(e) => setDraft({ ...draft, companyName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
              />
            </label>
            <label className="space-y-1 block">
              <span className="font-semibold text-slate-700">主讲人 / 团队名称</span>
              <input
                type="text"
                value={draft.presenterName}
                onChange={(e) => setDraft({ ...draft, presenterName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="space-y-1 block">
              <span className="font-semibold text-slate-700">IT 报修邮箱</span>
              <input
                type="text"
                value={draft.itEmail}
                onChange={(e) => setDraft({ ...draft, itEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-900 focus:outline-none focus:border-sky-600"
              />
            </label>
            <label className="space-y-1 block">
              <span className="font-semibold text-slate-700">IT 联系电话 / 分机</span>
              <input
                type="text"
                value={draft.itPhone}
                onChange={(e) => setDraft({ ...draft, itPhone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-900 focus:outline-none focus:border-sky-600"
              />
            </label>
          </div>

          <label className="space-y-1 block">
            <span className="font-semibold text-slate-700">培训部门名称</span>
            <input
              type="text"
              value={draft.departmentName}
              onChange={(e) => setDraft({ ...draft, departmentName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
            />
          </label>

          <label className="space-y-1 block">
            <span className="font-semibold text-slate-700">办公地址 (Supreme Kitchens NZ)</span>
            <input
              type="text"
              value={draft.officeAddress}
              onChange={(e) => setDraft({ ...draft, officeAddress: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="space-y-1 block">
              <span className="font-semibold text-slate-700">紧急联系说明</span>
              <input
                type="text"
                value={draft.urgentChannel}
                onChange={(e) => setDraft({ ...draft, urgentChannel: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
              />
            </label>
            <label className="space-y-1 block">
              <span className="font-semibold text-slate-700">远程协助工具要求</span>
              <input
                type="text"
                value={draft.remoteTool}
                onChange={(e) => setDraft({ ...draft, remoteTool: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600"
              />
            </label>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              保存并更新 PPT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
