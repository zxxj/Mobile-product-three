import * as THREE from 'three';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';
import { resize } from './resize.js';
import { scene } from './index.js';
import { CSS2DRenderer } from './examples/jsm/renderers/CSS2DRenderer.js';

// 相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 300);
camera.lookAt(0, 0, 0);

// css2渲染器
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
// 相对元素原位置偏移量
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.left = '260px';
// 避免模型元素遮挡鼠标选择场景中的模型
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

// 渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true }); // 开启抗锯齿
renderer.setSize(window.innerWidth, window.innerHeight); // 设置画布尺寸
renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比,防止canvas画布输出模糊

// 渲染动画帧
const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
};

// 渲染动画帧
render();

// 自适应宽高
resize();

// 轨道控制器
const control = new OrbitControls(camera, renderer.domElement);
control.minDistance = 250; // 相机距离观察目标点极小距离——模型最大状态
control.maxDistance = 500; // 相机距离观察目标点极大距离——模型最小状态
// 左右旋转范围-100~100度
control.minAzimuthAngle = -Math.PI * (100 / 180);
control.maxAzimuthAngle = Math.PI * (100 / 180);
// 上下旋转范围0~120度
control.minPolarAngle = 0;
control.maxPolarAngle = Math.PI * (120 / 180);

control.enablePan = false; // 禁止右键拖拽
// control.enableZoom = false; // 禁止滚轮缩放
// control.enableRotate = false; // 禁止鼠标拖动

export { renderer, camera, labelRenderer };
