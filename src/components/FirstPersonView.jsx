import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export const FirstPersonView = () => {
  const { camera, gl } = useThree();

  //drei did all of the work on the moving of camera to get a first person view
  return <PointerLockControls args={[camera, gl.domElement]} />;
};
