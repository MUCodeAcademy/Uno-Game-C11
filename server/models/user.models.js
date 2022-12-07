import { getDatabase, ref, child, get, set, update } from "firebase/database";

const dbRef = ref(getDatabase());

//get user all user info on login
export async function getByUser(uid, username) {
    try {
        await get(child(dbRef, `users/${uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                return { snapshot, success: true };
            } else {
                addUser(uid, username);
            }
        });
    } catch (err) {
        console.error(err);
        return { error: "Something went wrong while logging in 🤷‍♂️", success: false };
    }
}

//if snapshot = null , create database entry for user
export async function addUser(uid, username) {
    try {
        await set(dbRef, "users/" + uid),
            {
                name: `${username}`,
                "total games played": 0,
                "total games won": 0,
                "total games lost": 0,
                dev: false,
            };
        getByUser(uid);
        return { data: "user added", success: true };
    } catch (err) {
        console.error(err);
        return {
            error: "Something went wrong while trying to add new user 🤷‍♂️",
            success: false,
        };
    }
}

//auto post all game info to db when game is completed
//TODO figure out how win information is packaged and dealt with upon arrival
export async function updateStats(uid) {
    try {
        const updates = {};
        updates[`users/${uid}/total games played`] = increment(1);
        if ("game winner uid") {
            updates[`users/${uid}/total games won`] = increment(1);
        } else {
            updates[`users/${uid}/total games lost`] = increment(1);
        }
        update(dbRef, updates);
    } catch {
        console.error(err);
        return {
            error: "Something went wrong while trying to update user stats 🤷‍♂️",
            success: false,
        };
    }
}
