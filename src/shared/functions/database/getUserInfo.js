import { ref, child, get } from "firebase/database";
import { database } from "../../../firebase.config";
import { registerUser } from "./registerUser";

const dbRef = ref(database);

export async function getUserInfo(user) {
    try {
        await get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                return { snapshot, success: true };
            } else {
                registerUser(user);
            }
        });
    } catch (err) {
        console.error(err);
        return { error: "Something went wrong while logging in 🤷‍♂️", success: false };
    }
}
