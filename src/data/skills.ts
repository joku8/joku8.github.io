// Centralized skills registry - single source of truth for all skills and their emojis
export const SKILLS = {
  // Programming Languages
  'Python': '🐍',
  'Typescript': '⌨️',
  'Java': '♨️',
  'JavaScript': '⚛️',
  'C/C++': '💻',
  'Golang': '🐹',
  'Rust': '🦀',
  'R': '🅁',
  
  // Frameworks & Libraries
  'ReactJS/TS': '⚛️',
  'Flask': '⚗️',
  'Material UI': '🎨',
  'Jupyter Notebook': '🪐',
  
  // Cloud & Infrastructure
  'AWS': '☁️',
  'Terraform': '🌎',
  'Databricks': '🧱',
  'Kubernetes': '🐙',
  
  // Tools & Technologies
  'New Relic': '⏱️',
  'Automation': '⚙️',
  'Robotics': '🤖',
  
  // Data & ML
  'Machine Learning': '🧠',
  'Data Science': '📊',
  
  // Agriculture & Biology
  'Digital Agriculture': '🌾',
  'Genetics': '🧬',
  'Crop Breeding': '🌱',
  'Biochemistry': '🧬',
  'Enzymology': '🧫',
  'Cell Culture': '🦠',
  
  // Lab & Chemistry
  'Wet Lab Techniques': '🧪',
  'Chemistry (General & Organic)': '⌬',
  
  // Soft Skills
  'Teaching': '👨‍🏫',
  'UI/UX': '👥',
} as const;

export type SkillName = keyof typeof SKILLS;

export function getSkillEmoji(skillName: string): string {
  return SKILLS[skillName as SkillName] || '🔧';
}

export function formatSkill(skillName: string): { emoji: string; label: string } {
  return {
    emoji: getSkillEmoji(skillName),
    label: skillName
  };
}

export function parseSkillString(skillString: string): { emoji: string; label: string } {
  const match = skillString.match(/^([\p{Emoji}])\s+(.+)$/u);
  if (match) {
    return { emoji: match[1], label: match[2] };
  }
  return formatSkill(skillString);
}
