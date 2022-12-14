import { ref, update, increment } from "firebase/database";
import { database } from "../../../firebase.config";

const dbRef = ref(database);

export async function updateStats(uid, gameWinnerUID, hostUID) {
    let updates = {};
    try {
        if (uid === hostUID) {
            updates[`server/total games completed`] = increment(1);
            update(dbRef, updates);
        }
        if (!gameWinnerUID) {
            updates[`users/${uid}/total games drawn`] = increment(1);
            updates[`users/${uid}/total games lost`] = increment(-1);
            if (uid === hostUID) {
                updates[`server/total games stalemate`] = increment(1);
            }
            update(dbRef, updates);
        } else if (uid === gameWinnerUID) {
            updates[`users/${uid}/total games won`] = increment(1);
            updates[`users/${uid}/total games lost`] = increment(-1);
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
