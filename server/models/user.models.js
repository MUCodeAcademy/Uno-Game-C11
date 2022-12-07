import { getDatabase, ref, child, get, set } from "firebase/database";

const dbRef = ref(getDatabase());

//TODO get user all user info on login
export async function getByUser(uid) {
    try {
        const getUser = await get(child(dbRef, `users/${uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                return { snapshot, success: true };
            }
        });
    } catch (err) {
        console.error(err);
        return { error: "Something went wrong while logging in 🤷‍♂️", success: false };
    }
}

//TODO if snapshot = null , create database entry for user
export async function addUser(uid, username) {
    try {
        await set(dbRef, "users/" + uid),
            {
                name: `${username}`,
                "total games played": 0,
                "total games won": 0,
                "total games lost": 0,
                "dev": false,
            };
    } catch (err) {
        console.error(err);
        return {
            error: "Something went wrong while trying to add new user 🤷‍♂️",
            success: false,
        };
    }
    await getByUser();
}

//TODO auto post all game info to db when game is completed
export async function updateStats(uid , )
