import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { mesh } from './model.js';
import { resize } from './resize.js';

const scene = new THREE.Scene();

scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

render();

const control = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

document.body.appendChild(renderer.domElement);

resize();
export { camera, renderer };
