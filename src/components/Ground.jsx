import { usePlane } from "@react-three/cannon";
import { NearestFilter, RepeatWrapping } from "three";
import { groundTexture } from "../images/textures";

export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], //flatten ground
    position: [0, 0, 0],
  }));

  groundTexture.magFilter = NearestFilter; //remove the blurryness/ make texture not stretched
  groundTexture.wrapS = RepeatWrapping;
  groundTexture.wrapT = RepeatWrapping;
  groundTexture.repeat.set(100, 100);

  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshStandardMaterial attatch='material' map={groundTexture} />
    </mesh>
  );
};
