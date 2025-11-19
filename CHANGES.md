# Pluely - Server Independence Changes

This document summarizes all changes made to remove Pluely server dependencies and make the application fully self-hosted.

## Overview

All reliance on Pluely servers and APIs has been removed. The application now operates completely independently using only your own API keys or local LLMs.

## Changes Made

### Backend (Rust/Tauri)

#### Files Deleted
- `src-tauri/src/activate.rs` - Complete license activation/validation system removed

#### Files Modified
- `src-tauri/src/lib.rs`
  - Removed PostHog analytics integration
  - Removed 14 license/API command handlers
  - Removed activate module import
  
- `src-tauri/src/api.rs`
  - Replaced with minimal stub
  - Removed all Pluely server API functions (1000+ lines)
  - Removed: transcribe_audio, chat_stream_response, fetch_models, create_system_prompt, check_license_status, get_activity

- `src-tauri/src/shortcuts.rs`
  - Removed LicenseState struct
  - Removed set_license_status command
  - Removed license validation checks

- `src-tauri/Cargo.toml`
  - Removed tauri-plugin-posthog dependency

- `src-tauri/build.rs`
  - Removed all environment variable processing (PAYMENT_ENDPOINT, API_ACCESS_KEY, APP_ENDPOINT, POSTHOG_API_KEY)

- `src-tauri/tauri.conf.json`
  - Removed update endpoint: `https://pluely.com/api/update`
  - Cleared updater configuration

- `src-tauri/capabilities/default.json` & `cross-platform.json`
  - Removed PostHog permissions

### Frontend (React/TypeScript)

#### Files Deleted
- `src/components/GetLicense.tsx` - License purchase component
- `src/lib/analytics.ts` - PostHog tracking
- `src/lib/functions/pluely.api.ts` - Server API helper
- `src/pages/dashboard/components/PluelyApiSetup.tsx` - API configuration UI
- `src/pages/dashboard/components/Usage.tsx` - Usage analytics display
- `src/pages/system-prompts/Generate.tsx` - Server-based prompt generation (recreated as local-only)

#### Files Modified

**Context & Types:**
- `src/contexts/app.context.tsx`
  - Removed hasActiveLicense state
  - Removed pluelyApiEnabled state
  - Removed license validation
  - Removed analytics tracking
  
- `src/types/context.type.ts`
  - Removed pluelyApiEnabled, setPluelyApiEnabled, hasActiveLicense, setHasActiveLicense, getActiveLicenseStatus

- `src/types/settings.hook.ts`
  - Removed hasActiveLicense property

**API Integration:**
- `src/lib/functions/ai-response.function.ts`
  - Removed fetchPluelyAIResponse (150 lines)
  - Removed shouldUsePluelyAPI checks

- `src/lib/functions/stt.function.ts`
  - Removed fetchPluelySTT
  - Removed shouldUsePluelyAPI checks

- `src/hooks/useChatCompletion.ts`
  - Removed license checks preventing screenshot selection

**UI Components:**
- `src/components/DragButton.tsx` - Simplified to always-enabled drag
- `src/components/Promote.tsx` - Replaced with null component
- `src/pages/dashboard/index.tsx` - Simplified to independence message
- `src/pages/system-prompts/Generate.tsx` - Recreated as simple local generator
- `src/pages/shortcuts/components/shortcuts/ShortcutManager.tsx` - Removed all license restrictions
- `src/pages/settings/components/Theme.tsx` - Removed license gates
- `src/pages/screenshot/components/ScreenshotConfigs.tsx` - Enabled selection mode for all
- `src/pages/responses/index.tsx` - Removed license warning
- `src/pages/responses/components/ResponseLength.tsx` - Removed license checks
- `src/pages/responses/components/LanguageSelector.tsx` - Removed license checks
- `src/pages/responses/components/AutoScrollToggle.tsx` - Removed license checks
- `src/pages/chats/components/View.tsx` - Removed license overlay and restrictions
- `src/hooks/useSettings.ts` - Removed license parameter
- `src/hooks/useMenuItems.tsx` - Made contact support always available

**Exports:**
- `src/components/index.ts` - Removed GetLicense export
- `src/lib/functions/index.ts` - Removed pluely.api export

### Documentation

- `README.md`
  - Updated header to emphasize independence and self-hosting
  - Removed license purchase information
  - Removed activity tracking references
  - Removed premium features messaging
  - Updated Dashboard section to reflect no license requirements

## Features Now Available to All Users

All features are now available without any restrictions:

✅ Keyboard shortcut customization  
✅ Theme customization (light/dark/system)  
✅ Window transparency control  
✅ Screenshot selection mode  
✅ Response length customization  
✅ Language selection (50+ languages)  
✅ Auto-scroll control  
✅ System audio capture  
✅ Voice input  
✅ File attachments  
✅ Window dragging  
✅ All system prompts  

## What Was Removed

❌ License activation system  
❌ License validation checks  
❌ Pluely API integration (chat streaming, STT)  
❌ Activity tracking and analytics  
❌ PostHog telemetry  
❌ Server update endpoints  
❌ Usage statistics display  
❌ License purchase flows  

## Configuration Changes Required

### Environment Variables (No Longer Needed)
The following environment variables are no longer required:
- `PAYMENT_ENDPOINT`
- `API_ACCESS_KEY`
- `APP_ENDPOINT`
- `POSTHOG_API_KEY`

### User Configuration
Users only need to configure:
1. Their preferred AI provider (OpenAI, Anthropic, Google, xAI, Mistral, Groq, Ollama, or custom)
2. Their API key for the chosen provider
3. Optional: STT provider for voice input

## Privacy Improvements

- ✅ Zero telemetry - No analytics or tracking
- ✅ No server communication - Direct API calls to user's chosen provider only
- ✅ No license validation - No need to contact external servers
- ✅ Fully offline-capable - All features work without internet (except AI API calls)
- ✅ Complete data ownership - Everything stored locally

## Build Instructions

```bash
# Install dependencies
npm install

# Development
npm run tauri dev

# Production build
npm run tauri build
```

No environment variables are required for building.

## Migration Notes

Users upgrading from a version with license requirements:
- All features are immediately available
- No license key needed
- Previous license data will be ignored
- All local data (conversations, settings) remains intact

## Technical Details

### Removed Tauri Commands
- `activate_license`
- `deactivate_license`
- `get_license_status`
- `delete_license`
- `set_license_status`
- `get_pluely_api_enabled`
- `set_pluely_api_enabled`
- `transcribe_audio_pluely`
- `chat_stream_response_pluely`
- `fetch_pluely_models`
- `create_system_prompt_pluely`
- `check_license_status_pluely`
- `get_activity_pluely`
- `get_checkout_url`

### Removed Dependencies
- `tauri-plugin-posthog`

### Modified Configuration
- Updater endpoints cleared in `tauri.conf.json`
- PostHog permissions removed from capabilities

## Testing Checklist

✅ All features accessible without restrictions  
✅ No license validation errors  
✅ No server communication attempts  
✅ Screenshot selection mode works  
✅ Theme customization works  
✅ Keyboard shortcuts customizable  
✅ Response settings work  
✅ Dashboard shows independence message  
✅ Chat functionality works with user's API  
✅ Voice input works with configured STT  
✅ System audio capture works  

## Support

For issues or questions, refer to:
- GitHub Issues: https://github.com/iamsrikanthnani/pluely/issues
- GitHub Discussions: https://github.com/iamsrikanthnani/pluely/discussions

---

**Note:** This version is fully independent and self-hosted. All AI processing requires your own API keys from providers like OpenAI, Anthropic, Google, etc., or a local LLM setup.
