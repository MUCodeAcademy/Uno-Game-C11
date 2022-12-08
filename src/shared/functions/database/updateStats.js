import { ref, update, increment } from "firebase/database";
import { database } from "../../../firebase.config";

const dbRef = ref(database);

export async function updateStats(uid, gameWinnerUID) {
    let updates = {};
    if (!gameWinnerUID) return;
    try {
        if (uid === gameWinnerUID) {
            updates[`users/${uid}/total games won`] = increment(1);
            update(dbRef, updates);
        } else {
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
