# Utilise la dernière version LTS officielle de Node.js
FROM node:22.20.0

# Installe Yarn globalement
RUN corepack enable && corepack prepare yarn@stable --activate

RUN mkdir /home/node/app
WORKDIR /home/node/app
RUN chown node:node /home/node/app

# Passe à l'utilisateur non-root
USER node

#RUN [bash]