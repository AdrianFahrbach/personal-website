import { Application as SplineApp } from '@splinetool/runtime';

/**
 * This function moves the boundary planes to the correct position by adjusting a Spline variable.
 * We have to use variables with a transition (in Spline) for the collission box to actually update.
 * We also can't scale the planes because that would mess up the collission box, so they are always 10000 wide.
 * We also have two planes for each side, to decrease the chance of object clipping through.
 * @param spline The current spline instance
 */
export function updateBoundaries(spline: SplineApp) {
  spline.setVariables({
    edgeLeft: -(window.innerWidth / 2),
    edgeRight: window.innerWidth / 2,
    edgeTop: window.innerHeight / 2,
    edgeBottom: -(window.innerHeight / 2),
  });
}

const allAchievements = [
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

const achievementToObjectNameMap: Record<Achievement, string> = {
  github: 'github-logo',
  linkedin: 'linkedin-logo',
  dribbble: 'dribbble-logo',
  cv: 'cv-icon',
  contact: 'contact-icon',
  nickname: 'user-icon',
  'to-the-moon': 'rocket-icon',
  edges: 'edges-icon',
};

export function updateVisibleAchievementObjects(spline: SplineApp, achievements: Achievement[]) {
  allAchievements.forEach(achievement => {
    const obj = spline.findObjectByName(achievementToObjectNameMap[achievement]);
    if (obj) {
      obj.visible = achievements.includes(achievement);
    }
  });
}
