import { ArrowLeftIcon } from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../component/loading";
import { getDiaryContentById } from "../../../api/cms";
import { getDiaryContentSEOAttributes, getSizeOptimizedImageUrl, renderDiaryContent } from "../../../utils/cms";
import DiaryContentRenderer from "../component/diaryContentRenderer";
import ShareBtn from "../component/shareBtn";

function DiaryContentPage () {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaryById = async (id) => {
      try {
        const response = await getDiaryContentById(id);
        const enhancedContent = response?.content.map((item) => {
          const seo = getDiaryContentSEOAttributes(item);
          const optimizedImage = getSizeOptimizedImageUrl(seo?.image, "md");
          return {
            id: item?.id,
            seo,
            optimizedImage,
            content: item?.content
          };
        });
        setData(enhancedContent[0]);
      } catch (error) {
        console.error("Error fetching diary feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaryById(id);
  }, [id]);
  return (
    <>
     {loading ? (
        <div className="flex items-center justify-center h-[70vh] bg-white w-full">
          <div className="w-12 h-12">
            <Loading />
          </div>
        </div>
      ) : (
        <div className={`w-full h-fit flex items-start justify-center bg-white`}>
          <div className="w-full md:w-[60%] lg:w-[40%] flex-col h-fit flex items-start justify-center border-[1px] p-5 space-y-10">
            <Link to={"/diary"} className="text-lg font-medium text-blue-500 flex items-center justify-start space-x-2">
              <ArrowLeftIcon className="font-extrabold text-xl" />
              <p className="">Back to Posts</p>
            </Link>
            <div className="w-full flex flex-col space-y-6">
              <h1 className="text-4xl font-bold">{data?.seo?.title}</h1>
              <div className="">
                <div className="w-full flex space-x-3 items-center justify-start">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="profiles" className="w-full h-full object-center" />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <h1 className="font-bold text-base">Wisata Diary</h1>
                    <p className="font-normal text-base text-gray-300">May 31, 2025</p>
                  </div>
                </div>
                <div className="w-full flex items-center justify-end border-b pb-2">
                  <ShareBtn />
                </div>
              </div>
            </div>
            <div className="w-full">
              <DiaryContentRenderer content={data?.content} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DiaryContentPage ;