
import { ShareNetwork } from "@phosphor-icons/react";
import { truncateText } from "../../helper/globalFunction";
import { Link } from "react-router-dom";

function CardDiary({isFeed = true}) {
    return (
       <>
        {isFeed ? (
            <div className="flex items-start justify-center space-x-5 p-5 border-x-[1px] border-b-[1px]">
                <div className="h-full">
                    <div className="h-10 w-10 rounded-full bg-yellow-300"></div>
                </div>
                <div className="flex-1 flex-col space-y-2">
                    <h1 className="font-medium text-base">Wisata Diary <span className="font-normal text-gray-300">· May 31, 2025</span></h1>
                    <Link to={"/diary/1"}>
                        <div className="flex-1 h-fit rounded-lg shadow-sm overflow-hidden border-[1px]">
                            <img src="https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="post" className="w-full h-[250px] object-cover" />
                            <div className="p-3 space-y-2">
                                <h1 className="font-medium text-base">Museum Gratis di Tokyo yang Wajib Dikunjungi: Seru dan Edukatif</h1>
                                <p className="w-full">{truncateText("Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, repellat.aasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdadaasdad")}
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex items-start justify-end">
                            <button className="flex items-center justify-center space-x-2 px-3 py-1 rounded-full duration-300 ease-out transition-all hover:bg-gray-100">
                                <ShareNetwork className="text-base" />
                                <p className="text-base font-light">Share</p>
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        ):(
            <div className="flex items-start justify-center space-x-5 p-5">
                <p className="w-full text-justify flex-wrap">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
        )}
       </>
    );
}

export default CardDiary;