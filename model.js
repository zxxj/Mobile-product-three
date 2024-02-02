import * as THREE from './build/three.module.js';
import { GLTFLoader } from './examples/jsm/loaders/GLTFLoader.js';
import { scene } from './index.js';

// 纹理贴图加载器
const textureLoader = new THREE.TextureLoader();

// gltf加载器
const loader = new GLTFLoader();

// 加载gltf方法
const loadGLTF = (gltfPath, gltfName) => {
  loader.load(gltfPath + gltfName, (gltf) => {
    // 找到name为手机的节点
    const mesh = gltf.scene.getObjectByName('手机');

    // 修改为pbr材质
    mesh.material = new THREE.MeshPhysicalMaterial({
      metalness: 1.0, // 金属度
      roughness: 1.0, // 粗糙度
      map: textureLoader.load('/public/basecolor.png'), // 颜色贴图
      metalnessMap: textureLoader.load('/public/metallic.png'), // 金属度贴图
      roughnessMap: textureLoader.load('/public/roughness.png'), // 粗糙度贴图
      normalMap: textureLoader.load('/public/normal.png'), // 法线贴图
      alphaMap: textureLoader.load('/public/opacity.png'), // alpha贴图
      transparent: true, // 如果使用了aplhaMap,要开启透明计算
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
