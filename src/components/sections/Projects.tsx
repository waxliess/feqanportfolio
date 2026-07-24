import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Github } from 'lucide-react';
import { useAppStore } from '../../store';
import { useGitHubRepos } from '../../hooks/useGitHubRepos';
import ProjectCard from '../ProjectCard';

const GITHUB_USERNAME = 'Feq4n';

const ProjectSkeleton: React.FC = () => (
  <div className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-xl dark:bg-slate-800 dark:border-slate-700/60 animate-pulse">
    <div className="p-5">
      <div className="w-2/3 h-5 mb-3 bg-gray-200 rounded dark:bg-slate-700" />
      <div className="w-full h-3 mb-2 bg-gray-200 rounded dark:bg-slate-700" />
      <div className="w-5/6 h-3 mb-4 bg-gray-200 rounded dark:bg-slate-700" />
      <div className="flex gap-2 mb-4">
        <div className="w-16 h-5 bg-gray-200 rounded-full dark:bg-slate-700" />
        <div className="w-16 h-5 bg-gray-200 rounded-full dark:bg-slate-700" />
      </div>
      <div className="w-24 h-4 bg-gray-200 rounded dark:bg-slate-700" />
    </div>
  </div>
);

const Projects: React.FC = () => {
  const setActiveSection = useAppStore((state) => state.setActiveSection);
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>('all');
  const { repos, loading, error, fetchReadme } = useGitHubRepos();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('projects');
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [setActiveSection]);

  const allLanguages = useMemo(
    () => [...new Set(repos.map((repo) => repo.language).filter((lang): lang is string => Boolean(lang)))],
    [repos]
  );

  const filteredRepos = filter === 'all' ? repos : repos.filter((repo) => repo.language === filter);

  return (
    <section id="projects" ref={containerRef} className="py-20 bg-gray-50 dark:bg-slate-900/50">
      <div className="container px-4 mx-auto">
        <motion.div
          className="max-w-3xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">Projeler</h2>
          <div className="w-20 h-1 mx-auto mb-6 bg-blue-600 rounded-full" />
          <p className="text-lg text-gray-700 dark:text-gray-300">
            GitHub'daki{' '}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
              data-hover
            >
              @{GITHUB_USERNAME}
            </a>{' '}
            hesabımdan canlı olarak çekilen açık kaynak projelerim.
          </p>
        </motion.div>

        {!loading && !error && allLanguages.length > 0 && (
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              data-hover
            >
              Tümü
            </motion.button>

            {allLanguages.map((lang) => (
              <motion.button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === lang
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                data-hover
              >
                {lang}
              </motion.button>
            ))}
          </motion.div>
        )}

        {loading && (
          <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center max-w-lg gap-3 py-16 mx-auto text-center text-gray-500 dark:text-gray-400">
            <AlertCircle size={32} className="text-red-500" />
            <p>Projeler yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.</p>
            <a
              href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
              data-hover
            >
              <Github size={16} />
              GitHub profilini görüntüle
            </a>
          </div>
        )}

        {!loading && !error && filteredRepos.length === 0 && (
          <p className="py-16 text-center text-gray-500 dark:text-gray-400">
            Bu kategoride herhangi bir proje bulunamadı.
          </p>
        )}

        {!loading && !error && filteredRepos.length > 0 && (
          <motion.div
            className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {filteredRepos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} fetchReadme={fetchReadme} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
