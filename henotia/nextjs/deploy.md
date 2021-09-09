# Next.js Build & Deploy

Next.js 는 내장서버를 두고 있고 이를 빌드해 자체 서버에서 실행 시키는 구조

## 배포방법

1. Vercel
2. Custom Node.js Server
3. Docker Image
4. Static HTML


### Vercel

Next.js가 기본적으로 권장하는 프로덕션 배포 방법

Next.js 자체가 Vercel이 만들었다보니 해당 부분에 대한 배포가 매우 간편함

단순히 Vercel에 가입만 하고 Git Repository를 연동만 하는것으로 끝

### Custom Node.js Server

실 사용중인 Node.js 서버와 연결해서 배포하는 방법  

Next.js에서 제공하는 파일 시스템 라우팅이 비활성화 되고  
SEO 및 UX 등에 문제가 발생할 수 있음

주로 express, koa 에 대해 마이그레이션이 제공된다

### Docker Image

Next.js를 Docker 이미지로 만들어 배포

공식 페이지에서 제공해주는 Dockerfile Sample은 아래와 같다.

```dockerfile
# Install dependencies only when needed
FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
```


### Static HTML Export

`next export`를 사용해 node.js 서버 없이 독립실행형 HTML 파일을 생성한다.

`next export` 명령어를 수행하면 나오는 `out` 디렉토리를 그대로 사용하면 된다.

이미지 최적화, API Routes, `getStaticProps()` 의 일부기능 등 많은 기능에 제약이 걸린다.

단순한 약관 같은 화면의 Export 에서나 유효하지 실제 Production 레벨에서는 불필요한 기능
