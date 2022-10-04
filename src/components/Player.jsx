import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../keyboard/UseKeyboard";

export const Player = () => {
  const actions = useKeyboard();
  console.log(
    "actions",
    Object.entries(actions).filter((e) => e)
  );

  const { camera } = useThree();
  const [sphereRef, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 2, 0],
  }));

  const velocity = useRef([0, 0, 0]); //tracks the position of sphere
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  const position = useRef([0, 0, 0]); //tracks the position of sphere
  useEffect(() => {
    api.position.subscribe((p) => (position.current = p));
  }, [api.position]);

  useFrame(() => {
    camera.position.copy(
      new Vector3(position.current[0], position.current[1], position.current[2]) //uses the useref's values as the position
    );

    api.velocity.set(0, 0, 0);
  });

  return <mesh ref={sphereRef}></mesh>;
};
