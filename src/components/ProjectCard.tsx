import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork, ChevronDown, Loader2 } from 'lucide-react';
import { GitHubRepo } from '../types';
import { parseMarkdown } from '../utils/markdown';

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#239120',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Vue: '#41b883',
  Shell: '#89e051',
  Dart: '#00B4AB',
};

interface ProjectCardProps {
  repo: GitHubRepo;
  fetchReadme: (repoName: string) => Promise<string | null>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ repo, fetchReadme }) => {
  const [open, setOpen] = useState(false);
  const [readmeHtml, setReadmeHtml] = useState<string | null>(null);
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [readmeLoaded, setReadmeLoaded] = useState(false);

  const handleToggle = async () => {
    if (open) {
      setOpen(false);
      return;
    }

    setOpen(true);

    if (!readmeLoaded) {
      setReadmeLoading(true);
      const raw = await fetchReadme(repo.name);
      setReadmeHtml(raw ? parseMarkdown(raw) : null);
      setReadmeLoading(false);
      setReadmeLoaded(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col overflow-hidden transition-shadow duration-300 bg-white border border-gray-200 shadow-lg group rounded-xl hover:shadow-xl dark:bg-slate-800 dark:border-slate-700/60"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-gray-900 break-words dark:text-white">
            {repo.name}
          </h3>
          <div className="flex items-center flex-shrink-0 gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Star size={14} />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork size={14} />
              {repo.forks_count}
            </span>
          </div>
        </div>

        <p className="mt-2 mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-3 min-h-[3.75rem]">
          {repo.description || 'Bu proje için bir açıklama girilmemiş.'}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {repo.language && (
            <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: languageColors[repo.language] || '#8b8b8b' }}
              />
              {repo.language}
            </span>
          )}
          {repo.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 text-xs font-medium text-gray-600 rounded-full bg-gray-100 dark:bg-slate-700 dark:text-gray-300"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center space-x-4">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            data-hover
          >
            <Github size={16} className="mr-1" />
            <span>Kod</span>
          </a>

          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              data-hover
            >
              <ExternalLink size={16} className="mr-1" />
              <span>Canlı Demo</span>
            </a>
          )}

          <button
            type="button"
            onClick={handleToggle}
            className="flex items-center ml-auto text-sm font-medium text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            data-hover
          >
            <span>{open ? 'Gizle' : 'Detaylar'}</span>
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="ml-1">
              <ChevronDown size={16} />
            </motion.span>
          </button>
        </div>
      </div>

      {/* README */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-gray-200 dark:border-slate-700/60"
          >
            <div className="max-h-80 overflow-y-auto p-5 text-sm text-gray-700 dark:text-gray-300 readme-content">
              {readmeLoading && (
                <div className="flex items-center gap-2 py-4 text-gray-500 dark:text-gray-400">
                  <Loader2 size={16} className="animate-spin" />
                  <span>README yükleniyor...</span>
                </div>
              )}
              {!readmeLoading && readmeHtml && (
                <div dangerouslySetInnerHTML={{ __html: readmeHtml }} />
              )}
              {!readmeLoading && !readmeHtml && (
                <p className="text-gray-500 dark:text-gray-400">
                  Bu proje için bir README.md dosyası bulunamadı.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectCard;
