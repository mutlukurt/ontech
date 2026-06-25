"""
Build script: Concatenate and minify all CSS modules into single file.
Removes @import statements, comments, and unnecessary whitespace.
"""
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
CSS_DIR = os.path.join(ROOT, "src", "css")
OUT_FILE = os.path.join(ROOT, "src", "css", "bundle.css")

# Import order (must match main.css)
IMPORT_ORDER = [
    "abstracts/variables.css",
    "abstracts/animations.css",
    "base/reset.css",
    "base/typography.css",
    "components/buttons.css",
    "components/cards.css",
    "components/badges.css",
    "components/forms.css",
    "components/navigation.css",
    "components/carousel.css",
    "sections/header.css",
    "sections/hero.css",
    "sections/stats.css",
    "sections/courses.css",
    "sections/features.css",
    "sections/categories.css",
    "sections/mentors.css",
    "sections/testimonials.css",
    "sections/blog.css",
    "sections/footer.css",
    "utilities.css",
    "responsive.css",
]


def minify_css(content):
    """Remove comments, extra whitespace, and newlines."""
    # Remove comments
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    # Remove @import lines
    content = re.sub(r'@import\s+[^;]+;', '', content)
    # Remove extra whitespace
    content = re.sub(r'\s+', ' ', content)
    # Remove spaces around special chars
    content = re.sub(r'\s*([{}:;,>])\s*', r'\1', content)
    # Remove trailing semicolons before }
    content = re.sub(r';}', '}', content)
    # Remove last semicolon
    content = re.sub(r';\n}', '}', content)
    return content.strip()


def main():
    all_css = ""

    for css_file in IMPORT_ORDER:
        file_path = os.path.join(CSS_DIR, css_file)
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Remove @import statements from content
                content = re.sub(r'@import\s+[^;]+;', '', content)
                all_css += "\n/* " + css_file + " */\n" + content
        else:
            print(f"  Warning: {css_file} not found")

    # Minify
    minified = minify_css(all_css)

    # Add font import at top (with display=swap)
    font_import = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');"
    minified = font_import + minified

    # Write output
    with open(OUT_FILE, 'w', encoding='utf-8') as f:
        f.write(minified)

    original_size = len(all_css.encode('utf-8'))
    minified_size = len(minified.encode('utf-8'))
    reduction = round((1 - minified_size / original_size) * 100, 1)

    print(f"  Original: {original_size:,} bytes")
    print(f"  Minified: {minified_size:,} bytes")
    print(f"  Reduction: {reduction}%")
    print(f"  Output: {OUT_FILE}")


if __name__ == "__main__":
    main()
