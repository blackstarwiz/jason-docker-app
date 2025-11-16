from node:alpine
workdir /app
copy app.js /app
run npm init -y && npm install express mongodb
CMD [ "node", "app.js" ]
expose 3000

