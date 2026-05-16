FROM node:20-bullseye

RUN apt-get update && apt-get install -y \
    ffmpeg imagemagick libvips-dev python3 build-essential pkg-config \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund --legacy-peer-deps

COPY . .

ENV NODE_ENV=production
CMD ["node", "index.js"]
