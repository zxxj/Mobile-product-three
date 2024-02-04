import * as THREE from 'three';

const bottomCircleLine = new THREE.Group();

// 声明一个几何体对象
const geometry = new THREE.BufferGeometry();

// 半径
const R = 60;

// 0,0: 圆弧坐标原点x,y
// R: 圆弧半径
// Math.PI / 2 + Math.PI / 6 & Math.PI / 2 - Math.PI / 6: 圆弧起始角度
const arc = new THREE.ArcCurve(
  0,
  0,
  R,
  Math.PI / 2 + Math.PI / 6,
  Math.PI / 2 - Math.PI / 6
);

// getPoints是父类Curve中的方法, 会返回一个vector2对象作为元素组成的数组
const points = arc.getPoints(50); // 分段数为50, 返回51个顶点

// setFromPoints方法从points中提取数据并改变几何体的顶点位置数据,attribute.position
geometry.setFromPoints(points);

// 材质
const material = new THREE.LineBasicMaterial({ color: '0xffffff' });

// 线条模型
const line = new THREE.Line(geometry, material);

// 绕x轴旋转90度
line.rotateX(Math.PI / 2);

bottomCircleLine.add(line);

// 移动到手机的底部
bottomCircleLine.position.y = -82;

export { bottomCircleLine };
