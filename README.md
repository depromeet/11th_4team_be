# 11th_4team_be
---

⚽️티키타카⚽️ ( 같은 공간내 채팅 서비스 )


---
## init 🌟

- 메인 디렉토리에 .env 환경변수 설정
- 메인 디렉토리에서 husky 관련 설치 ( pre-commit husky 용 )
```shell
 npm ci
```
- 개발 환경 실행
```shell
docker-compose  -f docker-compose.dev.yml up
```
---
## 개발환경 🔨

dev.도커 파일로 개발환경을 세팅
nodemon으로 실행

```shell
docker-compose  -f docker-compose.dev.yml up
```

docker 파일이나 nginx 설정등 변화가 생겨서 도커를 다시 빌드 해야할 때

```shell
docker-compose -f docker-compose.dev.yml up --build
```

### 환경변수

main 디렉토리 .env 파일로 docker-compose yml 파일로 집어넣어준다.

예시

```yaml
environment:
  MONGO_URI: ${MONGO_URI}
```



## 동료 😎

<table>
    <tr align="center">
        <td><B>대빵님<B></td>
        <td><B>팀원<B></td>
        <td><B>팀원<B></td>
    </tr>
    <tr align="center">
        <td><B>김우진<B></td>
        <td><B>김민재<B></td>
        <td><B>이찬진<B></td>
    </tr>
    <tr align="center">
        <td>
            <img src="https://github.com/jinnuae40.png?size=100">
            <br>
            <a href="https://github.com/jinnuae40"><I>jinnuae40</I></a>
        </td>
        <td>
            <img src="https://github.com/minjamie.png?size=100">
            <br>
            <a href="https://github.com/minjamie"><I>minjamie</I></a>
        </td>
        <td>
            <img src="https://github.com/ImNM.png?size=100">
            <br>
            <a href="https://github.com/ImNM"><I>ImNM</I></a>
        </td>
    </tr>
</table>