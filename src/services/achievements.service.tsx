import { Cheatcode } from '@/components/Cheatcode';
import {
  AirplaneIcon,
  CornersOutIcon,
  CursorClickIcon,
  DribbbleLogoIcon,
  EnvelopeIcon,
  GameControllerIcon,
  GithubLogoIcon,
  HeartIcon,
  LinkedinLogoIcon,
  ReadCvLogoIcon,
  RocketIcon,
  UserIcon,
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
    icon: <CursorClickIcon size={28} />,
    headline: 'Handle with care!',
    subline: 'Drag an object around the viewport.',
  },
  github: {
    icon: <GithubLogoIcon size={28} />,
    headline: 'Sometimes fixing bugs, mostly creating them.',
    subline: 'Check out my GitHub profile.',
  },
  linkedin: {
    icon: <LinkedinLogoIcon size={28} />,
    headline: 'I am a business man, doing business.',
    subline: 'Check out my LinkedIn profile.',
  },
  dribbble: {
    icon: <DribbbleLogoIcon size={28} />,
    headline: 'And he goes for the slam dunk!',
    subline: 'Check out my Dribbble profile.',
  },
  cv: {
    icon: <ReadCvLogoIcon size={28} />,
    headline: 'All the information you need.',
    subline: 'Take a look at my CV.',
  },
  contact: {
    icon: <EnvelopeIcon size={28} />,
    headline: "Please don't spam me.",
    subline: 'Send me an email.',
  },
  'to-the-moon': {
    icon: <RocketIcon size={28} />,
    headline: 'To the moon!',
    subline: 'Throw an object out far of the viewport.',
  },
  edges: {
    icon: <CornersOutIcon size={28} />,
    headline: 'Corner Connoisseur',
    subline: 'Have an object in all corners of the viewport.',
  },
  nickname: {
    icon: <UserIcon size={28} />,
    headline: "That's what my friends call me.",
    subline: 'Make my nickname out of balloons',
  },
  cheatcode: {
    icon: <GameControllerIcon size={28} />,
    headline: <Cheatcode />,
    subline: 'Did you know that I have a game design background?',
  },
  'its-a-match': {
    icon: <HeartIcon size={28} />,
    headline: "It's a match!",
    subline: 'Match each highlighted word with a fitting balloon.',
  },
  'mile-high-club': {
    icon: <AirplaneIcon size={28} />,
    headline: 'Mile High Club',
    subline: 'Keep all balloons at the top of the screen.',
  },
};
