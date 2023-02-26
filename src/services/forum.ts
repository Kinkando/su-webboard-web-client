import type { Announcement } from "@models/announcement";
import type { Forum, ForumFilter } from "@models/forum";
import type { Home } from "@models/home";
import { getCategoryByID } from "./category";

const authorImageURL = "https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745";

export async function getHomeData(): Promise<Home> {
    const home: Home = {
        announcements: [
            {
                forumUUID: "xxx-xxx-xxx-xxx",
                authorUUID: "",
                authorName: "Silpakorn University",
                authorImageURL,
                createdAt: new Date(),
                title: "เอิ่ม อิ่มโลลิค่อน",
                description: "อิ่มชอบกินเด็กครับ...",
            },
            {
                forumUUID: "yyy-yyy-yyy-yyy",
                authorUUID: "",
                authorName: "Silpakorn University",
                authorImageURL,
                createdAt: new Date(),
                title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum amet assumenda quaerat in corrupti ea ipsum nostrum quod explicabo non.",
                description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum dolorem illum laudantium voluptatem hic accusantium placeat minus cum eius eveniet dicta pariatur quos aspernatur aliquam asperiores voluptas iste aut maxime quo neque ipsa dolorum, expedita deserunt. Voluptates magni qui repudiandae odio aperiam voluptatibus nisi itaque dolores aliquam? Qui, rem nam!",
            },
            {
                forumUUID: "zzz-zzz-zzz-zzz",
                authorUUID: "",
                authorName: "Silpakorn University",
                authorImageURL,
                createdAt: new Date(),
                title: "ห้องหนึ่งย้ายไปเรียนที่ห้องสอง",
                description: "รายละเอียด...",
            },
            {
                forumUUID: "zzz-zzz-zzz-zzz",
                authorUUID: "",
                authorName: "Silpakorn University",
                authorImageURL,
                createdAt: new Date(),
                title: "ห้องสองย้ายไปห้องสาม",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit aspernatur quod voluptatum quidem atque cupiditate amet in quibusdam inventore! Doloremque.",
            },
            {
                forumUUID: "zzz-zzz-zzz-zzz",
                authorUUID: "",
                authorName: "Silpakorn University",
                authorImageURL,
                createdAt: new Date(),
                title: "Class 3 move to room 4",
                description: "Description...",
            },
        ],
        popularTopics: [
            {
                forumUUID: "xxx-xxx-xxx-xxx",
                authorUUID: "",
                authorName: "Kook Kai",
                authorImageURL,
                createdAt: new Date(),
                forumImageURL: "https://media.timeout.com/images/103662433/750/422/image.jpg",
                title: "ใช้ชีวิตยังไงให้สนุก",
                categories: [
                    {
                        categorySeq: 1,
                        categoryID: 1,
                        categoryName: "ชีวิตประจำวัน",
                        categoryHexColor: "#86D97F",
                    },
                ],
                commentCount: 300,
                likeCount: 200,
            },
            {
                forumUUID: "yyy-yyy-yyy-yyy",
                authorUUID: "",
                authorName: "Kook Kai",
                authorImageURL,
                createdAt: new Date(),
                forumImageURL: "https://static.thcdn.com/productimg/1600/1600/12968604-2055002146053883.jpg",
                title: "ทำไมโปรตีนถึงดีกว่าที่คุณคิด?",
                categories: [
                    {
                        categorySeq: 1,
                        categoryID: 2,
                        categoryName: "กีฬา",
                        categoryHexColor: "#4C52E0",
                    },
                    {
                        categorySeq: 2,
                        categoryID: 3,
                        categoryName: "อาหาร",
                        categoryHexColor: "#857800",
                    },
                ],
                commentCount: 300,
                likeCount: 200,
            },
            {
                forumUUID: "zzz-zzz-zzz-zzz",
                authorUUID: "",
                authorName: "Kook Kai",
                authorImageURL,
                createdAt: new Date(),
                title: "Python vs C: 10 หลักความแตกต่างที่คุณต้องรู้",
                categories: [
                    {
                        categorySeq: 1,
                        categoryID: 4,
                        categoryName: "การศึกษา",
                        categoryHexColor: "#E04C6F",
                    },
                    {
                        categorySeq: 2,
                        categoryID: 5,
                        categoryName: "โปรแกรมมิ่ง",
                        categoryHexColor: "#48D7E0",
                    },
                ],
                commentCount: 300,
                likeCount: 200,
            },
            {
                forumUUID: "zzz-zzz-zzz-zzz",
                authorUUID: "",
                authorName: "Kook Kai Karichaimashita",
                authorImageURL,
                createdAt: new Date(),
                title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt maiores dolor suscipit laudantium error aperiam quo fuga ratione rem ut.",
                categories: [
                    {
                        categorySeq: 1,
                        categoryID: 4,
                        categoryName: "การศึกษา",
                        categoryHexColor: "#E04C6F",
                    },
                    {
                        categorySeq: 2,
                        categoryID: 5,
                        categoryName: "โปรแกรมมิ่ง",
                        categoryHexColor: "#48D7E0",
                    },
                    {
                        categorySeq: 3,
                        categoryID: 2,
                        categoryName: "กีฬา",
                        categoryHexColor: "#4C52E0",
                    },
                    {
                        categorySeq: 4,
                        categoryID: 3,
                        categoryName: "อาหาร",
                        categoryHexColor: "#857800",
                    },
                    {
                        categorySeq: 5,
                        categoryID: 6,
                        categoryName: "เกม",
                        categoryHexColor: "#994a",
                    },
                    {
                        categorySeq: 6,
                        categoryID: 7,
                        categoryName: "การทำงาน",
                        categoryHexColor: "#abcd",
                    },
                    {
                        categorySeq: 7,
                        categoryID: 8,
                        categoryName: "การท่องเที่ยว",
                        categoryHexColor: "#1296",
                    },
                    {
                        categorySeq: 8,
                        categoryID: 9,
                        categoryName: "การทำอาหาร",
                        categoryHexColor: "#4685",
                    },
                ],
                commentCount: 300,
                likeCount: 200,
            },
            {
                forumUUID: "zzz-zzz-zzz-zzz",
                authorUUID: "",
                authorName: "Kook Kai",
                authorImageURL,
                createdAt: new Date(),
                title: "ทดสอบกระทู้ยอดนิยมอันดับที่ 5",
                categories: [
                    {
                        categorySeq: 1,
                        categoryID: 4,
                        categoryName: "การศึกษา",
                        categoryHexColor: "#E04C6F",
                    },
                    {
                        categorySeq: 2,
                        categoryID: 5,
                        categoryName: "โปรแกรมมิ่ง",
                        categoryHexColor: "#48D7E0",
                    },
                ],
                commentCount: 300,
                likeCount: 200,
            },
        ],
        categories: [
            {
                categoryID: 1,
                categoryName: "ชีวิตประจำวัน",
                categoryHexColor: "#86D97F",
                forumCount: 123,
                latestUpdatedDate: new Date(),
            },
            {
                categoryID: 2,
                categoryName: "กีฬา",
                categoryHexColor: "#4C52E0",
                forumCount: 456,
                latestUpdatedDate: new Date(),
            },
            {
                categoryID: 3,
                categoryName: "อาหาร",
                categoryHexColor: "#857800",
                forumCount: 789,
                latestUpdatedDate: new Date(),
            },
            {
                categoryID: 4,
                categoryName: "การศึกษา",
                categoryHexColor: "#E04C6F",
                forumCount: 159,
                latestUpdatedDate: new Date(),
            },
            {
                categoryID: 5,
                categoryName: "โปรแกรมมิ่ง",
                categoryHexColor: "#48D7E0",
                forumCount: 357,
                latestUpdatedDate: new Date(),
            },
            {
                categoryID: 6,
                categoryName: "เกม",
                categoryHexColor: "#994a",
                forumCount: 321,
                latestUpdatedDate: new Date(),
            },
            {
                categoryID: 7,
                categoryName: "การทำงาน",
                categoryHexColor: "#abcd",
                forumCount: 612,
                latestUpdatedDate: new Date(),
            },
            {
                categoryID: 8,
                categoryName: "การท่องเที่ยว",
                categoryHexColor: "#1296",
                forumCount: 253,
                latestUpdatedDate: new Date(),
            },
            {
                categoryID: 9,
                categoryName: "การทำอาหาร",
                categoryHexColor: "#4685",
                forumCount: 999,
                latestUpdatedDate: new Date(),
            },
            {
                categoryID: 10,
                categoryName: "การอ่าน",
                categoryHexColor: "#a9ff",
                forumCount: 111,
                latestUpdatedDate: new Date(),
            },
        ],
    }
    await new Promise(resolve => setTimeout(() => resolve(""), 500))
    return home
}

