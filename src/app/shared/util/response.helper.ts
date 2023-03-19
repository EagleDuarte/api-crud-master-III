import { Response } from "express";

export const serverError = (res: Response, error: any) => {
    return res.status(501).send({
        ok: false,
        message: error.toString(),
    });
};

export const success = (res: Response, data?: any, message?: string) => {
    return res.status(200).send({
        ok: true,
        mensagem: message,
        data,
    });
};

/* Este código exporta duas funções: "serverError" e "success". A função "serverError" é responsável por enviar uma resposta HTTP
com status 501 e um objeto JSON que contém uma propriedade "ok" igual a false e uma propriedade "message" que contém a descrição do
erro. A função "success" é responsável por enviar uma resposta HTTP com status 200 e um objeto JSON que contém uma propriedade "ok" 
igual a true, uma propriedade "message" com uma mensagem opcional e uma propriedade "data" que contém os dados da resposta.*/
