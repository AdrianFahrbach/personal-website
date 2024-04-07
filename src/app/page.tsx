import { Headline } from '@/components/Headline';
import { SplineScene } from '@/components/SplineScene';
import { preload } from 'react-dom';

export default function Home() {
  // Preload the Spline scene since we are going to execute it with a delay
  preload('/assets/scene.splinecode', { as: 'script' });

  return (
    <section>
      <SplineScene />
      <Headline
        text={[
          ['Hey!', 'I’m', { text: 'Adrian', isHighlighted: true, dataTag: 'name' }, ','],
          ['a', { text: 'designer', isHighlighted: true, dataTag: 'designer' }],
          ['and', { text: 'developer', isHighlighted: true, dataTag: 'developer' }],
          ['working', 'at', { text: 'Orcaya', isHighlighted: true, dataTag: 'company' }, '.'],
        ]}
      />
    </section>
  );
}
