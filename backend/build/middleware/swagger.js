'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerOption = {
    swaggerDefinition: {
        // 정보
        info: {
            title: 'Node.js + Express + MongoDB',
            version: '1.0.0',
            description: 'Node.js Express API Server.'
        },
        contact: {
            email: "kstmdev@gmail.com"
        },
        // 각 api에서 설명을 기록할 때 사용할 constant들을 미리 등록해놓는것
        components: {
            res: {
                BadRequest: {
                    description: '잘못된 요청.',
                    schema: {
                        $ref: '#/components/errorResult/Error'
                    }
                },
                Forbidden: {
                    description: '권한이 없슴.',
                    schema: {
                        $ref: '#/components/errorResult/Error'
                    }
                },
                NotFound: {
                    description: '없는 리소스 요청.',
                    schema: {
                        $ref: '#/components/errorResult/Error'
                    }
                }
            },
            errorResult: {
                Error: {
                    type: 'object',
                    properties: {
                        resultCode: 'integer',
                        resultMessage: {
                            type: 'string',
                            description: '에러 메시지 전달.'
                        }
                    }
                }
            }
        },
        schemes: ["http", "https"],
        definitions: // 모델 정의 (모델에서 사용되는 속성 정의)
        {
            'Webhook': {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string'
                    },
                    authCookie: {
                        type: 'string'
                    },
                    category: {
                        type: 'string'
                    },
                    roomId: {
                        type: 'string'
                    },
                    roomName: {
                        type: 'string'
                    },
                    senderId: {
                        type: 'string'
                    }
                }
            }
        }
    },
    apis: [
        './**/router.ts'
    ] // api 파일 위치들
};
exports.swaggerSpec = swaggerJSDoc(swaggerOption);
