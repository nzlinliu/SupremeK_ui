import coverStudioImg from '../assets/images/cover_design_workstation_1793571465743.jpg';
import gpuWorkstationImg from '../assets/images/diagram_gpu_workstation_1793571466419.jpg';
import networkNasImg from '../assets/images/network_nas_workflow_1793571466972.jpg';
import { ItSupportConfig, QaQuestionItem, SlideDefinition, SlideLayoutType } from '../types/presentation';

export const DEFAULT_IT_CONFIG: ItSupportConfig = {
  companyName: 'Supreme Kitchen',
  departmentName: '设计部 (Kitchen · Wardrobe · Vanity Design)',
  officeAddress: '6 Highbrook Drive, East Tāmaki, Auckland',
  officeHours: 'Mon – Fri · 8:30 AM – 6:00 PM',
  presenterName: 'IT Support Team',
  itEmail: 'it@supremekitchen.co.nz (Official: info@supremekitchen.co.nz)',
  itPhone: '+64 (0) 9 2711 983',
  urgentChannel: '内线直拨 / Teams @IT-Support（紧急故障当面或电话直联）',
  remoteTool: 'AnyDesk / TeamViewer（报修请附 9 位远程 ID）',
};

export const INITIAL_QA_ITEMS: QaQuestionItem[] = [
  {
    id: 'qa-1',
    asker: '橱柜设计师 A',
    question: '渲染全景效果图时可以同时打开微信传大图和 Chrome 看参考图吗？为什么有时会突然黑屏一秒又恢复？',
    category: '显卡与渲染',
    resolved: true,
    itNote: '黑屏一秒恢复是显卡驱动触发了 TDR（超时检测恢复），说明显存 VRAM 瞬间爆满。建议在 Chrome 设置中关闭硬件加速，或渲染出图期间暂停浏览高清视频网页。',
    createdAt: '预设高频问题',
  },
  {
    id: 'qa-2',
    asker: '深化拆单设计师 B',
    question: '在家远程办公连回公司打开共享盘里的 CAD 文件特别慢，保存一次要等十几秒怎么办？',
    category: '网络与共享盘',
    resolved: true,
    itNote: 'VPN 带宽受限于家庭上传速率，切勿直接双击 VPN 映射盘里的大文件编辑。正确做法：先复制到本机桌面修改，完成后改好版本号再拷回共享盘归档。',
    createdAt: '预设高频问题',
  },
  {
    id: 'qa-3',
    asker: '展厅设计师 C',
    question: '给客户看方案投屏到展厅电视时，电脑屏幕分辨率全乱了，CAD 工具栏也找不到了怎么快速恢复？',
    category: '双屏与投屏',
    resolved: false,
    itNote: '投屏默认“复制模式”会强行迁就电视分辨率。请按 Win + P 改用“扩展 (Extend)”模式；若弹窗跑出屏幕外，按 Alt + Space 再按 M 用方向键拉回。',
    createdAt: '待现场演示',
  },
];

