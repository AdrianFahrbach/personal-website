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

export type ObjectId =
  | 'obj-a-1'
  | 'obj-d'
  | 'obj-r'
  | 'obj-i'
  | 'obj-a-2'
  | 'obj-n'
  | 'obj-cursor-icon'
  | 'obj-github-logo'
  | 'obj-linkedin-logo'
  | 'obj-dribbble-logo'
  | 'obj-cv-icon'
  | 'obj-contact-icon'
  | 'obj-user-icon'
  | 'obj-controller-icon'
  | 'obj-rocket-icon'
  | 'obj-edges-icon'
  | 'obj-heart-icon'
  | 'obj-airplane-icon';

export const achievementToObjectNameMap: Record<Achievement, ObjectId> = {
  drag: 'obj-cursor-icon',
  github: 'obj-github-logo',
  linkedin: 'obj-linkedin-logo',
  dribbble: 'obj-dribbble-logo',
  cv: 'obj-cv-icon',
  contact: 'obj-contact-icon',
  nickname: 'obj-user-icon',
  cheatcode: 'obj-controller-icon',
  'to-the-moon': 'obj-rocket-icon',
  edges: 'obj-edges-icon',
  'its-a-match': 'obj-heart-icon',
  'mile-high-club': 'obj-airplane-icon',
};

export const achievementToVariableNameMap: Record<Achievement, string> = {
  drag: 'hasCursorIcon',
  github: 'hasGithubLogo',
  linkedin: 'hasLinkedinLogo',
  dribbble: 'hasDribbbleLogo',
  cv: 'hasCvIcon',
  contact: 'hasContactIcon',
  nickname: 'hasUserIcon',
  cheatcode: 'hasControllerIcon',
  'to-the-moon': 'hasRocketIcon',
  edges: 'hasEdgesIcon',
  'its-a-match': 'hasHeartIcon',
  'mile-high-club': 'hasAirplaneIcon',
};

/**
 * This function updates the visibility and position of the unlocked objects in the scene.
 * We need to hide them on the first load, because we can't hide them in Spline.
 */
export function updateVisibleAchievementObjects(splineApp: SplineApp, unlockedAchievements: Achievement[]) {
  allAchievements.forEach(achievement => {
    const obj = splineApp.findObjectByName(achievementToObjectNameMap[achievement]);
    if (obj) {
      const isUnlocked = unlockedAchievements.includes(achievement);
      obj.visible = isUnlocked;
      splineApp.setVariable(achievementToVariableNameMap[achievement], isUnlocked);
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
  if (
    !unlockedAchievements.includes('nickname') ||
    !unlockedAchievements.includes('edges') ||
    !unlockedAchievements.includes('its-a-match') ||
    !unlockedAchievements.includes('mile-high-club')
  ) {
    // All objects relevant for achievements start with 'obj-'
    allObjects = spline.getAllObjects().filter(obj => obj.visible && obj.name.startsWith('obj-'));
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
    const relevantObjNames: ObjectId[] = ['obj-a-1', 'obj-a-2', 'obj-d', 'obj-i'];
    const [objLetterA1, objLetterA2, objLetterD, objLetterI] = relevantObjNames.map(name =>
      allObjects.find(obj => obj.name === name)
    );
    const words = [
      [objLetterA1, objLetterD, objLetterI],
      [objLetterA2, objLetterD, objLetterI],
    ];
    const range = { x: { min: 0, max: 90 }, y: { min: -50, max: 50 } };

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
        if (!isInRange(thisLetter, nextLetter, range)) {
          return false;
        }

        // Check that there are no other objects between the letters
        const objsToAvoid = allObjects.filter(
          obj => obj.visible && word.every(objLetter => objLetter?.name !== obj.name)
        );
        if (objsToAvoid.some(obj => isInRange(thisLetter, obj, range))) {
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

  /**
   * Check for the its-a-match achievement
   */
  if (!unlockedAchievements.includes('its-a-match')) {
    const hasObjForName = unlockedAchievements.includes('nickname') || unlockedAchievements.includes('contact');
    const hasObjForDesigner = unlockedAchievements.includes('dribbble');
    const hasObjForDeveloper = unlockedAchievements.includes('github');
    const hasObjForCompany = unlockedAchievements.includes('linkedin') || unlockedAchievements.includes('cv');

    // Make sure that the user has unlocked enough objects for the achievement
    if (hasObjForName && !hasObjForDesigner && !hasObjForDeveloper && !hasObjForCompany) {
      const possibleMatches: Array<[string, Array<ObjectId>]> = [
        ['name', ['obj-user-icon', 'obj-contact-icon']],
        ['designer', ['obj-dribbble-logo']],
        ['developer', ['obj-github-logo']],
        ['company', ['obj-linkedin-logo', 'obj-cv-icon']],
      ];

      const itsAMatch = possibleMatches.every(([area, objIds]) => {
        const areaRect = document.querySelector<HTMLSpanElement>(`[data-tag="${area}"]`)?.getBoundingClientRect();
        if (!areaRect) {
          return false;
        }
        return objIds.some(objId => {
          const obj = allObjects.find(obj => obj.name === objId);
          return obj && isWithinDomReactArea(obj, areaRect);
        });
      });

      if (itsAMatch) {
        unlockAchievement('its-a-match');
      }
    }
  }

  /**
   * Check for the mile-high-club achievement
   */
  if (!unlockedAchievements.includes('mile-high-club')) {
    allObjects.forEach(obj => console.log(obj.name, window.innerHeight / 2 - obj.position.y, obj.position.y));
    if (allObjects.every(obj => window.innerHeight / 2 - obj.position.y < 225)) {
      unlockAchievement('mile-high-club');
    }
  }
}

/**
 * Checks if the objects are within a certain range of each other.
 */
function isInRange(
  fromObj: SPEObject,
  toObj: SPEObject,
  range: { x: { min: number; max: number }; y: { min: number; max: number } }
) {
  const x = toObj.position.x - fromObj.position.x;
  const y = toObj.position.y - fromObj.position.y;
  return x > range.x.min && x < range.x.max && y > range.y.min && y < range.y.max;
}

/**
 * Checks if the object is within the DOM area.
 */
function isWithinDomReactArea(obj: SPEObject, rect: DOMRect) {
  return (
    window.innerWidth / 2 + obj.position.x > rect.left &&
    window.innerWidth / 2 + obj.position.x < rect.right &&
    window.innerHeight / 2 - obj.position.y > rect.top &&
    window.innerHeight / 2 - obj.position.y < rect.bottom
  );
}

export type ObjectPositions = Record<string, { x: number; y: number }>;

/**
 * Returns the x and y positions of all visible objects in the scene.
 */
export function getObjectPositions(spline: SplineApp) {
  const objectPositions: ObjectPositions = {};
  spline
    .getAllObjects()
    .filter(obj => obj.name.startsWith('obj-'))
    .filter(obj => obj.visible)
    .forEach(obj => (objectPositions[obj.name] = { x: obj.position.x, y: obj.position.y }));
  return objectPositions;
}

/**
 * Compares if the positions of the objects are the same as the expected positions.
 */
export function didObjectsGetMoved(spline: SplineApp, objectPositions: ObjectPositions) {
  const currentObjectPositions = getObjectPositions(spline);
  return Object.entries(objectPositions).some(([objName, expectedPosition]) => {
    if (!currentObjectPositions[objName]) {
      // This object wasn't visible on the when the initial object positions were saved
      return false;
    }

    return (
      currentObjectPositions[objName].x !== expectedPosition.x ||
      currentObjectPositions[objName].y !== expectedPosition.y
    );
  });
}
