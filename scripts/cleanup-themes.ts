#!/usr/bin/env tsx
import { cleanupThemesAction } from "../lib/actions/theme-actions"

async function runCleanup() {
  console.log("Starting theme cleanup...")
  
  try {
    const result = await cleanupThemesAction()
    
    if (result.success) {
      console.log("✅ Theme cleanup completed successfully")
      console.log(`Message: ${result.message}`)
      if (result.details) {
        console.log("Details:", JSON.stringify(result.details, null, 2))
      }
    } else {
      console.error("❌ Theme cleanup failed")
      console.error(`Error: ${result.message}`)
    }
  } catch (error) {
    console.error("❌ Unexpected error during cleanup:", error)
  }
}

runCleanup().then(() => {
  console.log("Cleanup script completed")
  process.exit(0)
}).catch((error) => {
  console.error("❌ Script failed:", error)
  process.exit(1)
})
