import styles from './ProjectStats.module.scss';

export type ProjectStatsEntry = { title: string; text: React.ReactNode };

interface ProjectStatsProps {
  entries: ProjectStatsEntry[];
  className?: string;
}

export const ProjectStats: React.FC<ProjectStatsProps> = ({ entries, className }) => {
  return (
    <div className={className}>
      {entries.map(entry => (
        <p key={entry.title} className={styles.row}>
          <span className={styles.title}>{entry.title}</span>
          <span className={styles.text}>{entry.text}</span>
        </p>
      ))}
    </div>
  );
};