export async function getForumListByCategoryID(categoryID: number, offset: number, limit: number) {
    const data: Forum[] = [];
    const total = 97;

    const category = await getCategoryByID(categoryID)
    if (!category) {
        return { data, total: 0 }
    }

    const category1 = await getCategoryByID(1)
    const category2 = await getCategoryByID(2)

    const forum: Forum = {
        forumUUID: "xxx-xxx-xxx-xxx",
        title: "Python vs C: 10 หลักความแตกต่างที่คุณต้องรู้",
        authorUUID: "yyy-yyy-yyy-yyy",
        authorName: "Kook Kai",
        authorImageURL,
        categories: [ category1!, category2! ],
        commentCount: 78,
        likeCount: 3999,
        createdAt: new Date(),
    }

    for(let i=offset; i<Math.min(total, offset+limit); i++) {
        data.push(forum)
    }

    return { data, total }
}

export async function getForumListByPopular(offset: number, limit: number) {
    const data: Forum[] = [];
    const total = 97;

    const category1 = await getCategoryByID(1)
    const category2 = await getCategoryByID(2)

    const forum: Forum = {
        forumUUID: "xxx-xxx-xxx-xxx",
        title: "Python vs C: 10 หลักความแตกต่างที่คุณต้องรู้",
        authorUUID: "yyy-yyy-yyy-yyy",
        authorName: "Kook Kai",
        authorImageURL,
        categories: [ category1!, category2! ],
        commentCount: 78,
        likeCount: 3999,
        createdAt: new Date(),
    }

    for(let i=offset; i<Math.min(total, offset+limit); i++) {
        const f = {...forum}
        f.ranking = i+1
        data.push(f)
    }

    return { data, total }
}

