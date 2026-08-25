declare module 'bun' {
  interface Env {
    NODE_ENV?: 'development' | 'production' | 'test'
    HOST?: string
    PORT?: number
  }
}
