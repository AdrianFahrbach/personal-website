import {
  CornersOut,
  CursorClick,
  DribbbleLogo,
  Envelope,
  GameController,
  GithubLogo,
  LinkedinLogo,
  ReadCvLogo,
  Rocket,
  User,
} from '@phosphor-icons/react';

export const allAchievements = [
  'drag',
  'github',
  'linkedin',
  'dribbble',
  'cv',
  'contact',
  'nickname',
  'cheatcode',
  'to-the-moon',
  'edges',
] as const;
export type Achievement = (typeof allAchievements)[number];

export const achievementToToastMap: Record<Achievement, { icon: React.ReactNode; headline: string; subline: string }> =
  {
    drag: {
      icon: <CursorClick size={28} />,
      headline: 'Handle with care!',
      subline: 'Drag an object around the viewport.',
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
    'to-the-moon': {
      icon: <Rocket size={28} />,
      headline: 'To the moon!',
      subline: 'Throw an object out of the viewport.',
    },
    edges: {
      icon: <CornersOut size={28} />,
      headline: 'Edgelord',
      subline: 'Have an object in all corners of the viewport.',
    },
    nickname: {
      icon: <User size={28} />,
      headline: "That's what my friends call me.",
      subline: 'Make my nickname out of balloons',
    },
    cheatcode: {
      icon: <GameController size={28} />,
      headline: '',
      subline: 'Use the Atari cheat code at the homepage.',
    },
  };
