export interface FuturePlayServerOptions {
  PORT: number
  JwtSecret: string
  CookieSecret: string
  CORS_ORIGIN: Array<string>
  SWAGGER_USER: string
  SWAGGER_PASSWORD: string
}

export const ServerOptions: FuturePlayServerOptions = (function (): FuturePlayServerOptions {
  switch (process.env.ENV) {
    default:
      return {
        PORT: 8082,
        JwtSecret: '1234',
        CookieSecret: '2345',
        CORS_ORIGIN: ['http://localhost:3000'],
        SWAGGER_USER: 'admin',
        SWAGGER_PASSWORD: 'test1234',
      }
  }
})()

export const TIME_ZONE = 'Asia/Seoul'
