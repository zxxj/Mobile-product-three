import * as THREE from './build/three.module.js';

const geometry = new THREE.BoxGeometry(50, 50, 50);

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});

const mesh = new THREE.Mesh(geometry, material);

export { mesh };
