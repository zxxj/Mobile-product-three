import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

export const createSpriteTag = (obj) => {
  // 创建一个空的三维对象, 用于保存后置摄像头这个模型在三维坐标系中的位置,也就是它的世界坐标
  const rearCameraModelposition = new THREE.Vector3();
  obj.getWorldPosition(rearCameraModelposition);

  // 精灵模型+背景透明贴图实现光点效果
  const spriteMaterial = new THREE.SpriteMaterial({
    map: textureLoader.load('./assets/光点.png'),
  });

  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.position.copy(rearCameraModelposition);
  sprite.position.x -= 8;
  sprite.position.z -= 2;

  return sprite;
};
