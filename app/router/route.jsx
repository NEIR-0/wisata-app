import { createBrowserRouter } from "react-router-dom";
import WildCard from "../src/view/wildCard";
import Layout from "../src/view/layout";
import DiaryFeedPage from "../src/view/diaryFeedPage";
import DiaryContentPage from "../src/view/diaryContentPage ";

const publicRoutes = [
    { path: "/", element: <DiaryFeedPage /> },
    { path: "detail/:id", element: <DiaryContentPage /> },
];

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            ...publicRoutes,
            { path: "*", element: <WildCard /> },
        ],
    },
]);

export default router;
