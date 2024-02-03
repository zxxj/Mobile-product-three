import * as THREE from './build/three.module.js';
import { GLTFLoader } from './examples/jsm/loaders/GLTFLoader.js';
import { scene } from './index.js';

// 纹理贴图加载器
const textureLoader = new THREE.TextureLoader();

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

// 加载gltf方法
const loadGLTF = (gltfPath, gltfName) => {
  loader.load(gltfPath + gltfName, (gltf) => {
    // 找到name为手机的节点
    const mesh = gltf.scene.getObjectByName('手机');

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

    // 将模型添加到场景中
    scene.add(gltf.scene);
  });
};

export { loadGLTF };
