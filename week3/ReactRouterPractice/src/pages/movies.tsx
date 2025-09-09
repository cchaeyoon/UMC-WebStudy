import { useParams } from "react-router-dom";

export const MoviesPage = () => {
  // useParams는 React Router에서 현재 URL 경로에 들어있는 파라미터 값 가져오는 Hook
  const params = useParams();

  console.log(params);

  return (
    <div className="text-xl font-bold">🎥 {params.movieId}번의 Movies Page입니다.</div>
  )
}

export default MoviesPage;