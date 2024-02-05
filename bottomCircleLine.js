import * as THREE from 'three';
import { FontLoader } from './examples/jsm/loaders/FontLoader.js';

// 字体加载器
const fontLoader = new FontLoader();

// 组对象
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

// 字体部分

// 加载字体
fontLoader.load('./examples/fonts/gentilis_bold.typeface.json', (font) => {
  // 材质
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff, // 字体颜色
    side: THREE.DoubleSide, // 双面可见
  });

  // generateShapes: 获取"遥遥领先"字符的轮廓顶点坐标
  // 10: 字符大小
  const shapes = font.generateShapes('HUAWEI', 10);

  // 通过多个多边形轮廓来生成字体
  const geometry = new THREE.ShapeGeometry(shapes);
  const textMesh = new THREE.Mesh(geometry, material);
  textMesh.position.z = R;
  textMesh.position.x = -26;

  bottomCircleLine.add(textMesh);
});

export { bottomCircleLine };