export async function searchForum(filter: ForumFilter, offset: number, limit: number) {
    const data: Forum[] = [];
    const total = 97;

    const category1 = await getCategoryByID(1)
    const category2 = await getCategoryByID(2)

    const forum: Forum = {
        forumUUID: "xxx-xxx-xxx-xxx",
        title: "ค้นหากระทู้อยู่ล่ะสิ หึๆ แต่ไม่เจอหรอก เอาไปซะ กระทู้ทิพย์",
        authorUUID: "yyy-yyy-yyy-yyy",
        authorName: "Kook Kai",
        authorImageURL,
        categories: [ category1!, category2! ],
        commentCount: 123,
        likeCount: 9999,
        createdAt: new Date(),
    }

    for(let i=offset; i<Math.min(total, offset+limit); i++) {
        data.push(forum)
    }

    return { data, total }
}

export async function getAnnouncements(offset: number, limit: number) {
    const data: Announcement[] = [];
    const total = 24;

    const announcement: Announcement = {
        forumUUID: "xxx-xxx-xxx-xxx",
        title: "การลงทะเบียนเพิ่มถอนภาคเรียนที่ 2 ปีการศึกษา 2565",
        authorUUID: "yyy-yyy-yyy-yyy",
        authorName: "มหาวิทยาลัยศิลปากร",
        authorImageURL,
        createdAt: new Date(),
    }

    for(let i=offset; i<Math.min(total, offset+limit); i++) {
        data.push(announcement)
    }

    return { data, total }
}