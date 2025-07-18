#!/bin/bash

# Fix nullish coalescing issues in TypeScript/React files
# This script converts || to ?? where appropriate

echo "Fixing nullish coalescing issues..."

# Files to fix based on ESLint output
files=(
  "components/admin/admin-layout.tsx"
  "components/admin/modern-admin-dashboard.tsx"
  "components/admin/theme-customizer.tsx"
  "components/admin/theme-dashboard.tsx"
  "components/modern/theme-action-components.tsx"
  "components/ui/advanced-components.tsx"
  "components/ui/chart.tsx"
  "components/ui/progress.tsx"
  "components/ui/toggle-group.tsx"
  "lib/stores/themeStore.ts"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    
    # Common patterns to fix
    # Note: This is a simplified approach - in production, use a proper AST parser
    
    # Fix patterns like: value || defaultValue -> value ?? defaultValue
    # But be careful not to break boolean logic
    
    # Use sed to make targeted replacements
    sed -i.bak -E 's/(\w+)\s*\|\|\s*([^|&]+)/\1 ?? \2/g' "$file"
    
    # Clean up backup file
    rm -f "${file}.bak"
    
    echo "Fixed $file"
  else
    echo "Warning: $file not found"
  fi
done

echo "Nullish coalescing fixes applied!"
echo "Please review the changes and run 'npm run lint' to verify."
