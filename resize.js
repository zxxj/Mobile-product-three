import { camera, renderer } from './rendererCamera.js';

export const resize = () => {
  window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
  };
};
