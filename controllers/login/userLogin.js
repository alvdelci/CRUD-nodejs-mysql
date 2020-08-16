const user = require('../../database/userTable/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = "@key_for_encrypt_password"; //Para aumentar o nivel de segurança na construção do token, é melhor que seja criado o arquivo .json contendo a chave privada mais elaborada

module.exports = {
    async login(req, res) {
        let { email, keyword } = req.body;

        //Busca os dados do usuário cadastrado no banco de dados cujo email é igual ao informado
        const response = await user.findOne({ where: { email: email } });

        if (response == null) {
            console.log("Email não cadastrado.");
            res.json({ response: "notFound" });
        } else {
            /**
             * O bcrypt.compare utiliza um sistema semelhante ao que foi usado para encriptar os dados cadastrados,
             * desta forma é possível comparar os dados informados com os cadastrados no sistema
             */
            bcrypt.compare(keyword, response.keyword, (err, results) => {
                if (results && email == response.email) {
                    /**
                     * o token é composto por objetos, uma chave privada e uma opção de token, que aqui será utilizado o ALGORITHM,
                     * que gera um token a cada login e pode ser utilizado até que o usuario faça logout
                     */
                    let token = jwt.sign({
                        email: email
                    },
                        key,
                        {
                            algorithm: 'HS256'
                        });
                    /**
                     * Se o email e senha do usuário estiverem corretas o sistema retornará uma confirmação (response: true) e
                     * o webtoken que será utilizado para manter a conexão do usuário ativa (token: token)
                     */
                    res.json({ response: true, token: token });
                } else if (err) {
                    console.log("Erro: " + err);
                    res.json({ response: false });
                } else {
                    console.log("Dados não conferem.");
                    res.json({ response: false });
                }
            }); //bcrypt hash
        }

    } //authenticate
}