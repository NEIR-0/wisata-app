import { useEffect, useState } from "react";
import CardDiary from "../component/cardDiary";
import { getDiaryFeed } from "../../../api/cms";
import Loading from "../component/loading";

function DiaryFeedPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await getDiaryFeed();
        setData(response);
      } catch (error) {
        console.error("Error fetching diary feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiary();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[70vh] bg-white w-full">
          <div className="w-12 h-12">
            <Loading />
          </div>
        </div>
      ) : (
      <div className={`w-full ${data?.length <= 2 ? "h-full" : "h-fit"} flex items-start justify-center bg-white`}>
        <div className="w-[40%] flex-col h-fit flex items-start justify-center">
          {data?.content?.map((item, index) => (
            <CardDiary key={index} data={item} />
          ))}
        </div>
      </div>
      )}
    </>
  );
}

export default DiaryFeedPage;
