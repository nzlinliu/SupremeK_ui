export enum SlideLayoutType {
  COVER = 'COVER',
  WHY_TRAINING = 'WHY_TRAINING',
  ISSUE_BULLETS = 'ISSUE_BULLETS',
  SPLIT_TROUBLESHOOT = 'SPLIT_TROUBLESHOOT',
  DUAL_CASE = 'DUAL_CASE',
  ESCALATION_MATRIX = 'ESCALATION_MATRIX',
  TICKET_PROTOCOL = 'TICKET_PROTOCOL',
  QA_SESSION = 'QA_SESSION',
  CHEAT_SHEET = 'CHEAT_SHEET',
}

export interface TroubleshootStep {
  symptom: string;
  cause: string;
  selfFix: string[];
  precautions: string[];
  escalateTrigger: string;
}

export interface WhyTrainingPoint {
  number: string;
  title: string;
  detail: string;
  outcome: string;
}

export interface IssueBulletItem {
  index: string;
  title: string;
  subPoints: string[];
  targetSlideNumber: number;
  timeAllocate: string;
}

export interface EscalationTier {
  levelCode: 'SELF' | 'STANDARD' | 'URGENT';
  label: string;
  slaText: string;
  summary: string;
  scenarios: string[];
  actionRule: string;
}

export interface ShortcutItem {
  keys: string;
  purpose: string;
  scenario: string;
}

export interface SlideDefinition {
  id: string;
  slideNumber: number;
  sectionLabel: string;
  timeSlot: string;
  durationMinutes: number;
  layout: SlideLayoutType;
  title: string;
  subtitle: string;
  imageUrl?: string;
  imageCaption?: string;
  whyPoints?: WhyTrainingPoint[];
  timeOverview?: { phase: string; duration: string; desc: string }[];
  issueBullets?: IssueBulletItem[];
  cases?: TroubleshootStep[];
  proTips?: { label: string; detail: string }[];
  escalationTiers?: EscalationTier[];
  ticketChecklist?: { step: string; title: string; example: string; badExample: string }[];
  qaPrompts?: { topic: string; question: string; quickAnswer: string }[];
  shortcuts?: ShortcutItem[];
  dailyHabits?: string[];
  speakerNotes: string[];
}

export interface ItSupportConfig {
  companyName: string;
  departmentName: string;
  officeAddress: string;
  officeHours: string;
  presenterName: string;
  itEmail: string;
  itPhone: string;
  urgentChannel: string;
  remoteTool: string;
}

export interface QaQuestionItem {
  id: string;
  asker: string;
  question: string;
  category: string;
  resolved: boolean;
  itNote: string;
  createdAt: string;
}
