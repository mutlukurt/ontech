"""Convert all PNG images to WebP format for better Lighthouse scores."""
import os
from PIL import Image

img_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images")
count = 0

for f in os.listdir(img_dir):
    if f.endswith(".png"):
        png_path = os.path.join(img_dir, f)
        webp_path = os.path.join(img_dir, f.replace(".png", ".webp"))
        img = Image.open(png_path)
        img.save(webp_path, "webp", quality=85, method=6)
        os.remove(png_path)
        count += 1
        print(f"  Converted: {f} -> {f.replace('.png', '.webp')}")

print(f"\nTotal: {count} images converted to WebP")
