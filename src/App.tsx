import "./App.css";
import { ref, set } from "firebase/database";
import { database } from "./firebase";
import { Joystick } from "react-joystick-component";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";

function App() {
  const move = (dir: string, joystick?: IJoystickUpdateEvent) => {
    console.log("adding todo");
    const newTodoRef = ref(database, "players/p1");
    set(newTodoRef, {
      dir: dir,
      joystick: joystick,
    });
  };

  return (
    <>
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
      <button
        type="button"
        onMouseDown={() => move("up")}
        onMouseUp={() => move("null")}
        onTouchStart={() => move("up")}
        onTouchEnd={() => move("null")}
      >
        up
      </button>

      <button
        type="button"
        onMouseDown={() => move("down")}
        onMouseUp={() => move("null")}
        onTouchStart={() => move("down")}
        onTouchEnd={() => move("null")}
      >
        down
      </button>

      <button
        type="button"
        onMouseDown={() => move("left")}
        onMouseUp={() => move("null")}
        onTouchStart={() => move("left")}
        onTouchEnd={() => move("null")}
      >
        left
      </button>

      <button
        type="button"
        onMouseDown={() => move("right")}
        onMouseUp={() => move("null")}
        onTouchStart={() => move("right")}
        onTouchEnd={() => move("null")}
      >
        right
      </button>
    </>
  );
}

export default App;
