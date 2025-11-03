import "./App.css";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { useCustomFetch } from "./hooks/useCustomFetch";

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const { data, isPending, isError } = useCustomFetch<User>(
    "https://jsonplaceholder.typicode.com/users/1"
  );
  console.log(isPending);

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>에러</div>;
  }

  return (
    <>
      <h1>Tanstack Query</h1>
      {/* JSON.stringify()는 자바스크립트 객체를 JSON 형태로 변환해주는 함수다. */}
      {/* {JSON.stringify(data)} */}
      {data?.name}
    </>
  );
}

export default App;
