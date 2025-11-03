import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

const PAGE_SIZE = 10;

async function fetchPosts({ pageParam = 1 }: { pageParam?: number }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${PAGE_SIZE}`
  );

  if (!res.ok) {
    throw new Error("네트워크 에러");
  }

  return (await res.json()) as Post[];
}

export default function InfinitePostsAutoJsonPlaceholder() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", PAGE_SIZE],
      queryFn: ({ pageParam }) => fetchPosts({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        // 마지막 페이지의 데이터가 PAGE_SIZE보다 작으면 끝
        const isLast = lastPage.length < PAGE_SIZE;
        return isLast ? undefined : allPages.length + 1;
      },
    });

  // useRef는 특정 DOM 요소를 직접 접근할 때 사용한다.
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 센티널 요소가 없으면 아무것도 안 함
    if (!sentinelRef.current) return;

    const el = sentinelRef.current;

    const observer = new IntersectionObserver((entries) => {
      // entries[0]: 관찰 중인 요소의 상태
      const first = entries[0];

      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    observer.observe(el);
    // 컴포넌트가 언마운트되면 관찰 중지
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  // 의존성 배열: 이 값이 바뀌면 useEffect가 다시 실행된다.

  return (
    <div>
      {/* 데이터 표시 */}
      {data?.pages.map((page, idx) => (
        <ul key={idx} style={{ marginBottom: 16 }}>
          {page.map((post) => (
            <li key={post.id}>
              <strong>#{post.id}</strong> {post.title}
            </li>
          ))}
        </ul>
      ))}

      {/* 7. 센티널 요소 (스크롤 감지용) */}
      {/*    높이 1px의 보이지 않는 div */}
      <div ref={sentinelRef} style={{ height: 1 }} />

      {/* 8. 상태 메시지 */}
      <div style={{ padding: 8, textAlign: "center", color: "#666" }}>
        {isFetchingNextPage
          ? "불러오는 중이에요..."
          : hasNextPage
          ? "아래로 스크롤하면 더 가져와요."
          : "더 이상 데이터가 없어요."}
      </div>
    </div>
  );
}
