#!/bin/bash

# Fix nullish coalescing issues in all TypeScript files
echo "Fixing nullish coalescing issues..."

find . -name "*.ts" -o -name "*.tsx" -not -path "./node_modules/*" -not -path "./.next/*" | while read file; do
  # Replace || with ?? for default values (simple cases)
  sed -i 's/\([a-zA-Z_][a-zA-Z0-9_]*\) || \([a-zA-Z_][a-zA-Z0-9_]*\)/\1 ?? \2/g' "$file"
  sed -i 's/\([a-zA-Z_][a-zA-Z0-9_]*\) || \([0-9"'"'"'`][^)]*\)/\1 ?? \2/g' "$file"
  
  # Replace || with ?? for more complex expressions
  sed -i 's/\([a-zA-Z_][a-zA-Z0-9_]*\.[a-zA-Z_][a-zA-Z0-9_]*\) || \([a-zA-Z_][a-zA-Z0-9_]*\)/\1 ?? \2/g' "$file"
  sed -i 's/\([a-zA-Z_][a-zA-Z0-9_]*\.[a-zA-Z_][a-zA-Z0-9_]*\) || \([0-9"'"'"'`][^)]*\)/\1 ?? \2/g' "$file"
  
  # Replace || with ?? for property access
  sed -i 's/\([a-zA-Z_][a-zA-Z0-9_]*\?\.[a-zA-Z_][a-zA-Z0-9_]*\) || \([a-zA-Z_][a-zA-Z0-9_]*\)/\1 ?? \2/g' "$file"
  sed -i 's/\([a-zA-Z_][a-zA-Z0-9_]*\?\.[a-zA-Z_][a-zA-Z0-9_]*\) || \([0-9"'"'"'`][^)]*\)/\1 ?? \2/g' "$file"
done

echo "Done fixing nullish coalescing issues!"
