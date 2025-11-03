import { useEffect, useMemo, useState } from "react";

const STALE_TIME = 0.5 * 60 * 1_000; // 5분

// 로컬스토리지에 저장할 데이터의 구조
interface CacheEntry<T> {
  data: T;
  // lastFetched: 데이터를 마지막으로 가져온 시점의 타임스탬프
  lastFetched: number;
}

// <T>로 제네릭 타입, 외부에서 타입을 받아서 쓰겠다~
export const useCustomFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  // <boolean> 작성하지 않아도 됨. 타입 추론 됨
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // url이 달라질 때마다 값 저장된 걸 실행시켜라
  const storageKey = useMemo(() => url, [url]);

  useEffect(() => {
    setIsError(false);

    const fetchData = async () => {
      const currentTime = new Date().getTime();
      const cachedItem = localStorage.getItem(storageKey);

      // 캐시 데이터 확인, 신선도 검증
      if (cachedItem) {
        try {
          const cachedData: CacheEntry<T> = JSON.parse(cachedItem);
          // 캐시가 신선한 경우 (STALE_TIME 이내)
          if (currentTime - cachedData.lastFetched < STALE_TIME) {
            setData(cachedData.data);
            setIsPending(false);
            console.log("캐시된 데이터 사용", url);
            return;
          }
          // 캐시가 만료된 경우
          setData(cachedData.data); // 일단 기존 캐시 데이터 보여주기
          console.log("만료된 캐시 데이터 사용", url);
        } catch {
          localStorage.removeItem(storageKey);
          console.warn("캐시 에러: 캐시 삭제함", url);
        }
      }

      setIsPending(true);
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const newData = (await response.json()) as T;
        setData(newData);

        const newCacheEntry: CacheEntry<T> = {
          data: newData,
          lastFetched: new Date().getTime(), // 현재 시간을 타임스탬프로 저장
        };

        localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
  }, [url, storageKey]);

  return { data, isPending, isError };
};
