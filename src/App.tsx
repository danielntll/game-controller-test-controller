import "./App.css";
import { ref, set } from "firebase/database";
import { auth, database } from "./firebase";
import { Joystick } from "react-joystick-component";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInAnonymously, User } from "firebase/auth";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [movement, setMovement] = useState<IJoystickUpdateEvent | null>(null);
  const [btn1, setBtn1] = useState<boolean>(false);
  const [btn2, setBtn2] = useState<boolean>(false);
  const [btn3, setBtn3] = useState<boolean>(false);
  const [btn4, setBtn4] = useState<boolean>(false);
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

  useEffect(() => {
    if (user) {
      uploadData();
    }
  }, [movement, btn1, btn2, btn3, btn4]);

  const uploadData = () => {
    const dbRef = ref(database, "players/" + user?.uid);
    set(dbRef, {
      joystick: movement,
      btn1: btn1,
      btn2: btn2,
      btn3: btn3,
      btn4: btn4,
    });
  };

  return (
    <div className="mainContainer">
      <p>UID: {user?.uid}</p>
      <div className="contollers">
        <Joystick
          size={100}
          sticky={false}
          baseColor="red"
          stickColor="blue"
          move={(e) => {
            setMovement(e);
            console.log("moved :: ", e);
          }}
          stop={(e) => {
            console.log("stopped :: ", e);
            setMovement(e);
          }}
        ></Joystick>
        <div className="container">
          <div className="top">
            <button
              type="button"
              onMouseDown={() => setBtn1(true)}
              onMouseUp={() => setBtn1(false)}
              onTouchStart={() => setBtn1(true)}
              onTouchEnd={() => setBtn1(false)}
            >
              ♺
            </button>
          </div>
          <div className="center">
            <button
              type="button"
              onMouseDown={() => setBtn2(true)}
              onMouseUp={() => setBtn2(false)}
              onTouchStart={() => setBtn2(true)}
              onTouchEnd={() => setBtn2(false)}
            >
              ⚃
            </button>
            <button
              type="button"
              onMouseDown={() => setBtn3(true)}
              onMouseUp={() => setBtn3(false)}
              onTouchStart={() => setBtn3(true)}
              onTouchEnd={() => setBtn3(false)}
            >
              ⚪
            </button>
          </div>
          <div className="top">
            <button
              type="button"
              onMouseDown={() => setBtn4(true)}
              onMouseUp={() => setBtn4(false)}
              onTouchStart={() => setBtn4(true)}
              onTouchEnd={() => setBtn4(false)}
            >
              ⚔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
