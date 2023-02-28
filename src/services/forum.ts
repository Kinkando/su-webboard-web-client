import type { Announcement } from "@models/announcement";
import type { Comment, Forum, ForumDetail, ForumFilter } from "@models/forum";
import type { Home } from "@models/home";
import { getAllCategoryDetails, getCategoryByID } from "./category";

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
        categories: await getAllCategoryDetails(),
    }
    await sleep()
    return home
}

export async function getForumListByCategoryID(categoryID: number, offset: number, limit: number) {
    const data: Forum[] = [];
    const total = 97;

    const category = await getCategoryByID(categoryID)
    if (!category) {
        return { data, total: 0 }
    }
    if (["6", "7", "8", "9", "10"].includes(categoryID.toString())) {
        return { data, total: 0 }
    }

    const forum: Forum = {
        forumUUID: "xxx-xxx-xxx-xxx",
        title: "Python vs C: 10 หลักความแตกต่างที่คุณต้องรู้",
        authorUUID: "yyy-yyy-yyy-yyy",
        authorName: "Kook Kai",
        authorImageURL,
        categories: [ (await getCategoryByID(1))!, (await getCategoryByID(2))! ],
        commentCount: 78,
        likeCount: 3999,
        createdAt: new Date(),
    }

    for(let i=offset; i<Math.min(total, offset+limit); i++) {
        data.push(forum)
    }

    await sleep()
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

    await sleep()
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

    await sleep()
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

    await sleep()
    return { data, total }
}

export async function getAnnouncementDetail(forumUUID: string) {
    if (!["xxx-xxx-xxx-xxx", "yyy-yyy-yyy-yyy", "zzz-zzz-zzz-zzz"].includes(forumUUID)) {
        return null
    }
    const forumDetail: Announcement = {
        forumUUID,
        title: "แจ้งเรื่องการลงทะเบียนเพิ่ม-ถอน ภาคเรียนที่ 2 ปีการศึกษา 2565",
        description: "ให้นักศึกษา ...",
        authorUUID: "aaa-aaa-aaa-aaa",
        authorName: "มหาวิทยาลัยศิลปากร",
        authorImageURL,
        announcementImageURLs: [
            "https://media.timeout.com/images/103662433/750/422/image.jpg",
            "https://static.thcdn.com/productimg/1600/1600/12968604-2055002146053883.jpg",
        ],
        createdAt: new Date(),
    }
    await sleep()
    return forumDetail
}

export async function getForumDetail(forumUUID: string) {
    if (!["xxx-xxx-xxx-xxx", "yyy-yyy-yyy-yyy", "zzz-zzz-zzz-zzz"].includes(forumUUID)) {
        return null
    }
    const forumDetail: ForumDetail = {
        forumUUID,
        title: "อยากหาบัคที่เว็ปนี้อย่างงั้นหรอ หึ งั้นก็ไปตามหาเอาสิ ข้าเอาบัคทุกอย่างไปไว้ที่นั่นหมดแล้ว",
        description: "แด่สหายหมีผู้กินผักทั้งหลาย",
        forumImageURLs: [
            "https://media.timeout.com/images/103662433/750/422/image.jpg",
            "https://static.thcdn.com/productimg/1600/1600/12968604-2055002146053883.jpg",
        ],
        categories: [
            (await getCategoryByID(1))!,
            (await getCategoryByID(2))!,
            (await getCategoryByID(3))!,
        ],
        authorUUID: "aaa-aaa-aaa-aaa",
        authorName: "Kook Kai",
        authorImageURL,
        isLike: Math.floor(Math.random() * 10)%2==0,
        likeCount: Math.floor(Math.random() * 5000),
        commentCount: Math.floor(Math.random() * 1000),
        createdAt: new Date(),
    }
    await sleep()
    return forumDetail
}

export async function getComments(forumUUID: string, offset: number, limit: number) {
    const total = 123;
    if (!["xxx-xxx-xxx-xxx", "yyy-yyy-yyy-yyy", "zzz-zzz-zzz-zzz"].includes(forumUUID) || offset >= total) {
        return null
    }
    const cmt: Comment = {
        commentUUID: "aaa-bbb-ccc-dddd",
        commentText: "สุดยอดไปเลยครับเพ่!",
        commenterUUID: "xxx-aaa-bbb-ccc",
        commenterName: "Keroro",
        commenterImageURL: authorImageURL,
        isLike: Math.floor(Math.random() * 10)%2==0,
        likeCount: Math.floor(Math.random() * 100),
        commentCount: Math.floor(Math.random() * 1000),
        createdAt: new Date,
    }
    const comment = (order: number, imageCount: number, replyCount: number): Comment => {
        let comment = {...cmt};
        comment.commentImageURLs = [];
        comment.replyComments = [];
        for(let i=0; i<imageCount; i++) {
            comment.commentImageURLs?.push("https://media.timeout.com/images/103662433/750/422/image.jpg")
        }
        for(let i=0; i<replyCount; i++) {
            let subComment = {...cmt};
            for(let j=0; j<Math.round(Math.random() * imageCount); j++) {
                subComment.commentImageURLs?.push("https://media.timeout.com/images/103662433/750/422/image.jpg")
            }
            subComment.commentUUID += `${order}-${i}`
            subComment.commentText += ` ความคิดเห็นที่ ${i+1} ตอนกลับความคิดเห็นที่ ${order+1}`
            comment.replyComments.push({...subComment})
        }
        return comment
    }

    const comments: Comment[] = []
    for(let i=offset; i<Math.min(total, offset+limit); i++) {
        const cmt = {...comment(i, Math.floor(Math.random() * 3), Math.floor(Math.random() * 5))};
        cmt.commentUUID += `${i}`
        cmt.commentText += ` ${i+1}`
        comments.push({...cmt})
    }
    await sleep()
    return { data: comments, total }
}

export const sleep = async (time?: number) => {
    if (!time) {
        time = 500
    }
    return await new Promise(resolve => setTimeout(() => resolve(""), time))
}
