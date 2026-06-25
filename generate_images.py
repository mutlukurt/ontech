"""
============================================
ONTECH - AI Image Generator (ZenMux / Gemini)
============================================
Generates all project images via ZenMux API.
Usage: python generate_images.py
"""

import os
import sys
import time
import io

# Fix Windows console encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

import os
import sys
import time
import base64
from google import genai
from google.genai import types

# ===== CONFIG =====
API_KEY = os.environ.get("ZENMUX_API_KEY", "")
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images")
MODEL = "google/gemini-3.1-flash-image"

# Style suffix for consistent realistic aesthetic across all images
STYLE_SUFFIX = (
    "Professional photograph, photorealistic, natural lighting, "
    "high quality portrait photography, realistic human features, "
    "natural skin tones, authentic expressions, sharp focus, "
    "professional studio lighting, 85mm lens, shallow depth of field, "
    "NO illustration, NO cartoon, NO vector art, NO drawing, NO painting, "
    "real photo only"
)

# ===== IMAGE PROMPTS =====
PROMPTS = [
    {
        "file": "hero-student.png",
        "prompt": (
            "A cheerful young woman with curly dark hair, wearing round glasses, "
            "holding a yellow pencil and a red notebook. She wears a blue denim shirt "
            "over a white t-shirt. Friendly smile, looking forward. "
            "Portrait orientation, centered composition. " + STYLE_SUFFIX
        )
    },
    {
        "file": "course-marketing.png",
        "prompt": (
            "A person sitting with a laptop showing colorful marketing analytics charts, "
            "bar graphs trending upward, social media icons floating around, "
            "megaphone and email symbols. Dynamic business scene. "
            "Landscape orientation. " + STYLE_SUFFIX
        )
    },
    {
        "file": "course-design.png",
        "prompt": (
            "Two creative designers collaborating at a desk with a laptop, "
            "color palette circles (red, yellow, green, blue, purple), "
            "pen tool, wireframe grids, ruler. Creative workspace scene. "
            "Landscape orientation. " + STYLE_SUFFIX
        )
    },
    {
        "file": "course-html.png",
        "prompt": (
            "A programmer at a desk with a laptop displaying colorful code lines "
            "(pink, blue, green, yellow syntax highlighting), bookshelf with colorful books "
            "in the background, coffee cup. Focused coding scene. "
            "Landscape orientation. " + STYLE_SUFFIX
        )
    },
    {
        "file": "course-ux.png",
        "prompt": (
            "A clean desk with a laptop showing UX wireframe mockup with blue and green elements, "
            "a red coffee cup with steam, yellow sticky notes, a plant, "
            "design sketchbook. Minimal UX design workspace. "
            "Landscape orientation. " + STYLE_SUFFIX
        )
    },
    {
        "file": "mentor-1.png",
        "prompt": (
            "Portrait of a friendly male teacher with short brown hair, light beard, "
            "warm smile, wearing a yellow-orange shirt. Professional headshot, "
            "centered, simple background. " + STYLE_SUFFIX
        )
    },
    {
        "file": "mentor-2.png",
        "prompt": (
            "Portrait of a professional male web developer with short dark black hair, "
            "clean shaven, confident smile, wearing a blue shirt with a dark tie. "
            "Professional headshot, centered, simple background. " + STYLE_SUFFIX
        )
    },
    {
        "file": "mentor-3.png",
        "prompt": (
            "Portrait of a friendly female programmer with long wavy brown hair, "
            "warm smile, rosy cheeks, wearing an orange shirt. "
            "Professional headshot, centered, simple background. " + STYLE_SUFFIX
        )
    },
    {
        "file": "mentor-4.png",
        "prompt": (
            "Portrait of a male physics teacher with curly dark hair, glasses, "
            "short beard, friendly expression, wearing a purple shirt. "
            "Professional headshot, centered, simple background. " + STYLE_SUFFIX
        )
    },
    {
        "file": "testimonial-1.png",
        "prompt": (
            "Portrait of a happy young female student graduate with dark hair, "
            "bright smile, wearing a blue shirt. Small circular avatar style, "
            "centered, simple background. " + STYLE_SUFFIX
        )
    },
    {
        "file": "testimonial-2.png",
        "prompt": (
            "Portrait of a cheerful young woman with brown hair, warm smile, "
            "rosy cheeks, wearing a pink shirt. Small circular avatar style, "
            "centered, simple background. " + STYLE_SUFFIX
        )
    },
    {
        "file": "blog-1.png",
        "prompt": (
            "Two people sitting together at a laptop on a desk, collaborating, "
            "a coffee cup with steam nearby, office window with soft light. "
            "Professional teamwork scene. Landscape orientation. " + STYLE_SUFFIX
        )
    },
    {
        "file": "blog-2.png",
        "prompt": (
            "A city skyline with tall office buildings of different colors "
            "(brown, gray, red, dark), lit windows in golden yellow, "
            "a small person walking on the street below. Career growth theme. "
            "Landscape orientation. " + STYLE_SUFFIX
        )
    },
    {
        "file": "blog-3.png",
        "prompt": (
            "A person sitting at a clean desk working on a laptop, "
            "a green plant pot on the right, a glowing yellow light bulb idea "
            "floating on the left, coffee cup. Productive workspace scene. "
            "Landscape orientation. " + STYLE_SUFFIX
        )
    },
]


def generate_image(client, prompt, output_path):
    """Generate a single image and save it."""
    print(f"  Generating: {os.path.basename(output_path)}")
    print(f"  Prompt: {prompt[:80]}...")

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=[prompt],
            config=types.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"]
            )
        )

        for part in response.parts:
            if part.text is not None:
                print(f"  Text response: {part.text}")
            elif part.inline_data is not None:
                image = part.as_image()
                image.save(output_path)
                print(f"  [OK] Saved: {output_path}")
                return True

        print(f"  [FAIL] No image data in response")
        return False

    except Exception as e:
        print(f"  [FAIL] Error: {e}")
        return False


def main():
    # Check API key
    if not API_KEY:
        print("ERROR: ZENMUX_API_KEY environment variable not set!")
        print("Set it with: $env:ZENMUX_API_KEY = 'your-api-key-here'")
        sys.exit(1)

    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Initialize client
    print("\n[ONTECH] Image Generator")
    print(f"   Model: {MODEL}")
    print(f"   Output: {OUTPUT_DIR}")
    print(f"   Total images: {len(PROMPTS)}")
    print("=" * 50)

    client = genai.Client(
        api_key=API_KEY,
        vertexai=True,
        http_options=types.HttpOptions(
            api_version='v1',
            base_url='https://zenmux.ai/api/vertex-ai'
        )
    )

    success_count = 0
    fail_count = 0

    for i, item in enumerate(PROMPTS, 1):
        print(f"\n[{i}/{len(PROMPTS)}] {item['file']}")
        output_path = os.path.join(OUTPUT_DIR, item["file"])

        if generate_image(client, item["prompt"], output_path):
            success_count += 1
        else:
            fail_count += 1

        # Small delay between requests
        if i < len(PROMPTS):
            time.sleep(2)

    print("\n" + "=" * 50)
    print(f"[OK] Success: {success_count}/{len(PROMPTS)}")
    if fail_count:
        print(f"[FAIL] Failed: {fail_count}/{len(PROMPTS)}")
    print("Done!\n")


if __name__ == "__main__":
    main()
