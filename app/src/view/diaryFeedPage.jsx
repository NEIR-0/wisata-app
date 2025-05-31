import CardDiary from "../component/cardDiary";
function DiaryFeedPage() {
    const data = [1]
    return (
      <div className={`w-full ${data?.length <= 2 ? "h-full" :  "h-fit"} flex items-start justify-center bg-white`}>
        <div className="w-[40%] flex-col h-fit flex items-start justify-center">
          <CardDiary />
          <CardDiary />
        </div>
      </div>
    );
}

export default DiaryFeedPage;