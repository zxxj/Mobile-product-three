import * as THREE from 'three';
import { GLTFLoader } from './examples/jsm/loaders/GLTFLoader.js';
import { createSpriteTag } from './createSpriteTag.js';

// 纹理贴图加载器
const textureLoader = new THREE.TextureLoader();

// 指向手机网格模型,用于修改纹理贴图
let handlePhoneMesh = null;

// 环境贴图加载器
const cubeLoader = new THREE.CubeTextureLoader().setPath('/public/cube/pisa/');
const cubeTextureEnv = cubeLoader.load([
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png',
]);

// gltf加载器
const loader = new GLTFLoader();

// 组
const model = new THREE.Group();

// 时间类
const clock = new THREE.Clock();

// 加载gltf方法
loader.load('/public/手机.glb', (gltf) => {
  model.add(gltf.scene);

  // 找到name为手机的节点
  const mesh = gltf.scene.getObjectByName('手机');

  // 找到模型中的后置摄像头
  const rearCamera = gltf.scene.getObjectByName('后置摄像头位置');
  const sprite = createSpriteTag(rearCamera);
  model.add(sprite);

  console.log(mesh.renderOrder, sprite.renderOrder); // 0, 0
  // 通过设置renderOrder来解决半透明叠加问题(会发现光点有些角度是会显示黑色)
  mesh.renderOrder = 0; // 手机模型先渲染
  sprite.renderOrder = 1; // 光点后渲染

  handlePhoneMesh = mesh;
  // 修改为pbr材质
  mesh.material = new THREE.MeshStandardMaterial({
    metalness: 1.0, // 金属度
    roughness: 1.0, // 粗糙度
    map: textureLoader.load('/public/basecolor.png'), // 颜色贴图
    metalnessMap: textureLoader.load('/public/metallic.png'), // 金属度贴图
    roughnessMap: textureLoader.load('/public/roughness.png'), // 粗糙度贴图
    normalMap: textureLoader.load('/public/normal.png'), // 法线贴图
    alphaMap: textureLoader.load('/public/opacity.png'), // alpha贴图
    transparent: true, // 如果使用了aplhaMap,要开启透明计算
    envMap: cubeTextureEnv, // 设置PBR材质环境贴图,为了渲染效果更好
    envMapIntensity: 0.9, // 设置环境贴图对模型表面影响程度
  });

  // 设置问题贴图的朝向
  mesh.material.map.flipY = false;
  mesh.material.normalMap.flipY = false;
  mesh.material.metalnessMap.flipY = false;
  mesh.material.roughnessMap.flipY = false;
  mesh.material.alphaMap.flipY = false;

  // 设置纹理贴图自动切换
  let T = 0; // 用于表示完成一轮贴图切换的所处时间
  let spT = 2; // 纹理贴图切换时间(秒)
  const blackMap = textureLoader.load('./public/幻夜黑.png');
  const purpleMap = textureLoader.load('./public/极光紫.png');
  const blueMap = textureLoader.load('./public/极光蓝.png');
  const redMap = textureLoader.load('./public/珊瑚红.png');
  blackMap.flipY = false;
  purpleMap.flipY = false;
  blueMap.flipY = false;
  redMap.flipY = false;

  const changeMaterialMap = () => {
    // 每隔spT毫秒就切换一次贴图
    if (T < spT) {
      mesh.material.map = blackMap;
    } else if (T < 2 * spT) {
      mesh.material.map = purpleMap;
    } else if (T < 3 * spT) {
      mesh.material.map = blueMap;
    } else if (T < 4 * spT) {
      mesh.material.map = redMap;
    } else {
      T = 0;
    }

    let t = clock.getDelta();
    T += t;
    requestAnimationFrame(changeMaterialMap);
  };

  // changeMaterialMap();
});

export { model, handlePhoneMesh };
