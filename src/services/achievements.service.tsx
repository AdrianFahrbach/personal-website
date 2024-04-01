import {
  CornersOut,
  DribbbleLogo,
  Envelope,
  GithubLogo,
  Icon,
  LinkedinLogo,
  Person,
  ReadCvLogo,
  Rocket,
} from '@phosphor-icons/react';

export const allAchievements = [
  'github',
  'linkedin',
  'dribbble',
  'cv',
  'contact',
  'nickname',
  'to-the-moon',
  'edges',
] as const;
export type Achievement = (typeof allAchievements)[number];

export const achievementToToastMap: Record<Achievement, { icon: React.ReactNode; headline: string; subline: string }> =
  {
    'to-the-moon': {
      icon: <Rocket size={28} />,
      headline: 'To the moon!',
      subline: 'Throw an object out of the viewport.',
    },
    edges: {
      icon: <CornersOut size={28} />,
      headline: 'Edges of the universe!',
      subline: 'Have an object in all corners of the viewport.',
    },
    github: {
      icon: <GithubLogo size={28} />,
      headline: 'Sometimes fixing bugs, mostly creating them.',
      subline: 'Check out my GitHub profile.',
    },
    linkedin: {
      icon: <LinkedinLogo size={28} />,
      headline: "I am a business man, I'm doing business.",
      subline: 'Check out my LinkedIn profile.',
    },
    dribbble: {
      icon: <DribbbleLogo size={28} />,
      headline: 'And he goes for the slam dunk!',
      subline: 'Check out my Dribbble profile.',
    },
    cv: {
      icon: <ReadCvLogo size={28} />,
      headline: 'All the information you need.',
      subline: 'Download my CV.',
    },
    contact: {
      icon: <Envelope size={28} />,
      headline: "Please don't spam me.",
      subline: 'Send me a message.',
    },
    nickname: {
      icon: <Person size={28} />,
      headline: "That's what my friends call me.",
      subline: 'Make my nickname out of balloons',
    },
  };
