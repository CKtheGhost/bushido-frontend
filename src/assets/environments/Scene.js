export const loadEnvironmentMap = async (path) => {
  const { RGBELoader } = await import('three/examples/jsm/loaders/RGBELoader');
  const { PMREMGenerator } = await import('three');
  
  return new Promise((resolve, reject) => {
    const loader = new RGBELoader();
    loader.load(
      path,
      (texture) => {
        const renderer = new THREE.WebGLRenderer();
        const pmremGenerator = new PMREMGenerator(renderer);
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        pmremGenerator.dispose();
        resolve(envMap);
      },
      undefined,
      reject
    );
  });
};