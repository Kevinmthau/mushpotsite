#!/bin/bash

# Script to optimize all images in the 1040 gallery for web use
# Target: reduce files larger than 800KB to reasonable web sizes

cd /Users/kevinthau/mushpotsite/public/images/1040

echo "Starting 1040 image optimization..."
echo "Finding images larger than 800KB..."

# Count initial large files
large_files_count=$(find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.heic" -o -iname "*.png" \) -exec ls -la {} \; | awk '$5 > 819200' | wc -l)
echo "Found $large_files_count images larger than 800KB"

# Function to compress a single image
compress_image() {
    local file="$1"
    local size=$(ls -la "$file" | awk '{print $5}')
    
    if [ $size -gt 819200 ]; then
        echo "Compressing: $file ($(du -h "$file" | cut -f1))"
        
        # Determine output format and compression
        if [[ "$file" == *.HEIC ]]; then
            # Convert HEIC to JPEG with compression
            local output="${file%.HEIC}.jpg"
            sips -s format jpeg -s formatOptions 65 "$file" --out "$output"
            if [ $? -eq 0 ]; then
                rm "$file"
                echo "  → Converted to JPEG: $output"
            fi
        elif [[ "$file" == *.jpg ]] || [[ "$file" == *.jpeg ]] || [[ "$file" == *.JPEG ]]; then
            # Compress existing JPEG
            local temp_file="${file%.jpg}_temp.jpg"
            sips -s format jpeg -s formatOptions 65 "$file" --out "$temp_file"
            if [ $? -eq 0 ]; then
                mv "$temp_file" "$file"
                echo "  → Compressed JPEG: $file"
            fi
        elif [[ "$file" == *.png ]] || [[ "$file" == *.PNG ]]; then
            # Convert PNG to JPEG if large
            local output="${file%.png}.jpg"
            sips -s format jpeg -s formatOptions 75 "$file" --out "$output"
            if [ $? -eq 0 ]; then
                rm "$file"
                echo "  → Converted PNG to JPEG: $output"
            fi
        fi
    fi
}

# Export the function so it can be used with find -exec
export -f compress_image

# Find and compress all large images (excluding backup directory initially)
find . -path "./backup" -prune -o -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.heic" -o -iname "*.png" \) -print | while read file; do
    compress_image "$file"
done

echo ""
echo "Optimization complete!"

# Show final statistics
final_large_files=$(find . -path "./backup" -prune -o -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.heic" -o -iname "*.png" \) -exec ls -la {} \; | awk '$5 > 819200' | wc -l)
echo "Large files remaining (excluding backup): $final_large_files"

# Show total directory sizes
echo ""
echo "Directory sizes:"
echo "Total 1040 directory: $(du -hs . | cut -f1)"
echo "Active images (excluding backup): $(du -hs --exclude=backup . | cut -f1)"
echo "Backup directory: $(du -hs backup | cut -f1)"