/*
  Runtime shim placeholders.

  Original `shims.d.ts` contained a large set of ambient TypeScript
  declarations used only at type-check time. We convert it to a JS
  file that preserves helpful comments and acts as a no-op at runtime.

  If you want richer runtime behavior (for testing or mocks), we can
  export concrete implementations here. For now this file intentionally
  exports nothing so it doesn't change runtime semantics.
*/

/* eslint-disable */

// NOTE: The original file declared many modules and global types for
// editor/type-checking only. Keep that behavior by using the `.d.ts`
// files when TS is needed. In a JS-only project these can be removed
// or kept as documentation.

export {};
