import type { Category } from "@models/category";
import type { ForumReport } from "@models/forum";
import type { User } from "@models/user";
import { sleep } from "./forum";

export async function getStudent(offset: number, limit: number) {
    const total = 23;
    const users: User[] = [
        {
            userUUID: "xxx-xxx-xxx-xxx",
            userDisplayName: "Kook Kai",
            userFullName: "Kook Kai",
            userEmail: "kookkai_k@silpakorn.edu",
            studentID: "620710001",
            isAnnonymous: false,
            userType: "std",
        },
        {
            userUUID: "yyy-yyy-yyy-yyy",
            userDisplayName: "Moe Monday",
            userFullName: "Thanakorn Hemsart",
            userEmail: "hemsart_t@silpakorn.edu",
            studentID: "620710115",
            isAnnonymous: false,
            userType: "std",
        },
        {
            userUUID: "zzz-zzz-zzz-zzz",
            userDisplayName: "Jedi Power",
            userFullName: "Sorawit Nitrat",
            userEmail: "nitrat_s@silpakorn.edu",
            studentID: "620710681",
            isAnnonymous: true,
            userType: "std",
        },
    ];

    let data: User[] = [];
    for(let i=offset; i<Math.min(offset+limit, total); i++) {
        const random = Math.floor(Math.random() * 3)
        const user = users[random]
        user.userUUID += `${i}`
        data.push({...user})
    }
    await sleep(500)
    return { data, total }
}

export async function getTeacher(offset: number, limit: number) {
    const users: User[] = [
        {
            userUUID: "xxx-xxx-xxx-xxx",
            userDisplayName: "Onizuka Sensei",
            userFullName: "Onizuka Sensei",
            userEmail: "kookkai_k@silpakorn.edu",
            isAnnonymous: false,
            userType: "tch",
        },
        {
            userUUID: "yyy-yyy-yyy-yyy",
            userDisplayName: "Desmond Sensei",
            userFullName: "Desmond Rescribe",
            userEmail: "hemsart_t@silpakorn.edu",
            isAnnonymous: true,
            userType: "tch",
        },
    ];
    await sleep(500)
    return { data: users, total: users.length }
}

export async function getForumReport(offset: number, limit: number) {
    const total = 0;
    const data: ForumReport[] = []
    await sleep()
    return { data, total }
}

export async function getCategories(offset: number, limit: number) {
    const total = 0;
    const data: Category[] = [
        {
            categoryID: 1,
            categoryName: "ชีวิตประจำวัน",
            categoryHexColor: "#86D97F",
        },
        {
            categoryID: 2,
            categoryName: "กีฬา",
            categoryHexColor: "#4C52E0",
        },
        {
            categoryID: 3,
            categoryName: "อาหาร",
            categoryHexColor: "#857800",
        },
        {
            categoryID: 4,
            categoryName: "การศึกษา",
            categoryHexColor: "#E04C6F",
        },
        {
            categoryID: 5,
            categoryName: "โปรแกรมมิ่ง",
            categoryHexColor: "#48D7E0",
        },
    ]
    await sleep()
    return { data, total }
}