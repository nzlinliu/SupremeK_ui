import PptxGenJS from 'pptxgenjs';
import { ItSupportConfig, SlideDefinition, SlideLayoutType } from '../types/presentation';

export async function exportTrainingPptx(
  slides: SlideDefinition[],
  config: ItSupportConfig
): Promise<void> {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = `${config.companyName} - ${config.presenterName}`;
  pptx.company = config.companyName;
  pptx.subject = '设计部日常电脑使用问题排障与 IT 支持培训 (50m讲解 + 10m答疑)';
  pptx.title = `${config.companyName} — 设计部 IT 培训演示文稿`;

  const C_DARK = '0F172A';
  const C_SLATE = '334155';
  const C_MUTED = '64748B';
  const C_BG = 'F8FAFC';
  const C_WHITE = 'FFFFFF';
  const C_BORDER = 'CBD5E1';
  const C_BLUE = '0284C7';
  const C_GREEN = '059669';
  const C_AMBER = 'D97706';
  const C_RED = 'DC2626';

  for (const s of slides) {
    const slide = pptx.addSlide();
    slide.background = { color: s.layout === SlideLayoutType.COVER ? '23262D' : C_BG };

    if (s.speakerNotes && s.speakerNotes.length > 0) {
      slide.addNotes(
        `【时间节点：${s.timeSlot}】\n\n` +
          s.speakerNotes.map((n, i) => `${i + 1}. ${n}`).join('\n\n')
      );
    }

    if (s.layout === SlideLayoutType.COVER) {
      slide.addText(
        `${config.companyName.toUpperCase()}  ·  YOUR KITCHEN EXPERT  ·  IT TRAINING`,
        {
          x: 0.7,
          y: 0.85,
          w: 8.6,
          h: 0.35,
          fontSize: 11,
          bold: true,
          color: 'DBA14D',
          fontFace: 'Microsoft YaHei',
        }
      );

      slide.addText(s.title, {
        x: 0.7,
        y: 1.4,
        w: 8.5,
        h: 1.3,
        fontSize: 30,
        bold: true,
        color: C_WHITE,
        fontFace: 'Microsoft YaHei',
      });

      slide.addText(s.subtitle, {
        x: 0.7,
        y: 2.75,
        w: 8.4,
        h: 0.8,
        fontSize: 13.5,
        color: 'CBD5E1',
        fontFace: 'Microsoft YaHei',
      });

      const metaText = [
        `培训对象：${config.departmentName}`,
        `主讲团队：${config.presenterName}  |  联系邮箱：${config.itEmail}`,
        `办公地点：${config.officeAddress}  |  服务时间：${config.officeHours}`,
        `时长安排：总计 60 分钟（前 50 分钟问题拆解与注意事项 + 最后 10 分钟现场答疑 Q&A）`,
      ].join('\n');

      slide.addShape(pptx.ShapeType.rect, {
        x: 0.7,
        y: 3.85,
        w: 8.6,
        h: 1.3,
        fill: { color: '1E293B' },
        line: { color: '334155', pt: 1 },
      });

      slide.addText(metaText, {
        x: 0.9,
        y: 3.95,
        w: 8.2,
        h: 1.1,
        fontSize: 11,
        color: 'E2E8F0',
        lineSpacingMultiple: 1.3,
        fontFace: 'Microsoft YaHei',
      });
      continue;
    }

    // Header metadata bar for content slides
    slide.addText(
      `SLIDE ${String(s.slideNumber).padStart(2, '0')}  ·  ${s.sectionLabel}  ·  ${s.timeSlot}`,
      {
        x: 0.55,
        y: 0.28,
        w: 8.9,
        h: 0.24,
        fontSize: 9.5,
        bold: true,
        color: C_BLUE,
        fontFace: 'Microsoft YaHei',
      }
    );

    slide.addText(s.title, {
      x: 0.55,
      y: 0.52,
      w: 8.9,
      h: 0.44,
      fontSize: 19,
      bold: true,
      color: C_DARK,
      fontFace: 'Microsoft YaHei',
    });

    slide.addText(s.subtitle, {
      x: 0.55,
      y: 0.95,
      w: 8.9,
      h: 0.3,
      fontSize: 10.5,
      color: C_MUTED,
      fontFace: 'Microsoft YaHei',
    });

    // SLIDE 02: WHY TRAINING
    if (s.layout === SlideLayoutType.WHY_TRAINING && s.whyPoints) {
      s.whyPoints.forEach((pt, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const boxX = 0.55 + col * 4.55;
        const boxY = 1.38 + row * 1.48;

        slide.addShape(pptx.ShapeType.rect, {
          x: boxX,
          y: boxY,
          w: 4.35,
          h: 1.35,
          fill: { color: C_WHITE },
          line: { color: C_BORDER, pt: 0.75 },
        });

        slide.addText(`${pt.number}. ${pt.title}\n${pt.detail}\n→ ${pt.outcome}`, {
          x: boxX + 0.14,
          y: boxY + 0.08,
          w: 4.08,
          h: 1.2,
          fontSize: 8.8,
          color: C_SLATE,
          valign: 'top',
          lineSpacingMultiple: 1.15,
          fontFace: 'Microsoft YaHei',
        });
      });

      if (s.timeOverview) {
        const scheduleStr = s.timeOverview
          .map((t) => `${t.phase} [${t.duration}]：${t.desc}`)
          .join('   |   ');
        slide.addShape(pptx.ShapeType.rect, {
          x: 0.55,
          y: 4.45,
          w: 8.9,
          h: 0.7,
          fill: { color: 'EFF6FF' },
          line: { color: 'BAE6FD', pt: 0.75 },
        });
        slide.addText(`时间规划：${scheduleStr}`, {
          x: 0.68,
          y: 4.51,
          w: 8.65,
          h: 0.58,
          fontSize: 8.5,
          color: C_DARK,
          fontFace: 'Microsoft YaHei',
        });
      }
    }
    // SLIDE 03: BULLET POINT LIST OF TODAY'S DAILY ISSUES
    else if (s.layout === SlideLayoutType.ISSUE_BULLETS && s.issueBullets) {
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.55,
        y: 1.35,
        w: 8.9,
        h: 3.82,
        fill: { color: C_WHITE },
        line: { color: C_BORDER, pt: 0.75 },
      });

      const bulletTextItems: PptxGenJS.TextProps[] = [];
      s.issueBullets.forEach((b) => {
        bulletTextItems.push({
          text: `${b.index}｜${b.title}  (${b.timeAllocate})`,
          options: {
            bullet: true,
            bold: true,
            fontSize: 9.8,
            color: C_DARK,
            breakLine: true,
            paraSpaceBefore: 4,
          },
        });
        b.subPoints.forEach((sp) => {
          bulletTextItems.push({
            text: `   - ${sp}`,
            options: {
              fontSize: 8.5,
              color: C_MUTED,
              breakLine: true,
            },
          });
        });
      });

      slide.addText(bulletTextItems, {
        x: 0.72,
        y: 1.42,
        w: 8.55,
        h: 3.68,
        valign: 'top',
        lineSpacingMultiple: 1.08,
        fontFace: 'Microsoft YaHei',
      });
    }
    // SLIDES 04-09: INDIVIDUAL PROBLEM SOLUTIONS + PRECAUTIONS + ESCALATION
    else if (
      (s.layout === SlideLayoutType.DUAL_CASE || s.layout === SlideLayoutType.SPLIT_TROUBLESHOOT) &&
      s.cases
    ) {
      s.cases.forEach((c, idx) => {
        const colX = 0.55 + idx * 4.55;
        slide.addShape(pptx.ShapeType.rect, {
          x: colX,
          y: 1.35,
          w: 4.35,
          h: 3.82,
          fill: { color: C_WHITE },
          line: { color: C_BORDER, pt: 0.75 },
        });

        const bodyLines = [
          `【故障现象】${c.symptom}`,
          `【常见原因】${c.cause}`,
          `【如何解决】`,
          ...c.selfFix.map((step, i) => ` ${i + 1}. ${step}`),
          `【注意事项】`,
          ...(c.precautions || []).map((pre) => ` • ${pre}`),
          `【何时联系 IT】${c.escalateTrigger}`,
        ].join('\n');

        slide.addText(bodyLines, {
          x: colX + 0.13,
          y: 1.42,
          w: 4.1,
          h: 3.68,
          fontSize: 8.3,
          color: C_SLATE,
          valign: 'top',
          lineSpacingMultiple: 1.12,
          fontFace: 'Microsoft YaHei',
        });
      });
    }
    // SLIDE 10: ESCALATION MATRIX
    else if (s.layout === SlideLayoutType.ESCALATION_MATRIX && s.escalationTiers) {
      s.escalationTiers.forEach((tier, idx) => {
        const colX = 0.55 + idx * 3.02;
        const headerColor =
          tier.levelCode === 'SELF' ? C_GREEN : tier.levelCode === 'STANDARD' ? C_AMBER : C_RED;

        slide.addShape(pptx.ShapeType.rect, {
          x: colX,
          y: 1.4,
          w: 2.86,
          h: 3.78,
          fill: { color: C_WHITE },
          line: { color: C_BORDER, pt: 0.75 },
        });

        slide.addText(`${tier.label}\n${tier.slaText}`, {
          x: colX + 0.12,
          y: 1.48,
          w: 2.62,
          h: 0.5,
          fontSize: 10,
          bold: true,
          color: headerColor,
          fontFace: 'Microsoft YaHei',
        });

        const listStr =
          tier.scenarios.map((sc) => `• ${sc}`).join('\n') + `\n\n行动准则：${tier.actionRule}`;

        slide.addText(listStr, {
          x: colX + 0.12,
          y: 2.02,
          w: 2.62,
          h: 3.08,
          fontSize: 8.5,
          color: C_SLATE,
          valign: 'top',
          lineSpacingMultiple: 1.15,
          fontFace: 'Microsoft YaHei',
        });
      });
    }
    // SLIDE 11: TICKET PROTOCOL
    else if (s.layout === SlideLayoutType.TICKET_PROTOCOL && s.ticketChecklist) {
      s.ticketChecklist.forEach((item, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const boxX = 0.55 + col * 4.55;
        const boxY = 1.4 + row * 1.42;

        slide.addShape(pptx.ShapeType.rect, {
          x: boxX,
          y: boxY,
          w: 4.35,
          h: 1.3,
          fill: { color: C_WHITE },
          line: { color: C_BORDER, pt: 0.75 },
        });

        slide.addText(
          `${item.step}. ${item.title}\n✓ 推荐示范：${item.example}\n✕ 避免描述：${item.badExample}`,
          {
            x: boxX + 0.14,
            y: boxY + 0.08,
            w: 4.08,
            h: 1.14,
            fontSize: 8.8,
            color: C_SLATE,
            valign: 'top',
            lineSpacingMultiple: 1.15,
            fontFace: 'Microsoft YaHei',
          }
        );
      });

      slide.addShape(pptx.ShapeType.rect, {
        x: 0.55,
        y: 4.35,
        w: 8.9,
        h: 0.82,
        fill: { color: C_DARK },
      });

      slide.addText(
        `Supreme Kitchens IT 报修直通车  |  邮箱：${config.itEmail}  |  电话：${config.itPhone}\n紧急通道：${config.urgentChannel}  |  远程工具：${config.remoteTool}`,
        {
          x: 0.7,
          y: 4.43,
          w: 8.6,
          h: 0.65,
          fontSize: 9.5,
          color: C_WHITE,
          lineSpacingMultiple: 1.25,
          fontFace: 'Microsoft YaHei',
        }
      );
    }
    // SLIDE 12: CHEAT SHEET
    else if (s.layout === SlideLayoutType.CHEAT_SHEET && s.shortcuts) {
      const tableRows: PptxGenJS.TableRow[] = [
        [
          { text: '高频快捷键', options: { bold: true, fill: { color: 'E2E8F0' }, fontSize: 9.5 } },
          { text: '功能作用', options: { bold: true, fill: { color: 'E2E8F0' }, fontSize: 9.5 } },
          { text: '设计部典型使用场景', options: { bold: true, fill: { color: 'E2E8F0' }, fontSize: 9.5 } },
        ],
        ...s.shortcuts.map((sc) => [
          { text: sc.keys, options: { bold: true, fontSize: 9, color: C_BLUE, fill: { color: C_WHITE } } },
          { text: sc.purpose, options: { bold: true, fontSize: 9, color: C_DARK, fill: { color: C_WHITE } } },
          { text: sc.scenario, options: { fontSize: 9, color: C_SLATE, fill: { color: C_WHITE } } },
        ]),
      ];

      slide.addTable(tableRows, {
        x: 0.55,
        y: 1.38,
        w: 8.9,
        colW: [2.1, 2.2, 4.6],
        border: { type: 'solid', pt: 0.75, color: C_BORDER },
        fontFace: 'Microsoft YaHei',
        margin: 4,
      });

      if (s.dailyHabits) {
        slide.addText(
          '日常电脑保养四习惯：\n' + s.dailyHabits.map((h, i) => `${i + 1}. ${h}`).join('\n'),
          {
            x: 0.55,
            y: 3.92,
            w: 8.9,
            h: 1.25,
            fontSize: 9.2,
            color: C_SLATE,
            lineSpacingMultiple: 1.2,
            fontFace: 'Microsoft YaHei',
          }
        );
      }
    }
    // SLIDE 13: 10-MINUTE Q&A SESSION
    else if (s.layout === SlideLayoutType.QA_SESSION && s.qaPrompts) {
      s.qaPrompts.forEach((q, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const boxX = 0.55 + col * 4.55;
        const boxY = 1.45 + row * 1.55;

        slide.addShape(pptx.ShapeType.rect, {
          x: boxX,
          y: boxY,
          w: 4.35,
          h: 1.4,
          fill: { color: C_WHITE },
          line: { color: C_BORDER, pt: 0.75 },
        });

        slide.addText(`【${q.topic}】\n提问方向：${q.question}\n现场支持：${q.quickAnswer}`, {
          x: boxX + 0.14,
          y: boxY + 0.1,
          w: 4.08,
          h: 1.2,
          fontSize: 9.2,
          color: C_SLATE,
          valign: 'top',
          lineSpacingMultiple: 1.18,
          fontFace: 'Microsoft YaHei',
        });
      });

      slide.addText('⏱ 最后 10 分钟现场答疑环节 (50:00 – 60:00) · 欢迎随时举手或预约课后工位一对一处理', {
        x: 0.55,
        y: 4.72,
        w: 8.9,
        h: 0.35,
        fontSize: 11,
        bold: true,
        color: C_BLUE,
        align: 'center',
        fontFace: 'Microsoft YaHei',
      });
    }

    // Footer bar on content slides
    slide.addText(
      `${config.companyName} (${config.officeAddress})  ·  IT Helpdesk: ${config.itEmail}  ·  ${s.slideNumber} / ${slides.length}`,
      {
        x: 0.55,
        y: 5.3,
        w: 8.9,
        h: 0.22,
        fontSize: 8,
        color: C_MUTED,
        fontFace: 'Microsoft YaHei',
      }
    );
  }

  await pptx.writeFile({ fileName: 'Supreme_Kitchen_Design_IT_Training_60Min.pptx' });
}
