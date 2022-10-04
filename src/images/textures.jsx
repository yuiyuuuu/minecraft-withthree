import { dirt, glass, grass, log, wood } from "./images.jsx";
import { TextureLoader } from "three";

const dirtTexture = new TextureLoader().load(dirt);
const glassTexture = new TextureLoader().load(glass);
const grassTexture = new TextureLoader().load(grass);
const woodTexture = new TextureLoader().load(wood);
const logTexture = new TextureLoader().load(log);
const groundTexture = new TextureLoader().load(grass);

export {
  dirtTexture,
  grassTexture,
  glassTexture,
  woodTexture,
  logTexture,
  groundTexture,
};
