// env.js: replacement for env.d.ts reference. No runtime behavior.
/*
  The original `env.d.ts` referenced `./src/types/shims.d.ts` for editor
  type hints. We import the runtime placeholder so the module exists.
*/
import './src/types/shims.js';

export {};
