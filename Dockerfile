# Install development deps
FROM node:lts-alpine as development-install
WORKDIR /usr/react-tdd
COPY package.json package-lock.json ./
RUN npm install

# Run development build
FROM node:lts-alpine as development
EXPOSE 5173
WORKDIR /usr/react-tdd
COPY --from=development-install /usr/react-tdd/. .

# The default command (ignore)
CMD [""]