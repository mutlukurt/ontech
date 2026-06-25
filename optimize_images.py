"""Optimize WebP images: reduce quality and resize for better Lighthouse scores."""
import os
from PIL import Image

img_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images")

# Target sizes per image type
SIZES = {
    "hero-student.webp": (400, 550),       # Hero - larger but optimized
    "course-marketing.webp": (400, 260),   # Course cards
    "course-design.webp": (400, 260),
    "course-html.webp": (400, 260),
    "course-ux.webp": (400, 260),
    "mentor-1.webp": (120, 120),            # Mentor avatars - small
    "mentor-2.webp": (120, 120),
    "mentor-3.webp": (120, 120),
    "mentor-4.webp": (120, 120),
    "testimonial-1.webp": (80, 80),         # Testimonial avatars - very small
    "testimonial-2.webp": (80, 80),
    "blog-1.webp": (400, 240),              # Blog images
    "blog-2.webp": (400, 240),
    "blog-3.webp": (400, 240),
}

QUALITY = 72  # Lower quality for smaller size

count = 0
total_saved = 0

for filename, (max_w, max_h) in SIZES.items():
    filepath = os.path.join(img_dir, filename)
    if not os.path.exists(filepath):
        print(f"  Skip: {filename} (not found)")
        continue

    original_size = os.path.getsize(filepath)
    img = Image.open(filepath)

    # Resize if larger than target
    if img.width > max_w or img.height > max_h:
        img.thumbnail((max_w, max_h), Image.LANCZOS)

    # Save with lower quality
    img.save(filepath, "webp", quality=QUALITY, method=6)

    new_size = os.path.getsize(filepath)
    saved = original_size - new_size
    total_saved += saved
    count += 1
    print(f"  {filename}: {original_size//1024}KB -> {new_size//1024}KB (saved {saved//1024}KB)")

print(f"\n  Total: {count} images optimized")
print(f"  Total saved: {total_saved//1024}KB")
