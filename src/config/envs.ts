import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    PRODUCTS_MS_HOST: string;
    PRODUCTS_MS_PORT: number;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_MS_HOST: joi.string().required(),
    PRODUCTS_MS_PORT: joi.number().required()
}).unknown(true);

const { error, value } = envsSchema.validate( process.env )

if( error ){
    throw new Error(`Error en la validación de la configuración. Error: ${ error.message }`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    products_ms_host: envVars.PRODUCTS_MS_HOST,
    products_ms_port: envVars.PRODUCTS_MS_PORT
}