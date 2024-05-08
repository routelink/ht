

export const swagger = {
    definition: {
        openapi: '3.0.0',
        title: 'test',
        info: {
            title: 'DevelopmentAggregator API',
            description: `### DevelopmentAggregator API`,
            version: '0.0.1',
        },
        components: {
            securitySchemes: {
                Authorization: {
                    type: 'apiKey',
                    name: 'Authorization',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    in: 'header',
                }
            }
        },
        security: [{
            Authorization: []
        }]
    },

    apis: ['src/routes/**/*.ts', 'src/models/**/*.ts'],
};

export const swaggerUI = {
    customSiteTitle: `${swagger.definition.info.title} - v${swagger.definition.info.version}`,
    //customCss: '.swagger-ui .topbar { display: none }'
}