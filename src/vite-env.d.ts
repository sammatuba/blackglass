/// <reference types="vite/client" />

/* Minimal node ambient types for the P9 reachability tooling — the repo runs
   tsc over src with vite/client types only, and adding @types/node would be a
   new dependency (forbidden by the immersion run's constraints). The surface
   here is exactly what reachability.ts and its test use. */
declare module 'node:fs' {
  export function existsSync(path: string): boolean
  export function writeFileSync(path: string, data: string): void
  export function readFileSync(path: string, encoding: string): string
}
declare module 'node:path' {
  export function join(...parts: string[]): string
}
declare const process: { cwd(): string }
