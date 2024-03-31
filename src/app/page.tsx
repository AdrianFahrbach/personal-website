import Headline from '@/components/Headline';

export default function Home() {
  return (
    <main>
      <Headline
        text={[
          ['Hey!', 'I’m', { text: 'Adrian', isHighlighted: true }, ','],
          ['a', { text: 'designer', isHighlighted: true }],
          ['and', { text: 'developer', isHighlighted: true }],
          ['working', 'at', { text: 'Orcaya', isHighlighted: true }, '.'],
        ]}
      />
    </main>
  );
}
