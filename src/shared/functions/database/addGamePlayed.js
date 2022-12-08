import { ref, update, increment } from "firebase/database";
import { database } from "../../../firebase.config";

const dbRef = ref(database);

export async function addGamePlayed(uid) {
    let updates = {};
    try {
        updates[`users/${uid}/total games played`] = increment(1);
        update(dbRef, updates);
    } catch (err) {
        console.error(err);
        return {
            error: "Something went wrong while trying to update user stats 🤷‍♂️",
            success: false,
        };
    }
}
