## Notes

I followed this tutorial for the base of the project: https://www.youtube.com/watch?v=qpOZup_3P_A </br>

There were many bugs in the freecodecamp tutorial's final version, such as infinite jumps, blocks placing in the wrong spots, and placing blocks launching you in the sky. I fixed those bugs in the deployed version below and added a couple of small features. </br>

Although I did follow the tutorial for the most part, I coded some components where I had knowledge of, such as Texture Swapping. <br/>

In this project, I learned:

- Three.js and sub-libraries of Three.js (cannon, drei, fiber) and how all of them can be used together in one big project.
- A better understanding of components of 3D development, such as gravity, movement, POV camera, and 3D coordinates (x,y,z).
- How to write custom react hooks and use it in a file.
- Importance of UseEffect cleanup functions since I had to deal with alot of eventListeners.
- A new state management library, Zustand, to my arensal along with Redux.

## Deployed Project

https://minecraft-experimental.herokuapp.com/

## Tech Stack :books:

Below is a non-exhaustive list of technologies used throughout the project.

| Front End | Libraries/Frameworks | Compiler | State Management |
| :-------: | :------------------: | :------: | :--------------: |
|   React   |       Three.js       |   Vite   |     Zustand      |
|   HTML5   |   Three.js/cannon    |          |                  |
|   SASS    |    Three.js/drei     |          |                  |
|           |    Three.js/fiber    |          |                  |

## Setup :rocket:

```
npm install
npm run dev
```
