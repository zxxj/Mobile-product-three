import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { resize } from './resize.js';
import { group, loadGLTF } from './model.js';

// 场景
const scene = new THREE.Scene();

// 加载模型
loadGLTF('/public/', '手机.gltf');

// 相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 300);
camera.lookAt(0, 0, 0);

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

// 渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true }); // 开启抗锯齿
renderer.setSize(window.innerWidth, window.innerHeight); // 设置画布尺寸
renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比,防止canvas画布输出模糊

// 渲染动画帧
const render = () => {
  group.rotateY(0.01); // 设置手机模型的旋转
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

render();

// 轨道控制器
const control = new OrbitControls(camera, renderer.domElement);

// 坐标轴辅助器
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// dom
document.body.appendChild(renderer.domElement);

// 自适应宽高
resize();

export { scene, camera, renderer };
