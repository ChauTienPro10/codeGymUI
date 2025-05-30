
import { ChallengeDto } from '../model/Challenge';
import { useFetch } from '../useFetch';

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

const SERVER_URL = window._env_?.APP_SERVER_URL;

export function useFetchChallenge(type: number) {
    const ENDPOINT = `${SERVER_URL}/challenges/type/${type}`;
    const { data, loading, error } = useFetch<ApiResponse<ChallengeDto[]>>(ENDPOINT);
    return {
        challenges: data?.data || [],
        loading,
        error,
    };
}