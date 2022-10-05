import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../keyboard/UseKeyboard";

const jumpForce = 3;
const speed = 3;

export const Player = () => {
  const actions = useKeyboard();
  console.log(
    "actions",
    Object.entries(actions).filter(([e, v]) => v)
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

    //all movement
    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      (actions.moveBackwards ? 1 : 0) - (actions.moveForward ? 1 : 0) //subtract, if both are 1 then they cancel each other out. If we click back and forward at the same time, we should not move
    );

    const sideVector = new Vector3(
      (actions.moveLeft ? 1 : 0) - (actions.moveRight ? 1 : 0), //same as above but sideways movement
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(speed)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (actions.jump && Math.abs(velocity.current[1]) < 0.05) {
      api.velocity.set(velocity.current[0], jumpForce, velocity.current[2]);
    }
  });

  return <mesh ref={sphereRef}></mesh>;
};
