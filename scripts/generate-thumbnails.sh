#!/bin/bash

# Generate thumbnail images for 1040 gallery
# Thumbnails are 400px wide for grid view, significantly reducing bandwidth

set -e

IMAGES_DIR="public/images/1040"
THUMB_WIDTH=400
THUMB_QUALITY=65

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Gallery Thumbnail Generator ===${NC}"
echo ""

# Counter for statistics
total_images=0
generated=0
skipped=0
total_original_size=0
total_thumb_size=0

# Find all JPG/JPEG images
while IFS= read -r -d '' img; do
  ((total_images++))

  # Generate thumbnail filename
  dir=$(dirname "$img")
  base=$(basename "$img")
  name="${base%.*}"
  ext="${base##*.}"
  thumb="${dir}/${name}_thumb.${ext}"

  # Skip if thumbnail already exists
  if [ -f "$thumb" ]; then
    ((skipped++))
    continue
  fi

  # Get original size
  if [ -f "$img" ]; then
    orig_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null || echo 0)
    ((total_original_size+=orig_size))
  fi

  # Generate thumbnail
  echo -e "${YELLOW}Generating:${NC} $thumb"
  sips -Z "$THUMB_WIDTH" -s format jpeg -s formatOptions "$THUMB_QUALITY" "$img" --out "$thumb" > /dev/null 2>&1

  # Get thumbnail size
  if [ -f "$thumb" ]; then
    thumb_size=$(stat -f%z "$thumb" 2>/dev/null || stat -c%s "$thumb" 2>/dev/null || echo 0)
    ((total_thumb_size+=thumb_size))
    ((generated++))
  fi

done < <(find "$IMAGES_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) ! -name "*_thumb.*" -print0)

# Calculate savings
if [ $total_original_size -gt 0 ]; then
  savings=$((total_original_size - total_thumb_size))
  savings_percent=$((savings * 100 / total_original_size))
else
  savings=0
  savings_percent=0
fi

# Print summary
echo ""
echo -e "${GREEN}=== Summary ===${NC}"
echo -e "Total images found:    ${BLUE}$total_images${NC}"
echo -e "Thumbnails generated:  ${GREEN}$generated${NC}"
echo -e "Already existed:       ${YELLOW}$skipped${NC}"
echo ""
echo -e "Original size:         $(numfmt --to=iec $total_original_size 2>/dev/null || echo ${total_original_size})"
echo -e "Thumbnail size:        $(numfmt --to=iec $total_thumb_size 2>/dev/null || echo ${total_thumb_size})"
echo -e "Space savings:         ${GREEN}$(numfmt --to=iec $savings 2>/dev/null || echo ${savings}) (${savings_percent}%)${NC}"
echo ""
echo -e "${GREEN}✓ Done!${NC}"
