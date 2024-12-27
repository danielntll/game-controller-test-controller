import "./App.css";
import { ref, set } from "firebase/database";
import { auth, database } from "./firebase";
import { Joystick } from "react-joystick-component";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInAnonymously, User } from "firebase/auth";

function App() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        signInAnonymously(auth)
          .then((userCredential) => {
            setUser(userCredential.user);
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(
              `Error during anonymous sign-in: ${errorCode}, ${errorMessage}`
            );
          });
      }
    });
  }, []);

  const move = (dir: string, joystick?: IJoystickUpdateEvent) => {
    console.log("adding todo");
    const dbRef = ref(database, "players/" + user?.uid);
    set(dbRef, {
      dir: dir,
      joystick: joystick,
    });
  };

  return (
    <>
      <p>UID: {user?.uid}</p>
      <Joystick
        size={100}
        sticky={false}
        baseColor="red"
        stickColor="blue"
        move={(e) => {
          move("null", e);
          console.log("moved :: ", e);
        }}
        stop={(e) => {
          console.log("stopped :: ", e);
          move("null", e);
        }}
      ></Joystick>
    </>
  );
}

export default App;
