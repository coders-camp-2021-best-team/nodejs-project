import Joi from 'joi';

export const LoggingLevels = {
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5
};

export interface EnvVariables {
    NODE_ENV: 'production' | 'development';
    LOGGING_LEVEL: string;
    PORT: number;
    SESSION_SECRET: string;
    REDIS_URL?: string;
    REDIS_TLS_URL?: string;
    SMTP_USERNAME?: string;
    SMTP_PASSWORD?: string;
    CLIENT_URL: string;
    API_URL: string;
}

const envSchema = Joi.object<EnvVariables>({
    NODE_ENV: Joi.string()
        .valid('production', 'development')
        .default('development'),
    LOGGING_LEVEL: Joi.alternatives().conditional('NODE_ENV', {
        is: 'development',
        then: Joi.string()
            .valid(...Object.keys(LoggingLevels))
            .default('debug'),
        otherwise: Joi.string()
            .valid(...Object.keys(LoggingLevels))
            .default('info')
    }),
    PORT: Joi.number().port().default(3000),
    SESSION_SECRET: Joi.string().required().min(16),
    REDIS_URL: Joi.string().optional().uri(),
    REDIS_TLS_URL: Joi.string().optional().uri(),
    SMTP_USERNAME: Joi.string().optional(),
    SMTP_PASSWORD: Joi.string().optional(),
    CLIENT_URL: Joi.string().required().uri(),
    API_URL: Joi.string().required().uri()
}).unknown();

const validated = envSchema.validate(process.env);

if (validated.error) {
    throw new Error(validated.error.message);
}

export default validated.value;
