import { usePlane } from "@react-three/cannon";
import { NearestFilter, RepeatWrapping } from "three";
import { groundTexture } from "../images/textures";
import { useStore } from "../store/useStore";

export const Ground = () => {
  const [addCube, playerPos] = useStore((state) => [
    state?.addCube,
    state?.playerPosition,
  ]);

  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], //flatten ground
    position: [0, -0.5, 0],
  }));

  groundTexture.magFilter = NearestFilter; //remove the blurryness/ make texture not stretched
  groundTexture.wrapS = RepeatWrapping;
  groundTexture.wrapT = RepeatWrapping;
  groundTexture.repeat.set(100, 100);

  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();

        const [x, y, z] = Object.values(e.point).map((v, index) =>
          index === 1
            ? Math.round(v) < -0.5
              ? 0
              : Math.round(v)
            : Math.round(v)
        );

        if (
          Math.abs(playerPos[0] - x) > 6 ||
          Math.abs(playerPos[1] - y) > 6 ||
          Math.abs(playerPos[2] - z) > 6
        )
          return;

        //checks for ground so we dont eject ourselves when we place a cube
        if (
          playerPos[1] < y + 1 &&
          playerPos[1] > y &&
          playerPos[0] < x + 2 &&
          playerPos[0] > x - 2 &&
          playerPos[2] < z + 2 &&
          playerPos[2] > z - 2
        )
          return;
        addCube(x, y, z);
      }}
    >
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshStandardMaterial attatch='material' map={groundTexture} />
    </mesh>
  );
};
