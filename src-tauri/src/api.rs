// Simplified API module without Pluely server dependencies
// All AI and STT processing is done using user's own API keys or local LLMs

use serde::{Deserialize, Serialize};

// Placeholder structs to maintain compatibility
#[derive(Debug, Serialize, Deserialize)]
pub struct AudioResponse {
    pub success: bool,
    pub transcription: Option<String>,
    pub error: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChatResponse {
    pub success: bool,
    pub message: Option<String>,
    pub error: Option<String>,
}

// Note: All AI and STT functionality is now handled by user-configured providers
// No server calls are made - everything uses user's own API keys or local LLMs
