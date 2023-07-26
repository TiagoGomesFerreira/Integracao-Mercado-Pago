const express = require("express");
const MercadoPago = require("mercadopago");
const app = express();

MercadoPago.configure({
    sandbox: true,
    access_token: 'TEST-4932264082562139-072508-ff9933344b567114b0faa9054cdd43b3-169807761'
});

app.get("/", (req, res) => {
    res.send("olá mundo!")
});

app.get("/pagar", async (req, res) => {

    var id = "" + Date.now();
    var emailDoPagador = "ravena@gmail.com";

    var dados = {
        items: [
            item = {
                id: id,
                title: "1x video game",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(250)
            }
        ],
        payer: {
            email: emailDoPagador
        },
        external_reference: id
    }

    try {
        var pagamento = await MercadoPago.preferences.create(dados);
        console.log(pagamento);
        return res.redirect(pagamento.body.init_point);

    } catch (err) {
        return res.send(err.message)
    }


})

app.post("/not", (req, res) => {
    console.log(req.query);
    res.send("ok");
});

app.listen(80, (req, res) => {
    console.log("Servidor rodando")
});