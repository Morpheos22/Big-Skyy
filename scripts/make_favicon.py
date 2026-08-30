#!/usr/bin/env python3
"""Generate favicon set + footer logo from the Big Skyy Marketing source PNG."""
from PIL import Image, ImageOps
from pathlib import Path

SRC = Path("/home/z/my-project/scripts/source-logo.png")
OUT = Path("/home/z/my-project/public")
OUT.mkdir(parents=True, exist_ok=True)

# Open with alpha
src = Image.open(SRC).convert("RGBA")

# The source has a white background. We want a transparent PNG favicon so it
# looks good in both light and dark browser chrome. Trim near-white pixels.
def trim_white(img: Image.Image, threshold: int = 245) -> Image.Image:
    """Convert near-white pixels to transparent."""
    rgba = img.convert("RGBA")
    datas = rgba.getdata()
    new_data = []
    for item in datas:
        r, g, b, a = item
        if r >= threshold and g >= threshold and b >= threshold:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
    rgba.putdata(new_data)
    return rgba

trimmed = trim_white(src)

# Square favicon sizes
sizes = {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "favicon-48x48.png": 48,
    "icon-192.png": 192,
    "icon-512.png": 512,
    "apple-touch-icon.png": 180,
}

for name, size in sizes.items():
    # Use LANCZOS for high-quality downscale; pad with transparent margin so the
    # logo doesn't touch edges on small favicons
    s = trimmed.copy()
    s.thumbnail((size, size), Image.LANCZOS)
    # Center on transparent square
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    offset = ((size - s.width) // 2, (size - s.height) // 2)
    canvas.paste(s, offset, s)
    canvas.save(OUT / name, "PNG")
    print(f"Wrote {name} ({size}x{size})")

# Save trimmed logo for footer use (transparent BG, max width 220)
footer = trimmed.copy()
footer.thumbnail((440, 220), Image.LANCZOS)
footer.save(OUT / "big-skyy-logo-transparent.png", "PNG")
print("Wrote big-skyy-logo-transparent.png")

# Multi-size ICO file
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
ico_src = trimmed.copy()
ico_src.save(OUT / "favicon.ico", format="ICO", sizes=ico_sizes)
print("Wrote favicon.ico")

# Also save the original (white BG) for the footer if needed
src.save(OUT / "big-skyy-logo.png", "PNG")
print("Wrote big-skyy-logo.png (original)")

print("\nDone.")
