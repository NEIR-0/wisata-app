import { ArrowLeftIcon, ShareNetwork } from "@phosphor-icons/react";
import CardDiary from "../component/cardDiary";
import { Link } from "react-router-dom";

function DiaryContentPage () {
    return (
      <div className={`w-full h-fit flex items-start justify-center bg-white`}>
        <div className="w-[40%] flex-col h-fit flex items-start justify-center border-[1px] p-5 space-y-10">
          <Link to={"/diary"} className="text-lg font-medium text-blue-500 flex items-center justify-start space-x-2">
            <ArrowLeftIcon className="font-extrabold text-xl" />
            <p className="">Back to Posts</p>
          </Link>
          <div className="w-full flex flex-col space-y-6">
            <h1 className="text-4xl font-bold">Jurassic World: The Experience Hadir di Gardens by the Bay Singapura - Petualangan Dinosaurus Raksasa Mulai Mei 2025</h1>
            <div className="w-full flex space-x-3 items-center justify-start">
              <div className="w-10 h-10 rounded-full bg-yellow-300"></div>
              <div className="flex flex-col items-start justify-center">
                <h1 className="font-bold text-base">Wisata Diary</h1>
                <p className="font-normal text-base text-gray-300">May 31, 2025</p>
              </div>
            </div>
            <div className="w-full flex items-center justify-end border-b pb-2">
              <button className="flex items-center justify-center space-x-2 px-3 py-1 rounded-full duration-300 ease-out transition-all hover:bg-gray-100">
                  <ShareNetwork className="text-base" />
                  <p className="text-base font-light">Share</p>
              </button>
            </div>
          </div>
          <CardDiary isFeed={false} />
        </div>
      </div>
    );
}

export default DiaryContentPage ;