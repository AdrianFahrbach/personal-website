// Animals with attributes on 0..1 scales: size, cuteness, habitat (0 = aquatic, 1 = terrestrial)
//
// Size — a relative body-size / mass scale (continuous):
// * 0.00 = very tiny (insects, tiny fish — typically ≪ 0.1 kg)
// * ~0.10 = very small (small rodents, small birds)
// * ~0.25 = small pet / small mammal (rabbits, large parrots)
// * ~0.50 = medium (large dogs, big birds)
// * ~0.75 = large (horses, big carnivores)
// * 1.00 = very large (elephants, whales)
//
// Cuteness — subjective “aww” factor (continuous):
// * 0.00 = not cute / evokes fear or disgust for most people
// * 0.25 = low cuteness
// * 0.50 = neutral / context dependent
// * 0.75 = quite cute
// * 1.00 = extremely cute
//
// Habitat (Aquatic → Terrestrial) — continuous gradient:
// * 0.00 = fully aquatic (lives in water most/all of its life)
// * 0.25 = primarily aquatic / amphibious (spends significant time in water)
// * 0.50 = mixed / shorelines (swims but also spends lots of time on land)
// * 0.75 = mostly terrestrial but may swim occasionally
// * 1.00 = fully terrestrial (rarely or never in water)

type Animal = {
  name: string;
  size: number;
  cuteness: number;
  habitat: number;
};

export const animalProperties: { key: keyof Omit<Animal, 'name'>; label: string }[] = [
  { key: 'size', label: 'Size' },
  { key: 'cuteness', label: 'Cuteness' },
  { key: 'habitat', label: 'Habitat' },
];

export function getAnimalLabel(key: 'size' | 'cuteness' | 'habitat', value: number): string {
  if (key === 'size') {
    if (value === 0) return 'Very tiny';
    if (value === 1) return 'Very large';
    return '';
  }
  if (key === 'cuteness') {
    if (value === 0) return 'Not cute';
    if (value === 1) return 'Extremely cute';
    return '';
  }
  if (key === 'habitat') {
    if (value === 0) return 'Aquatic';
    if (value === 1) return 'Terrestrial';
    return '';
  }
  return '';
}

export function getValueLabels(key: 'size' | 'cuteness' | 'habitat') {
  if (key === 'size') {
    return [
      { threshold: 0, label: 'Very small' },
      { threshold: 0.2, label: 'Small' },
      { threshold: 0.4, label: 'Medium' },
      { threshold: 0.6, label: 'Large' },
      { threshold: 0.8, label: 'Very large' },
    ];
  }
  if (key === 'cuteness') {
    return [
      { threshold: 0, label: 'Not cute' },
      { threshold: 0.2, label: 'Low cuteness' },
      { threshold: 0.4, label: 'Neutral' },
      { threshold: 0.6, label: 'Quite cute' },
      { threshold: 0.8, label: 'Extremely cute' },
    ];
  }
  if (key === 'habitat') {
    return [
      { threshold: 0, label: 'Water only' },
      { threshold: 0.1, label: 'Mostly water' },
      { threshold: 0.4, label: 'Half water / half land' },
      { threshold: 0.6, label: 'Mostly land' },
      { threshold: 0.9, label: 'Land only' },
    ];
  }
  return [];
}

const animals = [
  { name: 'House Mouse', size: 0.02, cuteness: 0.4, habitat: 1.0 },
  { name: 'Hamster', size: 0.03, cuteness: 0.78, habitat: 1.0 },
  { name: 'Rabbit', size: 0.12, cuteness: 0.85, habitat: 0.95 },
  { name: 'Cat', size: 0.18, cuteness: 0.82, habitat: 0.95 },
  { name: 'Dog', size: 0.35, cuteness: 0.88, habitat: 0.95 },
  { name: 'Parrot', size: 0.1, cuteness: 0.66, habitat: 0.95 },
  { name: 'Sparrow', size: 0.02, cuteness: 0.55, habitat: 1.0 },
  { name: 'Horse', size: 0.8, cuteness: 0.6, habitat: 0.98 },
  { name: 'Cow', size: 0.85, cuteness: 0.5, habitat: 0.98 },
  { name: 'Elephant', size: 1.0, cuteness: 0.65, habitat: 1.0 },
  { name: 'Giraffe', size: 0.95, cuteness: 0.58, habitat: 1.0 },
  { name: 'Blue Whale', size: 1.0, cuteness: 0.4, habitat: 0.0 },
  { name: 'Dolphin', size: 0.6, cuteness: 0.8, habitat: 0.05 },
  { name: 'Great White Shark', size: 0.9, cuteness: 0.05, habitat: 0.0 },
  { name: 'Octopus', size: 0.2, cuteness: 0.35, habitat: 0.0 },
  { name: 'Goldfish', size: 0.01, cuteness: 0.55, habitat: 0.0 },
  { name: 'Clownfish', size: 0.01, cuteness: 0.6, habitat: 0.0 },
  { name: 'Penguin', size: 0.3, cuteness: 0.82, habitat: 0.2 },
  { name: 'Seal', size: 0.6, cuteness: 0.72, habitat: 0.1 },
  { name: 'Otter', size: 0.18, cuteness: 0.92, habitat: 0.15 },
  { name: 'Crocodile', size: 0.7, cuteness: 0.15, habitat: 0.1 },
  { name: 'Beaver', size: 0.25, cuteness: 0.7, habitat: 0.45 },
  { name: 'Hippopotamus', size: 0.9, cuteness: 0.35, habitat: 0.5 },
  { name: 'Turtle', size: 0.1, cuteness: 0.6, habitat: 0.5 },
  { name: 'Frog', size: 0.02, cuteness: 0.5, habitat: 0.05 },
  { name: 'Snake', size: 0.15, cuteness: 0.1, habitat: 0.85 },
  { name: 'Spider', size: 0.01, cuteness: 0.06, habitat: 1.0 },
  { name: 'Chicken', size: 0.2, cuteness: 0.42, habitat: 1.0 },
  { name: 'Duck', size: 0.25, cuteness: 0.66, habitat: 0.35 },
  { name: 'Eagle', size: 0.25, cuteness: 0.48, habitat: 1.0 },
];

export default animals;
