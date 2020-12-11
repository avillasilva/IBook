var id_client;

function editMethod(id) {
  id_client = id;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var result = JSON.parse(xhr.responseText);
      document.getElementById('client-name').value = result.nome;
      document.getElementById('client-phone').value = result.telefone_1;
      document.getElementById('client-cpf').value = result.cpf;
      document.getElementById('client-cnpj').value = result.cnpj;
      document.getElementById('client-rua').value = result.rua;
      document.getElementById('client-numero').value = result.numero;
      document.getElementById('client-bairro').value = result.bairro;
      document.getElementById('client-cidade').value = result.cidade;
      document.getElementById('client-cep').value = result.cep;
      document.getElementById('client-estado').value = result.estado;
    }
  };
  xhr.open('GET', `http://localhost:5000/client/${id}`, true);
  xhr.send();
}

function updateMethod() {
  var name_client = document.getElementById('client-name').value;
  var phone_client = document.getElementById('client-phone').value;
  var cpf_client = document.getElementById('client-cpf').value;
  var cnpj_client = document.getElementById('client-cnpj').value;

  var data = {};
  data.nome = name_client;
  data.telefone_1 = phone_client;
  data.cpf = cpf_client;
  data.cnpj = cnpj_client;
  var json = JSON.stringify(data);

  var xhr = new XMLHttpRequest();
  xhr.open('PUT', `http://localhost:5000/client/${id_client}`);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function () {
    if (xhr.readyState == 4 && xhr.status == '200') {
      console.log('edit client sucess');
    } else {
      console.error('edit client error');
    }
  };
  alert('Cliente editado com sucesso!');

  xhr.send(json);
}

function closeReload() {
  window.location.reload();
}

function removeMethod(id) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log('deleted with sucess!');
    }
  };
  xhr.open('DELETE', `http://localhost:5000/client/${id}`, true);
  xhr.send();

  alert('Cliente Removido com sucesso!');
  window.location.reload();
}

function linkId(id) {
  id_client = id;
}

function createBorrowing() {
  var borrow_data_emprestimo = document.getElementById('borrow-data_emprestimo')
    .value;
  var borrow_data_devolucao = document.getElementById('borrow-data_devolucao')
    .value;
  var borrow_codigos_livros = document.getElementById('borrow-codigos_livros')
    .value;

  var data = {};
  data.data_emprestimo = borrow_data_emprestimo;
  data.data_devolucao = borrow_data_devolucao;
  data.codigos_livros = [borrow_codigos_livros];
  var json = JSON.stringify(data);

  var xhr = new XMLHttpRequest();
  xhr.open('PUT', `http://localhost:5000/borrow/${id_client}`);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function () {
    if (xhr.readyState == 4 && xhr.status == '200') {
      console.log('create borrowing sucess');
    } else {
      console.error('create borrowing error');
    }
  };
  alert('Empréstimo criado com sucesso!');

  xhr.send(json);
}

function getBorrows(id) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var result = JSON.parse(xhr.responseText);
      console.log(result);
      document.getElementById('borrow-estado').value = result.estado;
    }
  };
  xhr.open('GET', `http://localhost:5000/borrow/${id}`, true);
  xhr.send();
}
