import * as THREE from 'three';
import { model } from './model.js';

// 场景
const scene = new THREE.Scene();
scene.add(model);

// 环境光
const ambientLgiht = new THREE.AmbientLight(0xffffff, 5);
scene.add(ambientLgiht);

// 平行光1
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);

// 坐标轴辅助器
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 自适应宽高

export { scene };
