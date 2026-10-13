import { QueryClient, environmentManager } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (environmentManager.isServer()) {
    // 서버: 요청 간 캐시 공유를 막기 위해 항상 새 클라이언트 생성
    return makeQueryClient();
  }
  // 브라우저: React가 초기 렌더 중 suspend 되어도 클라이언트를 다시 만들지 않도록 재사용
  return (browserQueryClient ??= makeQueryClient());
}
