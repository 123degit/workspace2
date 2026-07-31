import { afterEach, describe, expect, it } from 'vitest';
import { preloadImage, preloadImages } from './reviewAssets';

const originalImage = globalThis.Image;

afterEach(() => {
  globalThis.Image = originalImage;
});

function installImageMock() {
  const instances = [];

  globalThis.Image = class {
    constructor() {
      instances.push(this);
    }

    set src(value) {
      this.source = value;
    }
  };

  return instances;
}

describe('review image preloading', () => {
  it('resolves when an image loads', async () => {
    const instances = installImageMock();
    const preload = preloadImage('/prompt.png');

    expect(instances).toHaveLength(1);
    expect(instances[0].source).toBe('/prompt.png');

    instances[0].onload();
    await expect(preload).resolves.toBeUndefined();
  });

  it('resolves when an image fails', async () => {
    const instances = installImageMock();
    const preload = preloadImage('/missing.png');

    instances[0].onerror();
    await expect(preload).resolves.toBeUndefined();
  });

  it('starts every request before waiting for the asset group', async () => {
    const instances = installImageMock();
    const preload = preloadImages(['/prompt.png', '/yes.png', '/no.png']);

    expect(instances.map((instance) => instance.source)).toEqual(['/prompt.png', '/yes.png', '/no.png']);

    instances.forEach((instance) => instance.onload());
    await expect(preload).resolves.toBeUndefined();
  });
});

