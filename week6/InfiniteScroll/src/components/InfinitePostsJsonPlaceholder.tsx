import { useInfiniteQuery } from "@tanstack/react-query";

// 데이터 인터페이스 정의
interface Post {
  id: number;
  title: string;
  body: string;
}

// 한 번에 가져올 게시글 개수
const PAGE_SIZE = 10;

// 데이터 가져오는 함수
// pageParam: 현재 페이지 번호 (1, 2, 3, ...)
async function fetchPosts({ pageParam = 1 }: { pageParam?: number }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${PAGE_SIZE}`
  );

  if (!res.ok) {
    throw new Error("네트워크 에러");
  }

  return (await res.json()) as Post[];
}

// 메인 컴포넌트
export default function InfinitePostsJsonPlaceholder() {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", PAGE_SIZE],
    queryFn: ({ pageParam }) => fetchPosts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지의 데이터가 PAGE_SIZE보다 작으면 끝
      const isLast = lastPage.length < PAGE_SIZE;
      return isLast ? undefined : allPages.length + 1;
    },
  });

  if (isLoading) {
    return <div>로딩 중..</div>;
  }

  if (error) {
    return <div>에러 발생. {error.message}</div>;
  }

  return (
    <div>
      {data?.pages.map((page, pageIndex) => (
        <ul key={pageIndex} style={{ marginBottom: 16 }}>
          {page.map((post) => (
            <li key={post.id}>
              <strong>#{post.id}</strong> {post.title}
            </li>
          ))}
        </ul>
      ))}

      {/* 더보기 버튼 */}
      <div>
        {hasNextPage ? (
          <button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? "불러오는 중 ..." : "더보기"}
          </button>
        ) : (
          <span>마지막 페이지입니다.</span>
        )}
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: "#555" }}>
        상태 : {status} / 다음 페이지 가능: {String(!!hasNextPage)}
      </div>
    </div>
  );
}
