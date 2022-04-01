# 11th_4team_be

## 개발환경

dev.도커 파일로 개발환경을 세팅
nodemon으로 실행

```shell
docker-compose  -f docker-compose.dev.yml up
```

docker 파일이나 nginx 설정등 변화가 생겨서 도커를 다시 빌드 해야할 때

```shell
docker-compose -f docker-compose.dev.yml --build
docker-compose -f docker-compose.dev.yml up
```

### 환경변수

main 디렉토리 .env 파일로 docker-compose yml 파일로 집어넣어준다.

예시

```yaml
environment:
  MONGO_URI: ${MONGO_URI}
```
