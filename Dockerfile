FROM node:20.11.0-slim
RUN yarn global add htpasswd@2.4.6
ENV LANG=ja_JP.UTF-8
ENV TZ=Asia/Tokyo
WORKDIR /app
COPY . /app
COPY package.json /app/
COPY ./run.sh /app/
RUN chmod +x /app/run.sh
CMD ["sh", "./run.sh"]