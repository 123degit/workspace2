const fruitEffects = {
  yes: {
    cut: '/assets/docx/image22.png',
    sparkle: '/assets/docx/image19.png',
    extra: '/assets/docx/image23.png',
  },
  no: {
    cut: '/assets/docx/image25.png',
    sparkle: '/assets/docx/image19.png',
    extra: '/assets/docx/image26.png',
  },
};

export function getFruitEffectAssets(answer) {
  return fruitEffects[answer];
}
