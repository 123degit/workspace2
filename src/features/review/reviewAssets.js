export function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
  });
}

export function preloadImages(sources) {
  return Promise.all(sources.map(preloadImage)).then(() => undefined);
}
