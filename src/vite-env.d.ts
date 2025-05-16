/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_VERSION: string;
	readonly VITE_MODE: string;

	readonly VITE_LOG_ERROR: boolean;
	readonly VITE_LOG_WARN: boolean;

	readonly VITE_PORTAL_API_ENDPOINT: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
