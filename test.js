const baseURL = 'http://10.0.0.100:8000/setores/'

// const dados = {"bairro": "", "cep": "00000000", "cnpj": "54.284.262/0001-54", "email": "teste222@teste.com", "endereco": "1", "nome": "teste", "numero": 0, "password": "123", "razao_social": "teste", "status": "a", "telefone": "1"}
const dados = {id: 1, nome: 'TI1'};

fetch(`${'http://10.0.0.100:8000/setores/'}`, {
    method: "GET", 
    mode: 'cors',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0ZTIyMkB0ZXN0ZS5jb20iLCJ0ZW5hbnRfaWQiOiJHN2Q0bk5RaXlJWm5yaWhkVzVNVSIsImlhdCI6MTY5NTU5Mjg1NCwiZXhwIjoxNjk2MTk3NjU0fQ.8Vk01Z8ln1XkZe5pI-0IkGDyz6kf0kdH8sgEh7i-9eM'},
}).then(response => response.text())
.then(json => console.log(json))
.catch(err => console.log(err));

fetch(`${'http://10.0.0.100:8000/statuslist/'}`, {
    method: "GET", 
    mode: 'cors',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0ZTIyMkB0ZXN0ZS5jb20iLCJ0ZW5hbnRfaWQiOiJHN2Q0bk5RaXlJWm5yaWhkVzVNVSIsImlhdCI6MTY5NTU5Mjg1NCwiZXhwIjoxNjk2MTk3NjU0fQ.8Vk01Z8ln1XkZe5pI-0IkGDyz6kf0kdH8sgEh7i-9eM'},
}).then(response => response.text())
.then(json => console.log(json))
.catch(err => console.log(err));

fetch(`${'http://10.0.0.100:8000/categorias/'}`, {
    method: "GET", 
    mode: 'cors',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0ZTIyMkB0ZXN0ZS5jb20iLCJ0ZW5hbnRfaWQiOiJHN2Q0bk5RaXlJWm5yaWhkVzVNVSIsImlhdCI6MTY5NTU5Mjg1NCwiZXhwIjoxNjk2MTk3NjU0fQ.8Vk01Z8ln1XkZe5pI-0IkGDyz6kf0kdH8sgEh7i-9eM'},
}).then(response => response.text())
.then(json => console.log(json))
.catch(err => console.log(err));

fetch(`${'http://10.0.0.100:8000/subcategorias/'}`, {
    method: "GET", 
    mode: 'cors',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0ZTIyMkB0ZXN0ZS5jb20iLCJ0ZW5hbnRfaWQiOiJHN2Q0bk5RaXlJWm5yaWhkVzVNVSIsImlhdCI6MTY5NTU5Mjg1NCwiZXhwIjoxNjk2MTk3NjU0fQ.8Vk01Z8ln1XkZe5pI-0IkGDyz6kf0kdH8sgEh7i-9eM'},
}).then(response => response.text())
.then(json => console.log(json))
.catch(err => console.log(err));

fetch(`${'http://10.0.0.100:8000/funcionarios/'}`, {
    method: "GET", 
    mode: 'cors',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0ZTIyMkB0ZXN0ZS5jb20iLCJ0ZW5hbnRfaWQiOiJHN2Q0bk5RaXlJWm5yaWhkVzVNVSIsImlhdCI6MTY5NTU5Mjg1NCwiZXhwIjoxNjk2MTk3NjU0fQ.8Vk01Z8ln1XkZe5pI-0IkGDyz6kf0kdH8sgEh7i-9eM'},
}).then(response => response.text())
.then(json => console.log(json))
.catch(err => console.log(err));

console.log('aaaaaaaaaa')