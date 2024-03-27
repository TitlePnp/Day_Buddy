import { getDatabase, ref, remove } from "firebase/database";

const DeleteActivitieController = (userUID, activtyTarget) => {
    const db = getDatabase();
    const dataRef = ref(db, `${userUID}/activities/${activtyTarget}`);
    console.log('DeleteActivitieController: ', dataRef);
    console.log('DeleteActivitieController: ', userUID);
    remove(dataRef)
    .then(() => {
      console.log("Data removed successfully.");
    })
    .catch((error) => {
      console.error("Error removing data: ", error);
    });
}

export default DeleteActivitieController