import { getDatabase, ref, set } from "firebase/database";

export async function registerUser(user) {
    const db = getDatabase();
    try {
        await set(ref(db, "users/" + `${user.uid}`), {
            name: `${user.displayName}`,
            "total games played": 0,
            "total games won": 0,
            "total games lost": 0,
            dev: false,
        });
        return { data: "user added", success: true };
    } catch (err) {
        console.error(err);
        return {
            error: "Something went wrong while trying to add new user 🤷‍♂️",
            success: false,
        };
    }
}
