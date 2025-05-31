import { Link } from "react-router-dom";
import ShareBtn from "./shareBtn";

function CardDiary({data}) {
    return (
       <>
        <div className="flex items-start justify-center space-x-3 md:space-x-5 p-5 border-x-[1px] border-b-[1px]">
            <div className="h-full">
                <div className="w-7 h-7 md:h-10 md:w-10 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="profiles" className="w-full h-full object-center" />
                </div>
            </div>
            <div className="flex-1 flex-col space-y-2">
                <h1 className="font-medium text-base">Wisata Diary <span className="font-normal text-gray-300">· May 31, 2025</span></h1>
                <Link to={"/diary/" + data?.id}>
                    <div className="flex-1 h-fit rounded-lg shadow-sm overflow-hidden border-[1px]">
                        <img src={data?.optimizedImage} alt="img_diary" className="w-full h-[180px] md:h-[250px] object-cover" />
                        <div className="p-3 w-full space-y-2">
                            <h1 className="font-bold text-base w-full break-words overflow-wrap break-all">{data?.seo?.title}</h1>
                            <p className="w-full font-light text-base break-words overflow-wrap break-all">{data?.seo?.description}</p>
                            {data?.seo?.slug.length > 0 && (
                                <p className="w-full font-light text-xs break-words overflow-wrap break-all text-blue-400">
                                    #{data?.seo?.slug.join(" #")}
                                </p>
                            )}
                        </div>
                    </div>
                </Link>
                <div className="w-full flex items-start justify-end mt-2">
                    <ShareBtn />
                </div>
            </div>
        </div>
       </>
    );
}

export default CardDiary;