import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import InfinitePostsAutoJsonPlaceholder from "./components/InfinitePostsAutoJsonPlaceholder";

// QueryClient 인스턴스 생성
// 이게 모든 쿼리 상태 관리함
const queryClient = new QueryClient();

const App = () => {
  return (
    // Provider로 앱을 감싸면 하위 컴포넌트에서 React Query 사용 가능
    <QueryClientProvider client={queryClient}>
      <InfinitePostsAutoJsonPlaceholder />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default App;
