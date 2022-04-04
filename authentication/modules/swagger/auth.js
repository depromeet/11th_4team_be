/**
 * @swagger
 *  paths:
 *    /phone/code:
 *      post:
 *        tags:
 *        - "Verification"
 *        summary: "휴대폰 인증코드 발급"
 *        parameters:
 *        - in: body
 *          name: CreateCode
 *          schema:
 *            type: object
 *            required:
 *            - phoneNumber
 *            properties:
 *              phoneNumber:
 *                type: string
 *        responses:
 *          200:
 *            description: 성공
 *            content:
 *              text/plain:
 *            schema:
 *              properties:
 *                status:
 *                  type: string
 *                  example: SUCCESS
 *                message:
 *                  type: string
 *                  example: 인증코드를 전송했습니다
 */

/**
 * @swagger
 *  paths:
 *    /phone/verification:
 *      post:
 *        tags:
 *        - "Verification"
 *        summary: "휴대폰 인증코드 일치여부 확인"
 *        parameters:
 *        - in: body
 *          name: VerifyCode
 *          schema:
 *            type: object
 *            required:
 *            - phoneNumber
 *            - verificationCode
 *            properties:
 *              phoneNumber:
 *                type: string
 *              verificationCode:
 *                type: string
 *        responses:
 *          200:
 *            description: 성공
 *            content:
 *              text/plain:
 *            schema:
 *              properties:
 *                status:
 *                  type: string
 *                  example: SUCCESS
 *                accessToken:
 *                  type: object
 *                  required:
 *                  - token
 *                  - iat
 *                  - exp
 *                  properties:
 *                    token:
 *                      type: string
 *                    iat:
 *                      type: string
 *                    exp:
 *                      type: string
 *                refreshToken:
 *                  type: object
 *                  required:
 *                  - token
 *                  - iat
 *                  - exp
 *                  properties:
 *                    token:
 *                      type: string
 *                    iat:
 *                      type: string
 *                    exp:
 *                      type: string
 */

/**
 * @swagger
 *  paths:
 *    /refresh:
 *      post:
 *        tags:
 *        - "Refresh"
 *        summary: "토큰 재발급"
 *        security:
 *          - api_key: []
 *        parameters:
 *        - in: body
 *          name: Refresh
 *          schema:
 *            type: object
 *            required:
 *            - accessToken
 *            - refreshToken
 *            properties:
 *              accessToken:
 *                type: boolean
 *              refreshToken:
 *                type: boolean
 *        responses:
 *          200:
 *            description: 성공
 *            content:
 *              text/plain:
 *            schema:
 *              properties:
 *                status:
 *                  type: string
 *                  example: SUCCESS
 *                accessToken:
 *                  type: object
 *                  required:
 *                  - token
 *                  - iat
 *                  - exp
 *                  properties:
 *                    token:
 *                      type: string
 *                    iat:
 *                      type: string
 *                    exp:
 *                      type: string
 *                refreshToken:
 *                  type: object
 *                  required:
 *                  - token
 *                  - iat
 *                  - exp
 *                  properties:
 *                    token:
 *                      type: string
 *                    iat:
 *                      type: string
 *                    exp:
 *                      type: string
 */
