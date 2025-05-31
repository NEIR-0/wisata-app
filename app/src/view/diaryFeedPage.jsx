import { useEffect, useState } from "react";
import CardDiary from "../component/cardDiary";
import { getDiaryFeed } from "../../../api/cms";
import Loading from "../component/loading";
import { getDiaryContentSEOAttributes, getSizeOptimizedImageUrl } from "../../../utils/cms";

function DiaryFeedPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await getDiaryFeed();
        const enhancedContent = response?.content.map((item) => {
          const seo = getDiaryContentSEOAttributes(item);
          const optimizedImage = getSizeOptimizedImageUrl(seo?.image, "md");
          return {
            id: item?.id,
            seo,
            optimizedImage,
          };
        });
        setData(enhancedContent);  
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
        <div className="w-full md:w-[60%] lg:w-[40%] flex-col h-fit flex items-start justify-center">
          {data?.map((item, index) => (
            <CardDiary key={index} data={item} />
          ))}
        </div>
      </div>
      )}
    </>
  );
}

export default DiaryFeedPage;
