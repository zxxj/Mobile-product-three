import * as THREE from 'three';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';
import { resize } from './resize.js';
import { scene } from './index.js';

// 相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 300);
camera.lookAt(0, 0, 0);

// 渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true }); // 开启抗锯齿
renderer.setSize(window.innerWidth, window.innerHeight); // 设置画布尺寸
renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比,防止canvas画布输出模糊

// 渲染动画帧
const render = () => {
  // group.rotateY(0.005); // 设置手机模型的旋转
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

// 渲染动画帧
render();

// 自适应宽高
resize();

// 轨道控制器
const control = new OrbitControls(camera, renderer.domElement);

export { renderer, camera };
