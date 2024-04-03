import { Header } from '@/components/Header';
import { Headline } from '@/components/Headline';
import { SplineScene } from '@/components/SplineScene';

export default function Home() {
  return (
    <main>
      <section>
        <SplineScene />
        <Headline
          text={[
            ['Hey!', 'I’m', { text: 'Adrian', isHighlighted: true }, ','],
            ['a', { text: 'designer', isHighlighted: true }],
            ['and', { text: 'developer', isHighlighted: true }],
            ['working', 'at', { text: 'Orcaya', isHighlighted: true }, '.'],
          ]}
        />
      </section>
    </main>
  );
}
