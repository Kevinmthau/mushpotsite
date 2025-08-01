#!/bin/bash

cd /Users/kevinthau/mushpotsite/public/images/1040

echo "Final optimization for faster loading..."

# Convert remaining HEIC files
echo "Converting remaining HEIC files to JPG..."
find . -path "./backup" -prune -o -type f -name "*.HEIC" -print | while read -r file; do
    output="${file%.HEIC}.jpg"
    echo "Converting: $file → $output"
    sips -s format jpeg -s formatOptions 55 "$file" --out "$output" 2>/dev/null
    if [ $? -eq 0 ] && [ -f "$output" ]; then
        rm "$file"
        echo "  ✓ Converted and removed original"
    else
        echo "  ✗ Failed to convert"
    fi
done

# Aggressive compression on files still >400KB
echo ""
echo "Applying aggressive compression to large files..."
find . -path "./backup" -prune -o -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -exec ls -la {} \; | awk '$5 > 409600 {print $NF}' | while read -r file; do
    size=$(ls -la "$file" | awk '{print $5}')
    echo "Compressing large file: $file ($(echo "scale=1; $size / 1024" | bc)KB)"
    
    temp_file="${file%.*}_compressed.jpg"
    sips -s format jpeg -s formatOptions 35 "$file" --out "$temp_file" 2>/dev/null
    if [ $? -eq 0 ] && [ -f "$temp_file" ]; then
        mv "$temp_file" "$file"
        new_size=$(ls -la "$file" | awk '{print $5}')
        echo "  → Reduced to $(echo "scale=1; $new_size / 1024" | bc)KB"
    else
        [ -f "$temp_file" ] && rm "$temp_file"
        echo "  ✗ Compression failed"
    fi
done

echo ""
echo "Final statistics:"
large_files=$(find . -path "./backup" -prune -o -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.heic" -o -iname "*.png" \) -exec ls -la {} \; | awk '$5 > 409600' | wc -l)
heic_files=$(find . -path "./backup" -prune -o -name "*.HEIC" -print | wc -l)
echo "Files >400KB: $large_files"
echo "HEIC files remaining: $heic_files"
echo "Total directory size: $(du -hs . | cut -f1)"