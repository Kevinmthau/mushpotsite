#!/bin/bash

# Script to compress remaining large files in 1040 gallery
cd /Users/kevinthau/mushpotsite/public/images/1040

echo "Starting compression of remaining large files (>800KB)..."

# Create a temporary file to store list of large files
temp_file=$(mktemp)
find . -path "./backup" -prune -o -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.heic" -o -iname "*.png" \) -exec ls -la {} \; | awk '$5 > 819200 {print $NF}' > "$temp_file"

total_files=$(wc -l < "$temp_file")
echo "Found $total_files files to compress"

counter=0
while IFS= read -r file; do
    counter=$((counter + 1))
    size=$(ls -la "$file" 2>/dev/null | awk '{print $5}')
    
    if [ -z "$size" ] || [ "$size" -le 819200 ]; then
        continue
    fi
    
    echo "[$counter/$total_files] Compressing: $file ($(echo "scale=1; $size / 1024 / 1024" | bc)MB)"
    
    if [[ "$file" == *.jpg ]] || [[ "$file" == *.jpeg ]] || [[ "$file" == *.JPEG ]]; then
        # Use more aggressive compression for large files
        if [ "$size" -gt 2097152 ]; then  # >2MB
            quality=45
        elif [ "$size" -gt 1048576 ]; then  # >1MB
            quality=50
        else
            quality=60
        fi
        
        temp_output="${file%.*}_temp.jpg"
        sips -s format jpeg -s formatOptions "$quality" "$file" --out "$temp_output" 2>/dev/null
        if [ $? -eq 0 ] && [ -f "$temp_output" ]; then
            mv "$temp_output" "$file"
            new_size=$(ls -la "$file" | awk '{print $5}')
            echo "  → Compressed to $(echo "scale=1; $new_size / 1024 / 1024" | bc)MB (quality: $quality%)"
        else
            echo "  → Failed to compress"
            [ -f "$temp_output" ] && rm "$temp_output"
        fi
        
    elif [[ "$file" == *.HEIC ]]; then
        output="${file%.HEIC}.jpg"
        sips -s format jpeg -s formatOptions 55 "$file" --out "$output" 2>/dev/null
        if [ $? -eq 0 ] && [ -f "$output" ]; then
            rm "$file"
            echo "  → Converted HEIC to JPEG: $output"
        else
            echo "  → Failed to convert HEIC"
        fi
        
    elif [[ "$file" == *.png ]] || [[ "$file" == *.PNG ]]; then
        output="${file%.*}.jpg"
        sips -s format jpeg -s formatOptions 75 "$file" --out "$output" 2>/dev/null
        if [ $? -eq 0 ] && [ -f "$output" ]; then
            rm "$file"
            echo "  → Converted PNG to JPEG: $output"
        else
            echo "  → Failed to convert PNG"
        fi
    fi
    
    # Small delay to prevent overwhelming the system
    sleep 0.1
done < "$temp_file"

# Cleanup
rm "$temp_file"

echo ""
echo "Compression complete!"
final_large_files=$(find . -path "./backup" -prune -o -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.heic" -o -iname "*.png" \) -exec ls -la {} \; | awk '$5 > 819200' | wc -l)
echo "Large files remaining: $final_large_files"

# Show directory size
echo "Total 1040 directory size: $(du -hs . | cut -f1)"