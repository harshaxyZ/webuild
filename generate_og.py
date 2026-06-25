import os
import urllib.request
import re
from PIL import Image, ImageDraw, ImageFont

def main():
    regular_font_path = "Outfit-Regular.ttf"
    bold_font_path = "Outfit-Bold.ttf"

    # Create a 1200x630 dark canvas matching the website background
    width = 1200
    height = 630
    img = Image.new("RGB", (width, height), "#0a0a0a")
    draw = ImageDraw.Draw(img)

    # 1. Draw the subtle grid background (60px grid lines)
    grid_color = "#181818" # Dark grid color
    grid_size = 60
    for x in range(0, width, grid_size):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, grid_size):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)

    # Load fonts
    if os.path.exists(bold_font_path):
        font_logo = ImageFont.truetype(bold_font_path, 80)
        font_title = ImageFont.truetype(bold_font_path, 105)
    else:
        font_logo = ImageFont.load_default()
        font_title = ImageFont.load_default()

    # 2. Calculate centering for Squircle logo + "we build" text
    logo_size = 140
    gap = 40
    
    title_text = "we build"
    title_bbox = draw.textbbox((0, 0), title_text, font=font_title)
    title_w = title_bbox[2] - title_bbox[0]
    title_h = title_bbox[3] - title_bbox[1]
    
    total_w = logo_size + gap + title_w
    start_x = (width - total_w) / 2
    start_y = (height - logo_size) / 2

    # 3. Draw the white squircle logo block
    squircle_box = [start_x, start_y, start_x + logo_size, start_y + logo_size]
    draw.rounded_rectangle(squircle_box, radius=32, fill="white")

    # 4. Draw black "w" inside the squircle
    w_text = "w"
    w_bbox = draw.textbbox((0, 0), w_text, font=font_logo)
    w_w = w_bbox[2] - w_bbox[0]
    w_h = w_bbox[3] - w_bbox[1]
    # Adjust for letter alignment offset in typography
    w_x = start_x + (logo_size - w_w) / 2 - 2
    w_y = start_y + (logo_size - w_h) / 2 - 12
    draw.text((w_x, w_y), w_text, fill="black", font=font_logo)

    # 5. Draw "we build" text in bold white
    title_x = start_x + logo_size + gap
    # Align text vertically with the logo block
    title_y = start_y + (logo_size - title_h) / 2 - 12
    draw.text((title_x, title_y), title_text, fill="white", font=font_title)

    # Save to public/og-image.png
    dest_path = os.path.join("public", "og-image.png")
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    img.save(dest_path, "PNG")
    print(f"Generated and saved successfully to {dest_path}")

if __name__ == "__main__":
    main()
