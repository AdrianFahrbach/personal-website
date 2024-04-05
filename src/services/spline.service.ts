import { SPEObject, Application as SplineApp } from '@splinetool/runtime';
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
  drag: 'obj-drag-icon',
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
  unlockedAchievements: Achievement[],
  unlockAchievement: (achievement: Achievement) => void
) {
  let allObjects: SPEObject[] = [];
  if (!unlockedAchievements.includes('nickname') || !unlockedAchievements.includes('edges')) {
    // All objects relevant for achievements start with 'obj-'
    allObjects = spline.getAllObjects().filter(obj => obj.name.startsWith('obj-'));
  }

  /**
   * Check for the to-the-moon achievement
   */
  if (!unlockedAchievements.includes('to-the-moon')) {
    if (spline.getVariable('isOutOfBounds') === true) {
      unlockAchievement('to-the-moon');
    }
  }

  /**
   * Check for the nickname achievement
   */
  if (!unlockedAchievements.includes('nickname')) {
    const relevantObjNames = ['obj-a-1', 'obj-a-2', 'obj-d', 'obj-i'];
    const [objLetterA1, objLetterA2, objLetterD, objLetterI] = relevantObjNames.map(name =>
      allObjects.find(obj => obj.name === name)
    );
    const words = [
      [objLetterA1, objLetterD, objLetterI],
      [objLetterA2, objLetterD, objLetterI],
    ];
    const range = { x: { min: 0, max: 100 }, y: { min: -50, max: 50 } };

    for (const word of words) {
      const isComplete = word.every((thisLetter, index) => {
        // We don't need to check the last letter
        if (index === word.length - 1) {
          return true;
        }

        // Check if the next letter is close enough to this one
        const nextLetter = word[index + 1];
        if (!nextLetter || !thisLetter) {
          return false;
        }
        if (!isWithinRelativeArea(thisLetter, nextLetter, range)) {
          return false;
        }

        // Check that there are no other objects between the letters
        const objsToAvoid = allObjects.filter(
          obj => obj.visible && word.every(objLetter => objLetter?.name !== obj.name)
        );
        if (objsToAvoid.some(obj => isWithinRelativeArea(thisLetter, obj, range))) {
          return false;
        }

        return true;
      });
      if (isComplete) {
        unlockAchievement('nickname');
        break;
      }
    }
  }

  /**
   * Check for the edges achievement
   */
  if (!unlockedAchievements.includes('edges')) {
    const topLeft = { x: -(window.innerWidth / 2), y: window.innerHeight / 2 };
    const topRight = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const bottomLeft = { x: -(window.innerWidth / 2), y: -(window.innerHeight / 2) };
    const bottomRight = { x: window.innerWidth / 2, y: -(window.innerHeight / 2) };

    const allEdgesFilled = [topLeft, topRight, bottomLeft, bottomRight].every(corner =>
      allObjects.some(obj => {
        return Math.abs(obj.position.x - corner.x) < 70 && Math.abs(obj.position.y - corner.y) < 70;
      })
    );

    if (allEdgesFilled) {
      unlockAchievement('edges');
    }
  }
}

/**
 * Checks if the objects are within a certain range of each other.
 */
function isWithinRelativeArea(
  fromObj: SPEObject,
  toObj: SPEObject,
  range: { x: { min: number; max: number }; y: { min: number; max: number } }
) {
  const x = toObj.position.x - fromObj.position.x;
  const y = toObj.position.y - fromObj.position.y;
  return x > range.x.min && x < range.x.max && y > range.y.min && y < range.y.max;
}
