import { useStore } from "../store/useStore.jsx";
import Cube from "./Cube.jsx";

const Cubes = () => {
  const [cubes] = useStore((state) => [state.cubes]); //just like redux, state.anything gets you the state from the object in useStore.jsx
  console.log(cubes);
  return cubes.map(({ key, pos, texture }) => {
    return <Cube key={key} position={pos} texture={texture} />;
  });
};

export default Cubes;
