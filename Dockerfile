FROM node:16-alpine
ENV NODE_ENV production

WORKDIR /app
COPY server/dist/ ./server
COPY dist/ ./dist


USER root
RUN chown -R apprunner:apprunner /app

WORKDIR /app
EXPOSE 3000
CMD ["node", "server/index.js"]
