import { useState, useEffect, useCallback, useRef } from 'react';
import { GitHubRepo } from '../types';

const GITHUB_USERNAME = 'Feq4n';

export const useGitHubRepos = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const readmeCache = useRef<Record<string, string | null>>({});

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
        );

        if (!response.ok) {
          throw new Error(`GitHub API isteği başarısız oldu: ${response.status}`);
        }

        const data: GitHubRepo[] = await response.json();
        const publicRepos = data.filter((repo) => !repo.fork && !repo.private);
        setRepos(publicRepos);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu');
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const fetchReadme = useCallback(async (repoName: string): Promise<string | null> => {
    if (repoName in readmeCache.current) {
      return readmeCache.current[repoName];
    }

    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`
      );

      if (!response.ok) {
        readmeCache.current[repoName] = null;
        return null;
      }

      const data = await response.json();
      // GitHub'ın base64 içeriği UTF-8 için doğrudan atob ile decode edilemeyebilir,
      // bu yüzden byte dizisine çevirip TextDecoder kullanıyoruz.
      const binary = atob(data.content.replace(/\n/g, ''));
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const decoded = new TextDecoder('utf-8').decode(bytes);

      readmeCache.current[repoName] = decoded;
      return decoded;
    } catch (err) {
      readmeCache.current[repoName] = null;
      return null;
    }
  }, []);

  return { repos, loading, error, fetchReadme };
};
