import { Application as SplineApp } from '@splinetool/runtime';
import { Achievement, allAchievements } from './achievements.service';

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

const achievementToObjectNameMap: Record<Achievement, string> = {
  github: 'obj-github-logo',
  linkedin: 'obj-linkedin-logo',
  dribbble: 'obj-dribbble-logo',
  cv: 'obj-cv-icon',
  contact: 'obj-contact-icon',
  nickname: 'obj-user-icon',
  'to-the-moon': 'obj-rocket-icon',
  edges: 'obj-edges-icon',
};

/**
 * This function updates the visibility of the unlocked objects in the scene.
 * We need to hide them on the first load, because we can't hide them in Spline.
 */
export function updateVisibleAchievementObjects(spline: SplineApp, achievements: Achievement[]) {
  allAchievements.forEach(achievement => {
    const obj = spline.findObjectByName(achievementToObjectNameMap[achievement]);
    if (obj) {
      obj.visible = achievements.includes(achievement);
    }
  });
}

/**
 * This function checks if one of the spline achievements has been unlocked.
 */
export function checkForAchievements(
  spline: SplineApp,
  achievements: Achievement[],
  unlockAchievement: (achievement: Achievement) => void
) {
  // All objects to check for achievements start with 'obj-'
  const allObjects = spline.getAllObjects().filter(obj => obj.name.startsWith('obj-'));

  // if (!achievements.includes('to-the-moon')) {
  //   const minX = -(window.innerWidth / 2) - 500;
  //   const maxX = window.innerWidth / 2 + 500;
  //   const minY = -(window.innerHeight / 2) - 500;
  //   const maxY = window.innerHeight / 2 + 500;
  //   allObjects.forEach(obj => {
  //     if (obj.name === 'obj-r') {
  //       console.log(obj);
  //     }
  //     if (obj.position.x < minX || obj.position.x > maxX || obj.position.y < minY || obj.position.y > maxY) {
  //       console.log(obj.name, obj.position.x, obj.position.y, minX, maxX, minY, maxY);
  //       // unlockAchievement('to-the-moon');
  //     }
  //   });
  // }
}
