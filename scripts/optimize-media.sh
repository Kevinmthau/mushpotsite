#!/bin/bash

# Media Optimization Script for 1040 Gallery
# This script converts images to WebP and videos to optimized MP4/WebM formats
#
# Requirements:
#   - ffmpeg (for video conversion): brew install ffmpeg
#   - cwebp (for WebP conversion): brew install webp
#
# Usage: ./scripts/optimize-media.sh [directory]
#   If no directory specified, processes all of public/images/1040/

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check for required tools
check_dependencies() {
    local missing_deps=()

    if ! command -v ffmpeg &> /dev/null; then
        missing_deps+=("ffmpeg")
    fi

    if ! command -v cwebp &> /dev/null; then
        missing_deps+=("cwebp")
    fi

    if [ ${#missing_deps[@]} -ne 0 ]; then
        echo -e "${RED}Error: Missing required dependencies: ${missing_deps[*]}${NC}"
        echo -e "${YELLOW}Install with: brew install ${missing_deps[*]}${NC}"
        exit 1
    fi
}

# Convert images to WebP
convert_to_webp() {
    local input_file="$1"
    local output_file="${input_file%.*}.webp"

    if [ -f "$output_file" ]; then
        echo -e "${YELLOW}Skipping (already exists): $output_file${NC}"
        return
    fi

    echo "Converting to WebP: $input_file"
    cwebp -q 85 "$input_file" -o "$output_file"

    # Show size comparison
    local original_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file")
    local webp_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file")
    local savings=$(( (original_size - webp_size) * 100 / original_size ))

    echo -e "${GREEN}✓ Saved ${savings}% ($(numfmt --to=iec $original_size) → $(numfmt --to=iec $webp_size))${NC}"
}

# Convert video to optimized MP4
convert_video_to_mp4() {
    local input_file="$1"
    local output_file="${input_file%.*}.mp4"

    if [ -f "$output_file" ]; then
        echo -e "${YELLOW}Skipping (already exists): $output_file${NC}"
        return
    fi

    echo "Converting to MP4: $input_file"
    ffmpeg -i "$input_file" \
        -c:v libx264 \
        -preset slow \
        -crf 23 \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
        "$output_file" \
        -y \
        -loglevel error

    # Show size comparison
    local original_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file")
    local mp4_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file")
    local savings=$(( (original_size - mp4_size) * 100 / original_size ))

    echo -e "${GREEN}✓ Saved ${savings}% ($(numfmt --to=iec $original_size) → $(numfmt --to=iec $mp4_size))${NC}"
}

# Convert video to WebM
convert_video_to_webm() {
    local input_file="$1"
    local output_file="${input_file%.*}.webm"

    if [ -f "$output_file" ]; then
        echo -e "${YELLOW}Skipping (already exists): $output_file${NC}"
        return
    fi

    echo "Converting to WebM: $input_file"
    ffmpeg -i "$input_file" \
        -c:v libvpx-vp9 \
        -crf 30 \
        -b:v 0 \
        -c:a libopus \
        -b:a 128k \
        "$output_file" \
        -y \
        -loglevel error

    echo -e "${GREEN}✓ Created WebM version${NC}"
}

# Generate video poster image
generate_poster() {
    local input_file="$1"
    local output_file="${input_file%.*}_poster.jpg"

    if [ -f "$output_file" ]; then
        echo -e "${YELLOW}Skipping poster (already exists): $output_file${NC}"
        return
    fi

    echo "Generating poster: $output_file"
    ffmpeg -i "$input_file" \
        -ss 00:00:01 \
        -vframes 1 \
        -q:v 2 \
        "$output_file" \
        -y \
        -loglevel error

    echo -e "${GREEN}✓ Generated poster image${NC}"
}

# Main processing
main() {
    local target_dir="${1:-public/images/1040}"

    echo -e "${GREEN}=== Media Optimization Script ===${NC}"
    echo "Target directory: $target_dir"
    echo

    check_dependencies

    # Process images (JPG, JPEG)
    echo -e "\n${GREEN}Processing images...${NC}"
    while IFS= read -r -d '' file; do
        convert_to_webp "$file"
    done < <(find "$target_dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -print0)

    # Process videos (MOV, MP4)
    echo -e "\n${GREEN}Processing videos...${NC}"
    while IFS= read -r -d '' file; do
        # Skip if already MP4
        if [[ ! "$file" =~ \.mp4$ ]]; then
            convert_video_to_mp4 "$file"
            generate_poster "$file"
            # Optionally convert to WebM for better browser support
            # convert_video_to_webm "$file"
        fi
    done < <(find "$target_dir" -type f \( -iname "*.mov" -o -iname "*.mp4" \) -print0)

    echo -e "\n${GREEN}=== Optimization complete! ===${NC}"
}

main "$@"
