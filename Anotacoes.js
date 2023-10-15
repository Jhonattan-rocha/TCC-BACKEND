// Buscar as opções pré cadastradas em um campo multiescolhas

// const request = fetch("https://api2.ploomes.com/Fields?$filter=Id+eq+10133670&$expand=OptionsTable($expand=*)", {
//     method: "GET",
//     mode: "no-cors",
//     headers: {"Content-Type": "application/json", "User-Key":"5E0A056BC54D46F6420EAA74826AA4E6F085CCBE753326E6E8E3F7BF77686E0AA20F78BA2BD1E78E4BD71A1A20C1DD27D1BDE2974E8EBBCE48F82D27882BCC54"},
// });

// request.then(response => response.json())
// .then(json => {
//     console.log(json['value'][0]['OptionsTable'])
// })  
// .catch(err => console.log(err));


// cadastrar um webhook no ploomes

// const request = fetch("https://api2.ploomes.com/Webhooks", {
//     method: "POST",
//     mode: "no-cors",
//     headers: {"Content-Type": "application/json", "User-Key":"5E0A056BC54D46F6420EAA74826AA4E6F085CCBE753326E6E8E3F7BF77686E0AA20F78BA2BD1E78E4BD71A1A20C1DD27D1BDE2974E8EBBCE48F82D27882BCC54"},
//     body: JSON.stringify({
//         "EntityId": 2,
//         "ActionId": 2,
//         "CallbackUrl": "https://testedegruporepetidor.bubbleapps.io/api/1.1/wf/webhookeditarcompras",
//         "ValidationKey": "307313"
//     })
// });

// request.then(response => response.json())
// .then(json => {
//     console.log(json)
// })  
// .catch(err => console.log(err));

// WebHooks cadastrados no ploomes referente ao bubble

// const req = fetch("https://api2.ploomes.com/Webhooks", {
//     method: "GET",
//     mode: "no-cors",
//     headers: {"Content-Type": "application/json", "User-Key":"5E0A056BC54D46F6420EAA74826AA4E6F085CCBE753326E6E8E3F7BF77686E0AA20F78BA2BD1E78E4BD71A1A20C1DD27D1BDE2974E8EBBCE48F82D27882BCC54"},
// })

// req.then(response => response.json())
// .then(json => {
//     for(let Webhook of json['value']){
//         if(String(Webhook['CallbackUrl']).match(/.bubbleapps.io/g)){
//             console.log(Webhook)
//         }
//     }
// })
// .catch(err => console.log(err))


// Ações disponíveis nos webhooks do ploomes

// const req = fetch("https://public-api2.ploomes.com/Webhooks@Actions", {
//     method: "GET",
//     mode: "no-cors",
//     headers: {"Content-Type": "application/json", "User-Key":"5E0A056BC54D46F6420EAA74826AA4E6F085CCBE753326E6E8E3F7BF77686E0AA20F78BA2BD1E78E4BD71A1A20C1DD27D1BDE2974E8EBBCE48F82D27882BCC54"},
// })

// req.then(response => response.json())
// .then(json => {
//     console.log(json)
// })
// .catch(err => console.log(err))

// Testes

/**
 * {
"Name": "compra criada para ativar o webhook do bubble 4",
"DocumentNumber": 5405,
"TemplateId": 10043847,
"Sections": [
{
"Id": 100025488,
"DocumentId": 100054681,
"Discount": null,
"Total": 3500,
"CurrencyId": null,
"Code": 0,
"Products": [
{
"Id": 100126338,
"DocumentId": 100054681,
"SectionId": 100025488,
"DealId": 104066240,
"ContactId": 102800711,
"ProductId": 1458052,
"ProductName": "iPhone XS Max 256 GB",
"DocumentCreatorId": 10019174,
"DocumentDate": "2023-10-04T00:00:00-03:00",
"Quantity": 1,
"UnitPrice": 3500,
"Total": 3500,
"Discount": null,
"CurrencyId": null,
"ContactProductId": null,
"Editable": true,
"Ordination": 0,
"OtherProperties": [
{
"FieldKey": "document_product_FE035CDE-4941-4581-B8F4-3761F849B4C3",
"IntegerValue": 1391228,
"ObjectValueName": "A9999"
},
{
"FieldKey": "document_product_FE035CDE-4941-4581-B8F4-3761F849B4C3",
"IntegerValue": 1398946,
"ObjectValueName": "G1203"
}
]
}
]
}
]
}
 * 
 */

const dados = 
{
"Name": "compra criada para ativar o webhook do bubble 4",
"DocumentNumber": 5405,
"TemplateId": 10043847,
"Sections": [
{
"Id": 100025488,
"DocumentId": 100054681,
"Discount": null,
"Total": 3500,
"CurrencyId": null,
"Code": 0,
"Products": [
{
"Id": 100126338,
"DocumentId": 100054681,
"SectionId": 100025488,
"ProductId": 1458052,
"ProductName": "iPhone XS Max 256 GB",
"DocumentCreatorId": 10019174,
"Quantity": 1,
"UnitPrice": 3500,
"Total": 3500,
"OtherProperties": [
{
"FieldKey": "document_product_FE035CDE-4941-4581-B8F4-3761F849B4C3",
"IntegerValue": 1391228,
"ObjectValueName": "A9999"
},
{
"FieldKey": "document_product_FE035CDE-4941-4581-B8F4-3761F849B4C3",
"IntegerValue": 1398946,
"ObjectValueName": "G1203"
}
]
}
]
}
]
}

const request = fetch("https://api2.ploomes.com/Documents(100054681)?$expand=Sections($expand=Products,OtherProperties)", {
    method: "PATCH",
    mode: "cors",
    headers: {"Content-Type": "application/json", "User-Key":"5E0A056BC54D46F6420EAA74826AA4E6F085CCBE753326E6E8E3F7BF77686E0AA20F78BA2BD1E78E4BD71A1A20C1DD27D1BDE2974E8EBBCE48F82D27882BCC54"},
    body: JSON.stringify(dados)
});

request.then(response => {
    console.log(response.headers)
    console.log(response.status)
    return response.json()
})
.then(json => {
    console.log(json);
})  
.catch(err => console.log(err));

