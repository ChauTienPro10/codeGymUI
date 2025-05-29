import { useFetch } from '../useFetch';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export function useLoginByGithub() {
  const loginByGithub = () => {
    const GITHUB_AUTH_URL = `${SERVER_URL}/oauth/github/authorize`;
    window.location.href = GITHUB_AUTH_URL;
  };

  return { loginByGithub };
}

export function useLoginGoogle() {
  const loginByGoogle = () => {
    const GOOGLE_AUTH_URL = `${SERVER_URL}/oauth/google/authorize`;
    window.location.href = GOOGLE_AUTH_URL;
  };

  return { loginByGoogle };
}