import * as THREE from 'three';
import { camera } from './rendererCamera.js';
import { spriteMesh } from './model.js';

const choose = (event) => {
  // 鼠标单击位置的横坐标
  const clientX = event.clientX;
  // 鼠标单击位置的纵坐标
  const clientY = event.clientY;

  // 将屏幕坐标转为webgl标准设备坐标
  const x = (clientX / window.innerWidth) * 2 - 1;
  const y = -(clientY / window.innerHeight) * 2 + 1;

  // 创建射线投射器
  const rayCaster = new THREE.Raycaster();

  // 把鼠标点击的位置坐标和相机作为参数,用来计算投射器的射线属性值
  rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

  // 获取射线相交时,计算出来的网格模型, 未选中时返回空数组
  const intersects = rayCaster.intersectObjects([spriteMesh]);
  if (intersects.length > 0) {
    console.log(intersects[0].object); // 如果选中sprite，控制台打印该对象
    document.querySelector('#cameraMessage').style.visibility = 'visible'; // 显示摄像头信息
  }
};

window.addEventListener('click', choose);

export { choose };
