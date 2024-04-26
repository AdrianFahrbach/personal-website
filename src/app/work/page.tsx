'use client';

import { ProjectSlide } from '@/components/ProjectSlide';
import { projects } from '@/services/projects.service';

export default function Privacy() {
  return (
    <main key='work'>
      {projects.map(project => (
        <ProjectSlide key={project.headline} {...project} />
      ))}
    </main>
  );
}
