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
