import { useEffect, useState } from "react";

export default function UseEffectPage() {
    const [count, setCount] = useState(0);

    const handleIncrease = () => {
        setCount((prev) => prev + 1);
        console.log('setState', count);
    };

    useEffect(() => {
        // 실행하고 싶은 코드
        console.log(count); // 화면이 업데이트 된 이후에 최신값이 찍힘

        // (optional) return function
        // cleanup function
        return () => {
            console.log('청소하는 함수입니다.');
        };

        // 의존성 배열 (denpendency array)
        
        // useEffect는 렌더링 직후 실행된다.
        // 실행 여부는 의존성 배열에 있는 값들이 지난 렌더링 때와 비교해 바뀌었는지에 따라 달라진다.
    }, [count]);

    return (
        <div>
            <h3>UseEffectPage</h3>
            <h1>{count}</h1>
            <button onClick={handleIncrease}>증가</button>
        </div>
    );
}