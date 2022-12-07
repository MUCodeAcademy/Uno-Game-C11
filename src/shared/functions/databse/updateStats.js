import { ref, update, increment } from "firebase/database";
import { database } from "../../../firebase.config";

const dbRef = ref(database);

export async function updateStats(uid, gameWinnerUID) {
    let updates = {};
    try {
        if (uid === gameWinnerUID) {
            console.log("winner match");
            updates[`users/${uid}/total games played`] = increment(1);
            updates[`users/${uid}/total games won`] = increment(1);
            update(dbRef, updates);
        } else {
            console.log("no winner match");
            updates[`users/${uid}/total games played`] = increment(1);
            updates[`users/${uid}/total games lost`] = increment(1);
            update(dbRef, updates);
        }
    } catch (err) {
        console.error(err);
        return {
            error: "Something went wrong while trying to update user stats 🤷‍♂️",
            success: false,
        };
    }
}
