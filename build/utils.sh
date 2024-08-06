find . -name ".gitignore" -exec sh -c 'for file; do cp "$file" "$(dirname "$file")/.dockerignore"; done' sh {} + 
