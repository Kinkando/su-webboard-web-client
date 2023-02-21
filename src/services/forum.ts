import type { Home } from "@models/home";

export async function getHomeData(): Promise<Home> {
    const authorImageURL = "https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745";
    const home: Home = {
        announcements: [
            {
                forumUUID: "",
                authorUUID: "",
                authorName: "Silpakorn University",
                authorImageURL,
                createdAt: new Date(),
                title: "Class 1 move to room 2",
                description: "Description...",
            },
            {
                forumUUID: "",
                authorUUID: "",
                authorName: "Silpakorn University",
                authorImageURL,
                createdAt: new Date(),
                title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum amet assumenda quaerat in corrupti ea ipsum nostrum quod explicabo non.",
                description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum dolorem illum laudantium voluptatem hic accusantium placeat minus cum eius eveniet dicta pariatur quos aspernatur aliquam asperiores voluptas iste aut maxime quo neque ipsa dolorum, expedita deserunt. Voluptates magni qui repudiandae odio aperiam voluptatibus nisi itaque dolores aliquam? Qui, rem nam!",
            },
            {
                forumUUID: "",
                authorUUID: "",
                authorName: "Silpakorn University",
                authorImageURL,
                createdAt: new Date(),
                title: "Class 1 move to room 2",
                description: "Description...",
            },
        ],
        popularTopics: [
            {
                forumUUID: "",
                authorUUID: "",
                authorName: "Kook Kai",
                authorImageURL,
                createdAt: new Date(),
                forumImageURL: "https://media.timeout.com/images/103662433/750/422/image.jpg",
                title: "How to live a fun life.",
                categories: [
                    {
                        categorySeq: 1,
                        categoryUUID: "",
                        categoryName: "Lifestyle",
                        categoryHexColor: "#123456",
                    },
                ],
                commentCount: 300,
                likeCount: 200,
            },
            {
                forumUUID: "",
                authorUUID: "",
                authorName: "Kook Kai",
                authorImageURL,
                createdAt: new Date(),
                forumImageURL: "https://static.thcdn.com/productimg/1600/1600/12968604-2055002146053883.jpg",
                title: "Why protien is the better than you expected?",
                categories: [
                    {
                        categorySeq: 1,
                        categoryUUID: "",
                        categoryName: "Sport",
                        categoryHexColor: "#123456",
                    },
                    {
                        categorySeq: 2,
                        categoryUUID: "",
                        categoryName: "Food",
                        categoryHexColor: "#123456",
                    },
                ],
                commentCount: 300,
                likeCount: 200,
            },
            {
                forumUUID: "",
                authorUUID: "",
                authorName: "Kook Kai",
                authorImageURL,
                createdAt: new Date(),
                title: "Python vs C: 10 Key Differences You Need To Know.",
                categories: [
                    {
                        categorySeq: 1,
                        categoryUUID: "",
                        categoryName: "Education",
                        categoryHexColor: "#123456",
                    },
                    {
                        categorySeq: 2,
                        categoryUUID: "",
                        categoryName: "Coding",
                        categoryHexColor: "#123456",
                    },
                ],
                commentCount: 300,
                likeCount: 200,
            },
        ],
        categories: [
            {
                categorySeq: 1,
                categoryUUID: "",
                categoryName: "Lifestyle",
                categoryHexColor: "#123456",
                forumCount: 123,
                latestUpdatedDate: new Date(),
            },
            {
                categorySeq: 2,
                categoryUUID: "",
                categoryName: "Sport",
                categoryHexColor: "#123456",
                forumCount: 456,
                latestUpdatedDate: new Date(),
            },
            {
                categorySeq: 3,
                categoryUUID: "",
                categoryName: "Food",
                categoryHexColor: "#123456",
                forumCount: 789,
                latestUpdatedDate: new Date(),
            },
            {
                categorySeq: 4,
                categoryUUID: "",
                categoryName: "Education",
                categoryHexColor: "#123456",
                forumCount: 159,
                latestUpdatedDate: new Date(),
            },
            {
                categorySeq: 5,
                categoryUUID: "",
                categoryName: "Coding",
                categoryHexColor: "#123456",
                forumCount: 357,
                latestUpdatedDate: new Date(),
            },
        ],
    }
    await new Promise(resolve => setTimeout(() => resolve(""), 500))
    return home
}