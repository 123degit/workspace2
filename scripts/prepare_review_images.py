from collections import deque
from pathlib import Path

from PIL import Image


ASSETS = {
    'image27.png': 'review-lemon.png',
    'image28.png': 'review-cherries.png',
    'image29.png': 'review-mango.png',
    'image30.png': 'review-watermelon.png',
    'image31.png': 'review-cantaloupe.png',
    'image32.png': 'review-melon.png',
    'image33.png': 'review-strawberry.png',
    'image34.png': 'review-mangoes.png',
    'image20.png': 'review-completion-parrot.png',
}


def is_background(pixel, colors):
    return any(sum((pixel[index] - color[index]) ** 2 for index in range(3)) <= 75 ** 2 for color in colors)


def remove_background(source, destination):
    image = Image.open(source).convert('RGBA')
    pixels = image.load()
    width, height = image.size
    corners = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
    colors = [pixels[x, y][:3] for x, y in corners]
    queue = deque(corners)
    visited = set(corners)

    while queue:
        x, y = queue.popleft()
        pixel = pixels[x, y]
        if not is_background(pixel, colors):
            continue
        pixels[x, y] = (*pixel[:3], 0)
        for next_x, next_y in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= next_x < width and 0 <= next_y < height and (next_x, next_y) not in visited:
                visited.add((next_x, next_y))
                queue.append((next_x, next_y))

    image.save(destination)


assets_dir = Path(__file__).resolve().parents[1] / 'public' / 'assets' / 'docx'
for source_name, output_name in ASSETS.items():
    remove_background(assets_dir / source_name, assets_dir / output_name)
