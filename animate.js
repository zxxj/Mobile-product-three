import { scene } from './index.js'; // Three.js三维场景
import { renderer, camera } from './rendererCamera.js'; //渲染器对象和相机对象
import { model } from './model.js'; // 手机模型

// 控制模型旋转状态
let isRotate = true;

const handleRotate = document.querySelector('#handleRotate');
const rotateText = document.querySelector('#rotateText');
const rotateImg = document.querySelector('#rotateImg');

handleRotate.addEventListener('click', () => {
  isRotate === true ? (isRotate = false) : (isRotate = true);
  isRotate === true
    ? (rotateText.innerHTML = '停止旋转')
    : (rotateText.innerHTML = '开始旋转');
  isRotate === true
    ? (rotateImg.src = './assets/停止旋转.png')
    : (rotateImg.src = './assets/旋转.png');
});

// 渲染循环
function render() {
  if (isRotate) model.rotateY(0.005); //手机绕y轴旋转
  renderer.render(scene, camera); // 执行渲染操作
  requestAnimationFrame(render); // 请求再次执行渲染函数render，渲染下一帧
  // console.log(camera.position);// 通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
}
render();

export { renderer };
