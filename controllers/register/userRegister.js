const user = require('../../database/userTable/user');
const bcrypt = require('bcrypt');

module.exports = {
    register(req, res) {
        let { email, keyword } = req.body;
        /**
        * O bcrypt.hash criptografa a senha recebida com um sistema que segue um padrão, contudo,
        * o salt (nesse caso, o 10) faz com que caracteres sejam inseridos de forma aleatória, 
        * aumentando o nivel de segurança com a qual a senha está sendo encriptada.
        * Em "err" teremos erros relacionados a encriptação da senha, e hash armazenará a senha encriptada 
        */
        bcrypt.hash(keyword, 10, async (err, hash) => {
            if (err) {
                console.log("Falha ao encriptar senha. Erro: " + err);
                res.send({ status: err });
            } else {
                /* Busca por qualquer usuario cadastrado com o email informado*/
                let body = await user.findOne({
                    where: {
                        email: email
                    }
                });

                if (body == null) { //Caso o email não seja encontrado no banco de dados o novo cadastrado é permitido
                    user.create({
                        email: email,
                        keyword: hash
                    }).then(() => {
                        console.log("Usuário cadastrado com sucesso.");
                        res.json({ status: "concluded" });
                    }).catch((err) => {
                        console.log(`Falha ao cadastrar usuário. Erro: ${err}`);
                        res.json({ status: err });
                    })
                } else {
                    console.log("Email ja cadastrado.");
                    res.json({ status: "user_already_exists" });
                }
            }
        }); //bcrypt.hash
    } //regadmin
}