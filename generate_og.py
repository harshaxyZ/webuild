import os
import urllib.request
import re
from PIL import Image, ImageDraw, ImageFont

def main():
    regular_font_path = "Outfit-Regular.ttf"
    bold_font_path = "Outfit-Bold.ttf"

    # Download fonts if they don't exist
    if not os.path.exists(regular_font_path) or not os.path.exists(bold_font_path):
        try:
            print("Downloading Outfit font from Google Fonts...")
            headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
            
            # Fetch css to get ttf files
            req = urllib.request.Request("https://fonts.googleapis.com/css2?family=Outfit:wght@400;700", headers=headers)
            with urllib.request.urlopen(req) as response:
                css = response.read().decode('utf-8')
            
            # Find all font urls
            urls = re.findall(r'url\((https://fonts\.gstatic\.com/s/[^)]+\.ttf)\)', css)
            
            if len(urls) >= 2:
                # The CSS rules contain regular and bold
                # Let's download the files
                urllib.request.urlretrieve(urls[0], regular_font_path)
                urllib.request.urlretrieve(urls[1], bold_font_path)
                print("Fonts downloaded.")
            else:
                # Fallback URL if regex parser is strict
                print("Using fallback URLs...")
                urllib.request.urlretrieve("https://github.com/google/fonts/raw/main/ofl/outfit/Outfit%5Bwght%5D.ttf", regular_font_path)
                bold_font_path = regular_font_path
        except Exception as e:
            print("Could not download Google Font, using default Pillow font:", e)
            regular_font_path = None
            bold_font_path = None

    # Create a 1200x630 white canvas
    width = 1200
    height = 630
    img = Image.new("RGB", (width, height), "white")
    draw = ImageDraw.Draw(img)

    # Load fonts
    if regular_font_path and os.path.exists(regular_font_path):
        font_logo = ImageFont.truetype(bold_font_path, 160)
        font_title = ImageFont.truetype(bold_font_path, 56)
        font_sub = ImageFont.truetype(regular_font_path, 26)
    else:
        # Fallback to default
        font_logo = ImageFont.load_default()
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    # Draw centered elements
    # 1. Draw big black "w" logo in the center top
    logo_text = "w"
    logo_bbox = draw.textbbox((0, 0), logo_text, font=font_logo)
    logo_w = logo_bbox[2] - logo_bbox[0]
    logo_h = logo_bbox[3] - logo_bbox[1]
    logo_x = (width - logo_w) / 2
    logo_y = 130 # top margin

    draw.text((logo_x, logo_y), logo_text, fill="black", font=font_logo)

    # 2. Draw "we build" in bold below it
    title_text = "we build"
    title_bbox = draw.textbbox((0, 0), title_text, font=font_title)
    title_w = title_bbox[2] - title_bbox[0]
    title_h = title_bbox[3] - title_bbox[1]
    title_x = (width - title_w) / 2
    title_y = logo_y + logo_h + 60 # gap of 60px

    draw.text((title_x, title_y), title_text, fill="black", font=font_title)

    # 3. Draw description "Premium Digital Products" below it
    sub_text = "Premium Digital Products"
    sub_bbox = draw.textbbox((0, 0), sub_text, font=font_sub)
    sub_w = sub_bbox[2] - sub_bbox[0]
    sub_h = sub_bbox[3] - sub_bbox[1]
    sub_x = (width - sub_w) / 2
    sub_y = title_y + title_h + 30 # gap of 30px

    draw.text((sub_x, sub_y), sub_text, fill="#666666", font=font_sub)

    # Save to public/og-image.png
    dest_path = os.path.join("public", "og-image.png")
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    img.save(dest_path, "PNG")
    print(f"Generated and saved successfully to {dest_path}")

if __name__ == "__main__":
    main()
