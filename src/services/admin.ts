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
    return { data: users, total: users.length }
}