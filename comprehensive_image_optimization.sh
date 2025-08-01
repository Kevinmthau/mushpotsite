#!/bin/bash

cd /Users/kevinthau/mushpotsite/public/images/1040

echo "🚀 Starting comprehensive image optimization for web display..."
echo "=================================================="

# Step 1: Convert any remaining uppercase JPEG files and optimize them
echo ""
echo "📸 Converting and optimizing JPEG files..."
find . -path "./backup" -prune -o -type f -name "*.JPEG" -print | while read -r file; do
    output="${file%.JPEG}.jpg"
    size=$(ls -la "$file" | awk '{print $5}')
    
    echo "Converting: $file ($(echo "scale=1; $size / 1024" | bc)KB)"
    
    # Convert JPEG to jpg with optimization
    sips -s format jpeg -s formatOptions 60 "$file" --out "$output" 2>/dev/null
    if [ $? -eq 0 ] && [ -f "$output" ]; then
        rm "$file"
        new_size=$(ls -la "$output" | awk '{print $5}')
        echo "  ✓ Converted to $(echo "scale=1; $new_size / 1024" | bc)KB"
    else
        echo "  ✗ Failed to convert"
    fi
done

# Step 2: Optimize all JPG files that are still too large (>300KB)
echo ""
echo "🔧 Optimizing large JPG files (>300KB)..."
find . -path "./backup" -prune -o -type f -name "*.jpg" -exec ls -la {} \; | awk '$5 > 307200 {print $NF}' | while read -r file; do
    size=$(ls -la "$file" | awk '{print $5}')
    echo "Optimizing: $file ($(echo "scale=1; $size / 1024" | bc)KB)"
    
    # Choose quality based on file size
    if [ "$size" -gt 2097152 ]; then  # >2MB
        quality=30
    elif [ "$size" -gt 1048576 ]; then  # >1MB
        quality=40
    elif [ "$size" -gt 512000 ]; then  # >500KB
        quality=50
    else
        quality=60
    fi
    
    temp_file="${file%.*}_optimized.jpg"
    sips -s format jpeg -s formatOptions "$quality" "$file" --out "$temp_file" 2>/dev/null
    if [ $? -eq 0 ] && [ -f "$temp_file" ]; then
        mv "$temp_file" "$file"
        new_size=$(ls -la "$file" | awk '{print $5}')
        echo "  ✓ Reduced to $(echo "scale=1; $new_size / 1024" | bc)KB (quality: $quality%)"
    else
        [ -f "$temp_file" ] && rm "$temp_file"
        echo "  ✗ Optimization failed"
    fi
done

# Step 3: Handle any PNG files
echo ""
echo "🖼️  Converting PNG files to optimized JPG..."
find . -path "./backup" -prune -o -type f -name "*.png" -print | while read -r file; do
    output="${file%.png}.jpg"
    size=$(ls -la "$file" | awk '{print $5}')
    
    echo "Converting PNG: $file ($(echo "scale=1; $size / 1024" | bc)KB)"
    
    sips -s format jpeg -s formatOptions 75 "$file" --out "$output" 2>/dev/null
    if [ $? -eq 0 ] && [ -f "$output" ]; then
        rm "$file"
        new_size=$(ls -la "$output" | awk '{print $5}')
        echo "  ✓ Converted to JPG: $(echo "scale=1; $new_size / 1024" | bc)KB"
    else
        echo "  ✗ Failed to convert PNG"
    fi
done

echo ""
echo "📊 Final Statistics:"
echo "==================="

# Count files by extension
echo "File types:"
find . -path "./backup" -prune -o -type f -name "*" -print | sed 's/.*\.//' | sort | uniq -c

# Show large files remaining
large_files=$(find . -path "./backup" -prune -o -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -exec ls -la {} \; | awk '$5 > 307200' | wc -l)
echo "Files still >300KB: $large_files"

# Show directory size
total_size=$(du -hs . | cut -f1)
active_size=$(du -hs --exclude=backup . 2>/dev/null | cut -f1 || du -hs . | cut -f1)
echo "Total directory size: $total_size"
echo "Active images size: $active_size"

echo ""
echo "✅ Comprehensive optimization complete!"