export const SLIDES_DATA: SlideDefinition[] = [
  // SLIDE 01: COVER
  {
    id: 'slide-01',
    slideNumber: 1,
    sectionLabel: '培训封面',
    timeSlot: '00:00 – 02:00',
    durationMinutes: 2,
    layout: SlideLayoutType.COVER,
    title: '设计部日常电脑问题排障与 IT 支持培训',
    subtitle: '护航橱柜 (Kitchen)、衣柜 (Wardrobe) 与卫浴柜 (Vanity) 全案设计出图 · 50 分钟讲解 + 10 分钟答疑',
    imageUrl: coverStudioImg,
    imageCaption: 'Supreme Kitchen · 6 Highbrook Drive, East Tāmaki 设计工作站环境',
    speakerNotes: [
      '大家好！欢迎参加今天针对设计部门的日常电脑使用与排障培训。',
      '本次培训总时长约 1 小时：前 50 分钟我们会先概括培训目的，列出大家平时最高频遇到的日常电脑问题，然后逐一拆解每个问题怎么快速解决、有哪些操作注意事项，以及什么时候该直接联系 IT Support；最后 10 分钟（50:00–60:00）留给大家现场提问。',
    ],
  },

  // SLIDE 02: WHY THIS TRAINING (总体概况为什么要培训)
  {
    id: 'slide-02',
    slideNumber: 2,
    sectionLabel: '背景与目的',
    timeSlot: '02:00 – 05:00',
    durationMinutes: 3,
    layout: SlideLayoutType.WHY_TRAINING,
    title: '为什么要开展本次设计部 IT 培训？',
    subtitle: '减少设计思路中断、防止心血图纸丢失，让设计师与 IT 团队配合更高效',
    whyPoints: [
      {
        number: '01',
        title: '设计工作站负载重，小故障极易耽误客户交付',
        detail: '设计部日常需要同时运行 CAD 深化、3D 建模渲染、双屏对色，并与车间拆单目录实时同步。一旦卡死或出图受阻，直接影响展厅接待客户与工厂排产进度。',
        outcome: '目标：保障日常建模、渲染与出图全链路顺畅稳定',
      },
      {
        number: '02',
        title: '80% 的日常小问题其实 3 分钟内就能现场自救',
        detail: '根据历史报修统计，诸如副屏黑屏、软件假死、打印比例缩水、共享盘休眠红叉等问题操作非常简单，掌握窍门后无需停工等待 IT 走过来处理。',
        outcome: '目标：省去排队等待时间，小毛病当场秒级恢复',
      },
      {
        number: '03',
        title: '规避错误操作导致“丢稿”与全公司安全风险',
        detail: '遇到渲染假死盲目按电源键强关会导致两小时未存的图纸损坏；误点伪装成户型图/报价单的钓鱼附件更可能锁死整个公司共享盘。',
        outcome: '目标：明确操作红线与注意事项，守住图纸与数据安全',
      },
      {
        number: '04',
        title: '理清“自己处理 vs 呼叫 IT”边界，提升报修效率',
        detail: '让大家清楚哪些情况别自己硬扛（如硬件异味、蓝屏、权限与驱动问题），并通过规范截图报修让 IT 一次定位问题根源。',
        outcome: '目标：5 分钟止损法则 + 精准报修，问题解决提速 3 倍',
      },
    ],
    timeOverview: [
      {
        phase: '第一阶段（00 – 08 分钟）',
        duration: '8 min',
        desc: '培训背景目标 + 今日要讲的日常问题全景清单',
      },
      {
        phase: '第二阶段（08 – 44 分钟）',
        duration: '36 min',
        desc: '逐项拆解 6 大高频问题：如何解决 + 注意事项',
      },
      {
        phase: '第三阶段（44 – 50 分钟）',
        duration: '6 min',
        desc: '何时必须联系 IT Support、报修四要素与工位速查卡',
      },
      {
        phase: '第四阶段（50 – 60 分钟）',
        duration: '10 min',
        desc: '最后 10 分钟开放提问 (Q&A) 与现场疑难排查',
      },
    ],
    speakerNotes: [
      '第二页我们先花 3 分钟对齐一下“今天为什么要占大家一小时做这个培训”。',
      '第一，我们设计部的电脑不是普通办公打字机，大家既要跑大体积 3D 渲染又要给车间出精准施工图，电脑一罢工非常耽误事；第二，很多常见小状况（比如挪了机箱屏幕不亮、打印卡住）其实两分钟就能自己搞定，不用干等；第三也是最重要的——告诉大家哪些错误动作千万别做（比如渲染假死直接拔电源），以及遇到危险情况怎么第一时间喊 IT 止损。',
    ],
  },

  // SLIDE 03: BULLET POINT LIST OF TODAY'S DAILY ISSUES (第3页 Bullet Point 列出今天要讲到的日常问题)
  {
    id: 'slide-03',
    slideNumber: 3,
    sectionLabel: '问题总览',
    timeSlot: '05:00 – 08:00',
    durationMinutes: 3,
    layout: SlideLayoutType.ISSUE_BULLETS,
    title: '今天要讲到的日常电脑问题清单',
    subtitle: '围绕设计部每天最高频遇到的 6 类问题 + 1 套 IT 升级标准逐一展开（点击条目可直接跳转对应页）',
    issueBullets: [
      {
        index: '问题 01',
        title: '电脑运行变慢、设计软件提示“未响应 (Not Responding)”与内存爆满',
        subPoints: [
          '如何判断软件是正在后台渲染计算，还是彻底死锁卡死？',
          '为什么电脑长期只锁屏不重启会越来越卡？如何安全释放内存？',
        ],
        targetSlideNumber: 4,
        timeAllocate: '08:00 – 15:00',
      },
      {
        index: '问题 02',
        title: 'CAD / SketchUp / 渲染器无故闪退、3D 视口黑块与 C 盘空间爆满',
        subPoints: [
          '软件误用集成核显导致旋转模型掉帧怎么切回独立显卡？',
          'C 盘变红（低于 20GB）引发保存报错怎么清理？闪退后去哪找回自动备份？',
        ],
        targetSlideNumber: 5,
        timeAllocate: '15:00 – 23:00',
      },
      {
        index: '问题 03',
        title: '双屏显示器黑屏无信号、CAD 十字光标错位与工具弹窗“失踪”',
        subPoints: [
          '打扫工位或投屏展厅电视后副屏不亮、分辨率错乱如何排查？',
          '属性框跑到屏幕外面点不出来，怎么用快捷键一秒抓回主屏？',
        ],
        targetSlideNumber: 6,
        timeAllocate: '23:00 – 29:00',
      },
      {
        index: '问题 04',
        title: '公司共享盘 (NAS / Z:盘) 断连红叉、文件“只读锁定”与误覆盖找回',
        subPoints: [
          '为什么有时连得上网却打不开公司 Z 盘？客户图纸显示 Read-Only 怎么办？',
          '不小心删错或覆盖了车间拆单图纸，如何通过历史版本自救？',
        ],
        targetSlideNumber: 7,
        timeAllocate: '29:00 – 36:00',
      },
      {
        index: '问题 05',
        title: 'A3 彩色施工图/效果图打印卡死队列、比例缩水与工位断网',
        subPoints: [
          '高清渲染 PDF 发打印后卡死整台打印机怎么破？如何避免施工图尺寸被自动缩小？',
          '台式机突然断网时，30 秒内需要检查哪三处？',
        ],
        targetSlideNumber: 8,
        timeAllocate: '36:00 – 41:00',
      },
      {
        index: '问题 06',
        title: '可疑外部邮件（伪装户型图/供应商账单）识别、插件风险与锁屏习惯',
        subPoints: [
          '收到陌生压缩包图纸或要求重输邮箱密码的链接如何甄别真伪？',
          '为什么严禁私装“绿色破解插件”？万一疑似中招第一秒该做什么？',
        ],
        targetSlideNumber: 9,
        timeAllocate: '41:00 – 44:00',
      },
      {
        index: '升级标准',
        title: '什么时候自己处理 vs 什么时候必须立即联系 IT Support（附报修规范）',
        subPoints: [
          '三级响应分界线（5 分钟自助 / 常规工单 / 紧急电话直呼）与标准报修 4 要素。',
        ],
        targetSlideNumber: 10,
        timeAllocate: '44:00 – 50:00',
      },
    ],
    speakerNotes: [
      '第三页用 Bullet Points 把我们今天要逐个击破的 6 大日常问题全部列出来了，大家可以对照看看哪几个是自己最近刚踩过的坑。',
      '接下来从第 4 页开始，我们会严格按照【故障表现 → 如何解决 → 注意事项 → 何时联系 IT】的结构，一个问题一个问题讲透；最后留出 10 分钟专门答疑。',
    ],
  },

  // SLIDE 04: ISSUE 01 - SYSTEM FREEZE & MEMORY
  {
    id: 'slide-04',
    slideNumber: 4,
    sectionLabel: '问题 01 · 卡顿与未响应',
    timeSlot: '08:00 – 15:00',
    durationMinutes: 7,
    layout: SlideLayoutType.DUAL_CASE,
    title: '问题 01：电脑卡顿、软件“未响应”与内存爆满',
    subtitle: '掌握任务管理器观察法与正确重启习惯，避免误杀正在渲染计算的工程',
    cases: [
      {
        symptom: '软件标题栏出现 (Not Responding / 未响应)，画面变白、鼠标转圈',
        cause: '复杂橱柜圆角五金布尔运算、批量导出车间拆单表、或高采样光线追踪正在全速占用 CPU/GPU。',
        selfFix: [
          '按下 Ctrl + Shift + Esc 呼出任务管理器 (Task Manager)，切换到 Processes（进程）页。',
          '观察该设计软件的 CPU 与 Memory 数值：只要 CPU 占用仍在跳动（如 12%~30%）或内存持续变化，说明软件正在后台拼命运算，耐心等待 2–3 分钟即可恢复！',
          '仅当 CPU 持续为 0% 且磁盘读写为 0 MB/s 超过 5 分钟，确认彻底死锁后，再右键点击 End Task（结束任务）。',
        ],
        precautions: [
          '切忌一看到画面变白就狂点鼠标或长按机箱电源键硬关机——硬断电极易造成整个 .dwg / .skp 文件底层损坏打不开！',
          '若只是双屏画面冻住但还能听到系统提示音，可先按 Win + Ctrl + Shift + B 无损重置显卡驱动，无需关软件。',
        ],
        escalateTrigger: '同一份客户图纸每次点保存或渲染都必卡死，或整机连 Ctrl + Shift + Esc 都无法呼出超过 5 分钟。',
      },
      {
        symptom: '电脑越用越慢，窗口切换掉帧，频繁弹出“内存不足 (Out of Memory)”',
        cause: '连续一两周下班只锁屏或点“关机”（Windows 快速启动未清空内核缓存），外加 Chrome 开 40+ 参考图标签页吃满内存。',
        selfFix: [
          '保存所有已打开图纸，点击开始菜单选择 Restart（重启）而非 Shut Down（关机），彻底释放显存句柄与内存碎片。',
          '启动大型全景渲染出图前，先顺手关闭暂不使用的浏览器高清网页、视频与大型 Photoshop 文件。',
        ],
        precautions: [
          '注意区分：Windows 默认开启快速启动，点“关机再开机”会把旧驱动状态休眠存盘；每周五下班务必点一次真正的【重启 Restart】！',
          '切勿在后台同时挂着两套大型 3D 场景一起渲染，显存溢出反而会导致双双崩溃。',
        ],
        escalateTrigger: '刚重启完电脑、什么软件都没开内存占用就超过 65%，或升级大型场景经常报显存不足（联系 IT 评估扩容至 64GB 内存）。',
      },
    ],
    speakerNotes: [
      '进入第一个高频问题：软件未响应。大家一定记住两个核心注意事项：第一别狂点鼠标，越点 Windows 越判定它崩溃；第二先按 Ctrl+Shift+Esc 看一眼 CPU 数字还在不在动。',
      '另外请大家养成每周五点一次“Restart 重启”的习惯，这能帮大家消灭掉一半以上莫名其妙的卡顿。',
    ],
  },

  // SLIDE 05: ISSUE 02 - CAD CRASH & C DRIVE
  {
    id: 'slide-05',
    slideNumber: 5,
    sectionLabel: '问题 02 · 闪退与 C 盘空间',
    timeSlot: '15:00 – 23:00',
    durationMinutes: 8,
    layout: SlideLayoutType.SPLIT_TROUBLESHOOT,
    title: '问题 02：CAD / 3D 软件闪退、视口黑块与 C 盘告急',
    subtitle: '工作站独立显卡调度检查、C 盘 25GB 安全余量清理与崩溃后备份工程找回',
    imageUrl: gpuWorkstationImg,
    imageCaption: '设计工作站关键自检点：RTX 独立显卡高性能绑定 · C 盘缓存余量 ≥ 25GB',
    cases: [
      {
        symptom: '旋转 3D 柜体模型严重掉帧、材质显示黑块，或一点渲染就直接闪退',
        cause: '系统更新后软件回退到了主板核显运行，或导入了面数超标/贴图损坏的外部模型组件。',
        selfFix: [
          '打开 Windows 设置 → System → Display → Graphics，选中 AutoCAD / SketchUp / 渲染器，设为 High Performance（指定 RTX 独立显卡）。',
          '闪退后重开软件，先检查自动备份：CAD 在同目录或 Temp 目录找 .bak / .sv$ 文件（改后缀为 .dwg 恢复）；SketchUp 直接打开同目录的 .skb 备份文件。',
        ],
        precautions: [
          '切勿自行上网下载“鲁大师/驱动精灵”乱升显卡游戏驱动！设计工作站必须使用经过稳定性认证的 NVIDIA Studio 驱动（如需更新请联系 IT）。',
          '从外部模型网下载的装饰摆件（花瓶、异形灯具）先在空白文档清理多余面数再拷入主工程，防止坏组件拖崩整套厨房模型。',
        ],
        escalateTrigger: '确认已绑定独显且新开空白工程依然闪退，或急需找回损坏工程但找不到 .bak/.skb 备份。',
      },
      {
        symptom: '软件报错无法保存、提示 Scratch Disk Full（暂存盘满），打开此电脑发现 C 盘变红',
        cause: '桌面 (Desktop)、下载 (Downloads) 和微信聊天收发的大图全部默认存在 C 盘，耗尽了系统虚拟内存与渲染缓存空间。',
        selfFix: [
          '按 Win + R 输入 %temp% 回车，全选删除里面无用的临时文件（提示正在使用的勾选跳过），并清空回收站。',
          '将桌面上几百 MB 的木纹/岩板高清贴图包、已完成客户成图剪切迁移至 D 盘工作目录或 NAS 共享盘。',
        ],
        precautions: [
          '红线注意：C 盘必须常年保留 ≥ 25GB 可用空间！桌面本质上就是 C 盘文件夹，千万不要把桌面当长期仓库。',
          '清理 C 盘时严禁手动删除 C:\\Windows、Program Files 或 AppData 下不认识的文件夹；微信聊天目录搬家请通过“微信设置→文件管理→更改”自动迁移，切勿直接硬剪切！',
        ],
        escalateTrigger: '桌面和下载都清空了但 C 盘依然飘红（由 IT 使用空间分析工具为您无损清理休眠文件与冗余系统缓存）。',
      },
    ],
    speakerNotes: [
      '第二个问题是闪退与 C 盘爆满。重点强调注意事项：千万不要自己装第三方驱动软件，也千万别直接硬删 C 盘系统目录或者硬剪切微信文件夹，否则聊天记录会全空。',
      '记住 .bak 和 .skb 这两个救命后缀，闪退重开时第一时间先把备份文件另存一份再继续画，防止二次覆盖！',
    ],
  },

  // SLIDE 06: ISSUE 03 - DUAL MONITORS & PERIPHERALS
  {
    id: 'slide-06',
    slideNumber: 6,
    sectionLabel: '问题 03 · 双屏与外设',
    timeSlot: '23:00 – 29:00',
    durationMinutes: 6,
    layout: SlideLayoutType.DUAL_CASE,
    title: '问题 03：双屏显示器黑屏、光标错位与弹窗消失',
    subtitle: '90% 的双屏显示异常源于机箱接口插错、投屏模式未切回与跨屏缩放差异',
    cases: [
      {
        symptom: '打扫工位或给展厅电视投屏后，副屏黑屏显示 No Signal（无信号）',
        cause: '显示器视频线误插在机箱背面【上方竖排的主板口】（设计主机装有独显时主板口通常屏蔽无信号），或投影模式停留在“仅电脑屏幕”。',
        selfFix: [
          '低头看机箱背面：确认两根显示器线（DP / HDMI）全部插在【下方横向排列的独立显卡接口】上，并把插头推紧到底。',
          '按下键盘 Win + P，选择 Extend（扩展）模式，并确认显示器底部电源指示灯亮起、输入源 (Input Source) 对应正确。',
        ],
        precautions: [
          '注意事项：切勿在电脑开机状态下用力硬拽带锁扣的 DP 视频线（DP 线接头侧面有按压卡扣，必须按住卡扣再拔，否则极易扯坏显卡接口！）。',
          '去展厅连电视演示方案尽量选“扩展”而非“复制”，避免 4K 电视强行改动主屏分辨率把桌面图标全打乱。',
        ],
        escalateTrigger: '插对显卡口且重插后屏幕仍闪烁彩色竖线、偏红偏绿或电源灯不亮（联系 IT 更换线材或校色/换屏）。',
      },
      {
        symptom: 'CAD 十字捕捉光标跟鼠标位置对不上，或点击“图层/材质属性”没弹出窗口',
        cause: '两块屏幕缩放比例相差过大（如一块 150%、一块 100%）跨屏拖动触发坐标偏移；或属性小窗口记忆在了屏幕边界之外。',
        selfFix: [
          '右键桌面 → Display Settings，拖动屏幕 1 和 2 的图标位置使其与桌面上真实的左右摆放一致；调整缩放比例后重启一次 CAD。',
          '【抓回跑出屏幕外的隐形弹窗】：先点一下任务栏上的软件图标，按 Alt + Space，松开后再按 M 键，敲一下键盘方向键，晃动鼠标即可把弹窗拉回视野中央！',
        ],
        precautions: [
          '双屏对色注意：若左右屏幕新旧型号不同，以主屏校准色准作为给客户定橱柜烤漆/木皮色板的唯一参考，勿在偏暖护眼模式 (Night Light) 开启时调材质颜色！',
          '无线键鼠若出现卡顿连点，先换新电池，并将 USB 接收器插在机箱前面板（避开背面蓝色 USB 3.0 口的高频电磁干扰）。',
        ],
        escalateTrigger: '两块显示器色差明显影响效果图调色（联系 IT 使用硬件校色仪统一色彩配置文件）。',
      },
    ],
    speakerNotes: [
      '第三个问题是大家每天盯着看的双屏。最关键的两个注意事项：一是拔 DP 线一定要捏住卡扣再拔，硬拔会把几千纽币的显卡口拔松；二是调厨房门板颜色时千万检查一下 Windows 的“夜间护眼模式 (Night Light)”是不是关着的，不然调出来的白色橱柜全是偏黄的！',
    ],
  },

  // SLIDE 07: ISSUE 04 - NAS SHARED DRIVE & WORKSHOP SYNC
  {
    id: 'slide-07',
    slideNumber: 7,
    sectionLabel: '问题 04 · 共享盘与协作',
    timeSlot: '29:00 – 36:00',
    durationMinutes: 7,
    layout: SlideLayoutType.SPLIT_TROUBLESHOOT,
    title: '问题 04：共享盘 (NAS / Z:盘) 断连、只读锁定与误删找回',
    subtitle: '保障设计部与 Highbrook Drive 展厅及生产车间拆单图纸准确交接的存储准则',
    imageUrl: networkNasImg,
    imageCaption: '标准工作流：本机高速硬盘实时建模渲染 → 确认定稿后归档同步至公司 NAS 项目目录',
    cases: [
      {
        symptom: '此电脑里的公司共享盘显示红叉 ❌ 打不开，但网页能正常浏览',
        cause: '电脑睡眠唤醒后映射连接暂未激活，或无线网卡不小心连到了隔离的访客网络 (Guest Wi-Fi)。',
        selfFix: [
          '点击右下角网络图标：确认连接的是公司内部有线网或办公内部 Wi-Fi（Guest 访客 Wi-Fi 与内部服务器物理隔离，无法访问共享盘）。',
          '打开 This PC 直接双击一次带红叉的 Z: 盘图标触发重连；若仍报错，保存本地文件后重启一次电脑重新运行登录映射脚本。',
        ],
        precautions: [
          '核心注意事项：严禁把动画序列帧或大型光线追踪渲染的输出路径直接设在共享盘上！每秒上千次网络读写既卡慢整个局域网，又极易因瞬间丢包导致文件损坏。务必【先渲染到本机 D 盘，检查无误后再拷入共享盘】。',
        ],
        escalateTrigger: '身边多位同事同时打不开共享盘，或弹窗要求输入网络凭据报错“拒绝访问”（立即通知 IT 检查服务器与权限）。',
      },
      {
        symptom: '打开项目文件提示 Read-Only（只读锁定），或不小心保存覆盖了上一版方案',
        cause: '其他设计师或车间拆单同事正在查看同一文件未关闭；多人协作未按版本号归档。',
        selfFix: [
          '根据弹窗提示的占用人账号，在群里知会对方保存退出后再重新打开编辑。',
          '【误删/误覆盖找回】：在共享盘对应文件夹或文件上右键 → Properties（属性）→ Previous Versions（以前的版本），选择昨天或几小时前的快照点点击 Restore 还原。',
        ],
        precautions: [
          '车间交接严禁在同一文件夹堆放“最终版.dwg”“打死不改版2.dwg”！旧版请移入 Archive（历史归档）子目录，主目录只留唯一带日期版本号的有效生产图纸，防止车间 CNC 开错料！',
          '在家通过 VPN 远程办公时，请先将图纸复制到自己电脑本地编辑，改完再传回服务器，切勿隔着 VPN 直接在线实时画图保存。',
        ],
        escalateTrigger: '所有人都已关闭软件但文件仍被服务器后台死锁，或“以前的版本”里找不到误删的整个项目夹（联系 IT 从 NAS 每日离线备份提取）。',
      },
    ],
    speakerNotes: [
      '第四个问题直接关系到我们和车间生产的衔接。请大家一定把这两条注意事项记牢：第一，绝对不要直接把渲染输出路径指到网络共享盘上，本地算完再上传又快又稳；第二，主文件夹里只放最新有效生产版，旧方案挪进 Archive，避免工厂师傅开错板材！',
    ],
  },

  // SLIDE 08: ISSUE 05 - A3 PRINTING & NETWORK
  {
    id: 'slide-08',
    slideNumber: 8,
    sectionLabel: '问题 05 · 打印与断网',
    timeSlot: '36:00 – 41:00',
    durationMinutes: 5,
    layout: SlideLayoutType.DUAL_CASE,
    title: '问题 05：A3 图纸打印卡死、尺寸比例缩水与突发断网',
    subtitle: '解决大体积效果图阻塞打印队列，杜绝施工安装图纸毫厘偏差',
    cases: [
      {
        symptom: '点了打印没反应，后续同事的打印任务也全部排长队卡住不动',
        cause: '未合并图层的高清渲染 PDF（动辄 150MB+）撑爆打印机板载内存，或打印机指定纸盒缺 A3 纸挂起。',
        selfFix: [
          '先到打印机屏幕前查看：是否仅是 A3 纸盒缺纸、舱门未合紧，或提示手动确认纸张尺寸。',
          '打印大体积渲染效果图 PDF 时，在 Adobe Acrobat 打印窗口点击 Advanced（高级）→ 勾选 Print As Image（作为图像打印），电脑会先栅格化再发送，秒出不卡死！',
        ],
        precautions: [
          '注意事项：打印没出来时切勿连续狂点 5 次“打印”按钮！这会把 5 个几百兆的任务重复塞进服务器队列导致彻底瘫痪。',
          '遇到卡纸如果拉扯有明显阻力，切勿硬撕（碎纸屑留在定影器滚轮里会刮伤硒鼓），请叫 IT 处理。',
        ],
        escalateTrigger: '打印队列点取消也删不掉（需 IT 重启服务器 Print Spooler 服务）、机器报故障代码或打印画面出现规律黑线/严重偏色。',
      },
      {
        symptom: '打出来的 A3 橱柜平立面施工图拿尺子量比例不对，或工位电脑突然断网',
        cause: '打印页面缩放默认选成了 Fit（适合纸张边距），导致整张图被自动缩小了 4%~6%；断网多为桌底网线松脱。',
        selfFix: [
          '【比例校准】：凡打印带比例尺（1:20 / 1:50）的施工安装图，打印界面务必确认纸盒为 A3，且缩放固定勾选 Actual Size（实际大小 / 100%）。',
          '【断网 3 步快检】：① 看手机连公司 Wi-Fi 能否上网（判断是单机还是全公司宽带问题）；② 检查脚边是否踢松了网线水晶头；③ 右下角网络图标断开重连一次。',
        ],
        precautions: [
          '若因临时看图把 A3 图框缩印在 A4 纸上，必须在图纸空白处手写或标注“缩印非原比例”，防止安装师傅按图直接量尺打孔！',
          '切勿私自拔插机柜、墙面弱电口或工位下方的交换机盒子网线（插错环路会导致整层办公室集体断网！）。',
        ],
        escalateTrigger: '重插本机网线后仍显示“无 Internet / 未识别的网络”，或全办公室同时断网。',
      },
    ],
    speakerNotes: [
      '第五个问题是打印和网络。两个千万要注意的细节：一是没打出来别连点五遍打印；二是桌底下如果有小交换机盒子，千万别把一根网线两头都插进盒子（这叫网络环路，一插全公司瞬间断网）。打印施工图认准 Actual Size 100%！',
    ],
  },

  // SLIDE 09: ISSUE 06 - SECURITY & ANTI-PHISHING
  {
    id: 'slide-09',
    slideNumber: 9,
    sectionLabel: '问题 06 · 邮件与数据安全',
    timeSlot: '41:00 – 44:00',
    durationMinutes: 3,
    layout: SlideLayoutType.DUAL_CASE,
    title: '问题 06：钓鱼邮件识别、第三方插件风险与账号安全',
    subtitle: '设计部频繁收发外部客户户型附件与供应商报价，是伪装木马的重点攻击对象',
    cases: [
      {
        symptom: '收到陌生邮件称“新改版厨房平面图 / 五金对账单 / 快递清关”，附带压缩包或要求登录查看',
        cause: '攻击者伪造建筑商、供应商或 Microsoft 通知，将木马伪装成“户型图.pdf.exe”或钓鱼网页套取公司邮箱密码。',
        selfFix: [
          '先核对发件人真实邮箱地址（警惕把字母 l 换成数字 1 或使用免费陌生后缀的高仿邮箱）。',
          '解压后先看文件真实扩展名：正常图纸是 .dwg / .skp / .pdf / .jpg / .png；凡是 .exe / .scr / .bat / .vbs / .iso 一律直接删除！',
        ],
        precautions: [
          '注意事项：任何邮件里的链接点开后若弹出“邮箱登录框”要求重新输入密码，一律关闭网页，不要填写！',
          '给客户外发最终报价与全套施工图前，停顿 3 秒核对收件人邮箱自动联想是否选错同名客户。',
        ],
        escalateTrigger: '无法确认邮件真伪时直接转发给 IT 核验；若不慎已点开可疑程序或输了密码，【切勿隐瞒，第一时间电话通知 IT 改密止损】！',
      },
      {
        symptom: '网上找免费 3D 模型脚本、字体包或“绿色破解渲染插件”时杀毒软件报毒拦截',
        cause: '非正规模型论坛的破解补丁是勒索病毒（Ransomware）头号载体，一旦运行会顺着网络把 Z: 共享盘所有图纸全部加密勒索！',
        selfFix: [
          '立即停止运行并删除被系统安全中心拦截的可疑文件。',
          '日常需要安装新字体、格式转换器或 CAD/SketchUp 插件，直接发消息给 IT Support，由 IT 核验无毒并合规安装。',
        ],
        precautions: [
          '红线禁令：严禁以任何理由关闭电脑杀毒防护去运行未知注册机或破解补丁！',
          '离开工位（去展厅谈单、去车间对尺寸或午休）养成随手按 Win + L 锁屏的习惯，保护客户隐私与公司商业图纸。',
        ],
        escalateTrigger: '【最高警报】若发现桌面或共享盘文件图标突然变白、后缀变成奇怪字母且弹出英文勒索信——第 1 秒直接拔掉机箱网线并关 Wi-Fi，原地打电话叫 IT！',
      },
    ],
    speakerNotes: [
      '第六个问题是安全防范。这里最重要的注意事项就是：万一真的不小心点错了可疑附件，千万别因为不好意思而自己偷偷重启或者装没事！第一时间拔掉网线喊 IT，我们能在几秒内保住全公司的共享盘；越早说越安全！',
    ],
  },

  // SLIDE 10: ESCALATION MATRIX (何时必须联系 IT Support)
  {
    id: 'slide-10',
    slideNumber: 10,
    sectionLabel: '响应边界 · 何时找 IT',
    timeSlot: '44:00 – 47:00',
    durationMinutes: 3,
    layout: SlideLayoutType.ESCALATION_MATRIX,
    title: '总结边界：什么时候自己修？什么时候必须联系 IT Support？',
    subtitle: '遵循“5 分钟止损原则”——不耽误画图进度，也不错过硬件与安全故障的黄金抢救窗口',
    escalationTiers: [
      {
        levelCode: 'SELF',
        label: '一级：自助快修（自检 ≤ 5 分钟）',
        slaText: '当场自愈 · 无需等待',
        summary: '单机偶发常规小问题，不涉及管理员权限、拆机硬件或全组网络异常。',
        scenarios: [
          '单个软件未响应（看任务管理器确认死锁后重开软件）',
          '副屏休眠未亮、Win + P 投屏模式切回、Alt + Space + M 拉回弹窗',
          'A3 打印比例改回 100%、大图勾选“作为图像打印”、普通缺纸添纸',
          'C 盘清理 %temp% 与回收站、把桌面大贴图包移入 D 盘',
          '共享盘休眠红叉双击重连、无线键鼠更换新电池',
        ],
        actionRule: '按培训方法自查不超过 5 分钟；5 分钟没搞定立刻转交 IT！',
      },
      {
        levelCode: 'STANDARD',
        label: '二级：常规报修（发邮件 / 消息工单）',
        slaText: '工作日 1–4 小时内响应',
        summary: '需要管理员密码、正版授权激活、驱动调优、目录权限或耗材配件更换。',
        scenarios: [
          '安装/更新 CAD、SketchUp、渲染插件、字体库或弹出管理员密码框',
          '软件提示 License 许可证失效、账号无法登录或邮箱空间已满',
          '开通新项目共享盘权限、升级 NVIDIA Studio 显卡驱动、双屏校色',
          '鼠标连点失灵、DP 视频线接触不良需要更换新配件',
          '打印机墨粉耗尽、废粉盒满或打印成品持续偏色有黑道',
        ],
        actionRule: '发送报错截图 + 工位远程 ID 给 IT，期间可先处理其他设计工作。',
      },
      {
        levelCode: 'URGENT',
        label: '三级：紧急直呼 IT（立即停手 · 电话/当面联系）',
        slaText: '最高优先级 · 立即介入',
        summary: '涉及数据损毁风险、多人停工、物理硬件危险或网络安全事件，切勿自行反复折腾！',
        scenarios: [
          '【安全红线】误点可疑木马附件、共享盘文件名变乱码（立刻拔网线断 Wi-Fi 打电话！）',
          '【硬件险情】咖啡/水洒进键盘或机箱、闻到焦糊味、风扇剧烈异响（立刻拔电源禁开机！）',
          '【系统崩溃】频繁蓝屏死机 (BSOD)、开机黑屏进不去 Windows 系统',
          '【生产阻断】全设计部断网/连不上 Z: 盘、急等见客户或下车间的工程文件损坏打不开',
        ],
        actionRule: '保护第一现场（手机拍下蓝屏码 / 拔网线 / 断电源），直接打电话或当面喊 IT！',
      },
    ],
    speakerNotes: [
      '把前面 6 个问题串起来，这一页就是最清晰的行动指南：自己搞 5 分钟没弄好、要输管理员密码、或者遇到第三列这四种紧急红线，别犹豫马上找 IT！特别是进水冒烟和疑似中毒，第一时间断电或拔网线，千万别发封邮件静静等着，直接打电话或过来喊我。',
    ],
  },

  // SLIDE 11: TICKET PROTOCOL
  {
    id: 'slide-11',
    slideNumber: 11,
    sectionLabel: '报修规范 · 四要素',
    timeSlot: '47:00 – 49:00',
    durationMinutes: 2,
    layout: SlideLayoutType.TICKET_PROTOCOL,
    title: '联系 IT Support 时，请顺手提供这 4 项信息',
    subtitle: '告别只发一句“我电脑坏了”，完整上下文能让 IT 带着准确方案一步到位解决',
    ticketChecklist: [
      {
        step: '01',
        title: '保留第一现场截图（Win + Shift + S）',
        example: '截取包含完整英文报错文字、软件界面的清晰图片（蓝屏用手机拍清底部英文错误码）。',
        badExample: '“刚才弹了个英文框报错，我没仔细看随手点叉关掉了。”',
      },
      {
        step: '02',
        title: '说明具体软件、操作动作与文件范围',
        example: '“仅打开 Z:\\2026\\Remuera_Kitchen.skp 点渲染就闪退，打开其他客户文件正常。”',
        badExample: '“我的 SketchUp 彻底坏了用不了。”（容易误导重装整个软件）',
      },
      {
        step: '03',
        title: '告知紧急程度与交付时间节点',
        example: '“下午 2:30 客户到 Highbrook Drive 展厅看这套橱柜+衣柜方案图，需在此前恢复打印！”',
        badExample: '未提客户预约时间，临到见客户前 5 分钟才紧急催促。',
      },
      {
        step: '04',
        title: '附上工位号 / AnyDesk 远程码与已做过的尝试',
        example: '“工位 Design-04，AnyDesk: 842 910 335；我已经重启过一次电脑还是报错。”',
        badExample: '发完消息人去展厅且电脑锁屏未留远程码，IT 无法先行远程排查。',
      },
    ],
    speakerNotes: [
      '大家平时找 IT 时，只要按这四条发消息：一张截图 + 干什么出的错（是所有文件都错还是就这一个文件错）+ 几点急用 + 远程 ID，我们的排查效率至少翻三倍，也不用反复打扰大家画图。',
    ],
  },

  // SLIDE 12: TAKEAWAY CHEAT SHEET
  {
    id: 'slide-12',
    slideNumber: 12,
    sectionLabel: '工位速查卡',
    timeSlot: '49:00 – 50:00',
    durationMinutes: 1,
    layout: SlideLayoutType.CHEAT_SHEET,
    title: '课后留存：设计部高频自救热键与保养速查卡',
    subtitle: '6 个救命快捷键 + 4 条日常电脑保养习惯（可打印贴于显示器旁）',
    shortcuts: [
      {
        keys: 'Ctrl + S',
        purpose: '随时保存当前图纸',
        scenario: '每画完一组柜体或点击渲染出图按钮前必按',
      },
      {
        keys: 'Ctrl + Shift + Esc',
        purpose: '直达任务管理器',
        scenario: '观察 CPU/内存判断是否真卡死，安全结束死锁进程',
      },
      {
        keys: 'Win + Shift + S',
        purpose: '区域框选截图',
        scenario: '截取软件报错弹窗，第一时间发给 IT Support',
      },
      {
        keys: 'Win + P',
        purpose: '多屏/展厅投屏切换',
        scenario: '副屏不亮或连电视时快速切换“扩展 Extend”模式',
      },
      {
        keys: 'Win + Ctrl + Shift + B',
        purpose: '秒级重置显卡驱动',
        scenario: '双屏瞬间黑屏或 3D 视口画面卡住时无损唤醒显卡',
      },
      {
        keys: 'Win + L',
        purpose: '一键锁定电脑屏幕',
        scenario: '离开工位去展厅接待客户或去车间核对尺寸时必按',
      },
    ],
    dailyHabits: [
      '每周五下班点一次【重启 Restart】（而非关机），清空显卡显存与系统底层缓存。',
      '守住 C 盘可用空间 ≥ 25GB 红线，大贴图材质包统一放 D 盘，不堆在桌面。',
      '大体积渲染先输出到本机硬盘再拷入 NAS 共享盘；A3 施工图打印锁定 Actual Size 100%。',
      '自查满 5 分钟未解决、需管理员权限、或遇蓝屏/进水/可疑附件，立即联系 IT Support！',
    ],
    speakerNotes: [
      '这是为大家整理的一页纸速查表，培训后我会把 PPT 和速查单发到设计部群里，大家随时可查。下面把最后 10 分钟时间交给在座各位！',
    ],
  },

  // SLIDE 13: FINAL 10-MINUTE Q&A SESSION (最后是 10 分钟答疑时间)
  {
    id: 'slide-13',
    slideNumber: 13,
    sectionLabel: '互动答疑 · 10 分钟 Q&A',
    timeSlot: '50:00 – 60:00',
    durationMinutes: 10,
    layout: SlideLayoutType.QA_SESSION,
    title: '现场互动答疑时间（最后 10 分钟 Q&A）',
    subtitle: '欢迎提出您日常使用工作站遇到的卡点、软件报错、外设不适或远程办公疑问',
    qaPrompts: [
      {
        topic: '软件卡顿与渲染设置',
        question: '“我工位电脑打开某类复杂橱柜模型或开灯光渲染时特别慢，能不能帮我调优？”',
        quickAnswer: '现场可登记工位号，会后直接帮您检查 RTX 独显绑定、虚拟内存与插件冲突。',
      },
      {
        topic: 'C 盘清理与微信搬家',
        question: '“我的 C 盘已经只剩十几个 G 变红了，微信聊天收的客户图怎么安全移去 D 盘？”',
        quickAnswer: '切勿手动硬删系统目录！现场演示在微信【设置 → 文件管理 → 更改】一键无损迁移。',
      },
      {
        topic: '双屏显示与外设更换',
        question: '“我的两块显示器颜色看着不一样 / 鼠标最近容易连点双击 / 需要转接头……”',
        quickAnswer: '现场记录工位需求，培训结束后 IT 直接带校色仪与全新键鼠线材到工位更换。',
      },
      {
        topic: '共享盘归档与远程办公',
        question: '“在家远程连公司打开客户图纸，或者找回上周误覆盖的旧方案该怎么操作？”',
        quickAnswer: '现场演示共享文件夹右键“以前的版本 (Previous Versions)”还原与远程办公最佳实践。',
      },
    ],
    speakerNotes: [
      '现在进入我们最后 10 分钟的现场提问时间（50:00–60:00）！可以点击右上角打开“答疑看板”开启 10 分钟倒计时。',
      '大家平时电脑有任何用着不顺手的地方——哪怕是鼠标双击、C盘红了、某台打印机总连不上——现在都可以直接提出来，能现场演示的我们马上演示，需要上机调的我现在记下你的工位号，散会直接过去帮你弄好！',
    ],
  },
];
