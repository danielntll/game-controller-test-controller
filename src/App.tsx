import "./App.css";
import { ref, set } from "firebase/database";
import { database } from "./firebase";

function App() {
  const move = (dir: string) => {
    console.log("adding todo");
    const newTodoRef = ref(database, "players/p1");
    set(newTodoRef, {
      dir: dir,
    });
  };

  return (
    <>
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
