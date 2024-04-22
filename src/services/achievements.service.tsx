import { Cheatcode } from '@/components/Cheatcode';
import {
  Airplane,
  CornersOut,
  CursorClick,
  DribbbleLogo,
  Envelope,
  GameController,
  GithubLogo,
  Heart,
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
  'its-a-match',
  'mile-high-club',
] as const;
export type Achievement = (typeof allAchievements)[number];

export const achievementToToastMap: Record<
  Achievement,
  { icon: React.ReactNode; headline: React.ReactNode; subline: string }
> = {
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
    headline: "I am a business man, doing business.",
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
    subline: 'Take a look at my CV.',
  },
  contact: {
    icon: <Envelope size={28} />,
    headline: "Please don't spam me.",
    subline: 'Send me an email.',
  },
  'to-the-moon': {
    icon: <Rocket size={28} />,
    headline: 'To the moon!',
    subline: 'Throw an object out far of the viewport.',
  },
  edges: {
    icon: <CornersOut size={28} />,
    headline: 'Corner Connoisseur',
    subline: 'Have an object in all corners of the viewport.',
  },
  nickname: {
    icon: <User size={28} />,
    headline: "That's what my friends call me.",
    subline: 'Make my nickname out of balloons',
  },
  cheatcode: {
    icon: <GameController size={28} />,
    headline: <Cheatcode />,
    subline: 'Did you know that I have a game design background?',
  },
  'its-a-match': {
    icon: <Heart size={28} />,
    headline: "It's a match!",
    subline: 'Match each highlighted word with a fitting balloon.',
  },
  'mile-high-club': {
    icon: <Airplane size={28} />,
    headline: 'Mile High Club',
    subline: 'Keep all balloons at the top of the screen.',
  },
};
