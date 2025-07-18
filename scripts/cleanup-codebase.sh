#!/bin/bash

echo "🚀 Starting comprehensive codebase cleanup..."

# 1. Run ESLint with auto-fix
echo "1. Running ESLint auto-fix..."
npm run lint:fix

# 2. Remove unused imports with ESLint
echo "2. Removing unused imports..."
npx eslint --fix --ext .ts,.tsx --rule "unused-imports/no-unused-imports: error" .

# 3. Fix TypeScript issues
echo "3. Checking TypeScript..."
npx tsc --noEmit

# 4. Find and list unused exports
echo "4. Finding unused exports..."
npx ts-prune | grep -v "used in module" > unused-exports.txt
echo "Unused exports saved to unused-exports.txt"

# 5. Check for duplicate files
echo "5. Checking for potential duplicate files..."
find . -name "*.tsx" -o -name "*.ts" | grep -E "(use-mobile|use-toast|themeStore)" | sort

# 6. Clean up build artifacts
echo "6. Cleaning build artifacts..."
rm -rf .next
rm -rf node_modules/.cache

# 7. Check for unused dependencies
echo "7. Checking for unused dependencies..."
if command -v depcheck &> /dev/null; then
    depcheck --json > unused-deps.json
    echo "Unused dependencies saved to unused-deps.json"
else
    echo "Install depcheck to check unused dependencies: npm install -g depcheck"
fi

# 8. Format code
echo "8. Formatting code..."
if command -v prettier &> /dev/null; then
    npx prettier --write . --ignore-path .gitignore
else
    echo "Prettier not found, skipping formatting"
fi

echo "✅ Cleanup complete!"
echo "📄 Check unused-exports.txt for unused code"
echo "📄 Check unused-deps.json for unused dependencies"
echo "🔍 Run 'npm run lint' to verify remaining issues"
