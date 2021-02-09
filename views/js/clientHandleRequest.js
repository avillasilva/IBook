console.log('loading customers');
var table = document.getElementById('clientsTable');

const xhr = new XMLHttpRequest();
xhr.open('GET', `http://localhost:5000/client`);
xhr.responseType = 'json';
xhr.onload = function (e) {
  if (this.status == 200) {
    for (var i = 0; i < this.response.length; i++) {
      cliente = this.response[i];
      $('.clients-table').append(
        '<tr>' +
        '<td>' +
        cliente.nome +
        '</td>' +
        '<td>' +
        cliente.telefone_1 +
        '</td>' +
        '<td>' +
        cliente.rua +
        '</td>' +
        '<td>' +
        cliente.numero +
        '</td>' +
        '<td>' +
        cliente.bairro +
        '</td>' +
        '<td>' +
        cliente.cidade +
        '</td>' +
        '<td>' +
        cliente.cep +
        '</td>' +
        '<td>' +
        cliente.estado +
        '</td>' +
        '<td>' +
        "<button type='button' class='btn btn-secundary buttons-style' data-toggle='modal' data-target='#myModal' onclick='return editMethod(" +
        cliente.codigo_cliente +
        ")'>Editar</button>" +
        '</td>' +
        '<td>' +
        "<button type='button' class='btn btn-secundary buttons-style' onclick='return removeMethod(" +
        cliente.codigo_cliente +
        ")'>Remover</button>" +
        '</td>' +
        '<td width="100%">' +
        "<button type='button' class='btn btn-secundary buttons-style' data-toggle='modal' data-target='#borrowingModalCreate' onclick='return linkId(" +
        cliente.codigo_cliente +
        ")'style='width: 15rem;'>Novo Empréstimo</button>" +
        "<button type='button' class='btn btn-secundary buttons-style' data-toggle='modal' data-target='#borrowingModalShow' onclick='return getBorrows(" +
        cliente.codigo_cliente +
        ")'style='width: 15rem;margin-left: 1rem;'>Ver Empréstimos</button>" +
        '</td>' +
        '</tr>'
      );
    }
  }
};
xhr.send();

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

  var rua_client = document.getElementById('client-rua').value;
  var numero_client = document.getElementById('client-numero').value;
  var bairro_client = document.getElementById('client-bairro').value;
  var cidade_client = document.getElementById('client-cidade').value;
  var cep_client = document.getElementById('client-cep').value;
  var estado_client = document.getElementById('client-estado').value;

  var data = {};
  data.nome = name_client;
  data.telefone_1 = phone_client;
  data.cpf = cpf_client;
  data.cnpj = cnpj_client;
  data.endereco = {
    rua: rua_client,
    numero: numero_client,
    bairro: bairro_client,
    cidade: cidade_client,
    cep: cep_client,
    estado: estado_client
  }
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

function searchClientByName() {
  document.querySelector('.clients-table').innerHTML = '';
  const clientName = document
    .querySelector('.client-name-search')
    .value.toLowerCase();

  xhr.open('GET', `http://localhost:5000/client`);
  xhr.responseType = 'json';
  xhr.onload = function (e) {
    if (this.status == 200) {
      for (var i = 0; i < this.response.length; i++) {
        let cliente = this.response[i];
        if (cliente.nome.toLowerCase().includes(clientName)) {
          $('.clients-table').append(
            '<tr>' +
            '<td>' +
            cliente.nome +
            '</td>' +
            '<td>' +
            cliente.telefone_1 +
            '</td>' +
            '<td>' +
            cliente.rua +
            '</td>' +
            '<td>' +
            cliente.numero +
            '</td>' +
            '<td>' +
            cliente.bairro +
            '</td>' +
            '<td>' +
            cliente.cidade +
            '</td>' +
            '<td>' +
            cliente.cep +
            '</td>' +
            '<td>' +
            cliente.estado +
            '</td>' +
            '<td>' +
            "<button type='button' class='btn btn-secundary buttons-style' data-toggle='modal' data-target='#myModal' onclick='return editMethod(" +
            cliente.codigo_cliente +
            ")'>Editar</button>" +
            '</td>' +
            '<td>' +
            "<button type='button' class='btn btn-secundary buttons-style' onclick='return removeMethod(" +
            cliente.codigo_cliente +
            ")'>Remover</button>" +
            '</td>' +
            '<td>' +
            "<button type='button' class='btn btn-secundary buttons-style' data-toggle='modal' data-target='#borrowingModalCreate' onclick='return linkId(" +
            cliente.codigo_cliente +
            ")'style='width: 15rem;margin-left: 1rem;'>Novo Empréstimo</button>" +
            "<button type='button' class='btn btn-secundary buttons-style' data-toggle='modal' data-target='#borrowingModalShow' onclick='return getBorrows(" +
            cliente.codigo_cliente +
            ")'style='width: 15rem;margin-left: 1rem;'>Ver Empréstimos</button>" +
            '</td>' +
            '</tr>'
          );
        }
      }
    }
  };
  xhr.send();
}

function linkId(id) {
  id_client = id;
}

function createBorrowing() {
  var data = {};
  data.data_emprestimo = document.getElementById(
    'borrow-data_emprestimo'
  ).value;
  console.log(document.getElementById(
    'borrow-data_emprestimo'
  ).value);
  data.data_devolucao = document.getElementById('borrow-data_devolucao').value;
  data.codigos_livros = [
    document.getElementById('borrow-codigos_livros').value,
  ];
  var json = JSON.stringify(data);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', `http://localhost:5000/borrow/${id_client}`, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function () {
    var response = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == '200') {
      console.log('borrowing connection worked!');
      alert(response.message);
      window.location.reload();
    } else {
      console.log('borrowing connection error!');
      alert(response.message);
      window.location.reload();
    }
  };
  xhr.send(json);
}

function getBorrows(id) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var result = JSON.parse(xhr.responseText);

      var textP =
        '<table width="100%"><tbody><thead><th>Data Empréstimo</th><th>Data Devolução</th><th>Título do Livro</th><th>Estado</th><th>Devolver</th><th>Renovar</th>';

      for (var item_id = 0; item_id < result.length; item_id++) {
        textP +=
          '<tr>' +
          '<td>' +
          result[item_id].data_emprestimo.slice(0, 10) +
          '</td>' +
          '<td>' +
          result[item_id].data_devolucao.slice(0, 10) +
          '</td>';
        var livros = result[item_id].livros;
        for (var i = 0; i < livros.length; i++) {
          textP += '<td>' + livros[i].titulo + '</td>';
        }
        textP += '<td>' + result[item_id].estado + '</td>';
        textP += '<td>' +
          "<button type='button' class='btn btn-secundary buttons-style' onclick='return returnBorrows(" +
          result[item_id].num_emprestimo +
          ")'style='width: 15rem;margin-left: 1rem;'>Devolver</button>" +
          '</td>';
        textP += '<td>' +
          "<button type='button' class='btn btn-secundary buttons-style' onclick='return renewBorrows(" +
          result[item_id].num_emprestimo +
          ")'style='width: 15rem;margin-left: 1rem;'>Renovar</button>" +
          '</td>';
        textP += '</tr>';
      }
      textP += '</thead></tbody></table>';
      document.getElementById('info').innerHTML = textP;

      {
        /* </thead>
        <tbody></tbody>
        </table>'; */
      }
    }
  };
  xhr.open('GET', `http://localhost:5000/borrow/${id}`, true);
  xhr.send();
}

function returnBorrows(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', `http://localhost:5000/borrow/${id}`);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function () {
    if (xhr.readyState == 4 && xhr.status == '200') {
      console.log('devolução de empréstimo success');
      alert('Empréstimo devolvido!');
      window.location.reload();
    } else {
      console.error('devolução de empréstimo error');
    }
  };

  xhr.send();
}

function renewBorrows(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', `http://localhost:5000/borrow/renew/${id}`);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function () {
    var response = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == '200') {
      console.log('renovação de empréstimo success');
      alert(response.message);
      window.location.reload();
    } else {
      console.error('renovação de empréstimo error');
    }
  };

  xhr.send();
}

// function getBorrows(id) {
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState == XMLHttpRequest.DONE) {
//       var result = JSON.parse(xhr.responseText);

//       var textP = '';
//       for (var item_id = 0; item_id < result.length; item_id++) {
//         textP +=
//           '<hr style="background-color: black;height: 1px; border: 0;">' +
//           '<strong>Data Empréstimo:</strong> <p>' +
//           result[item_id].data_emprestimo +
//           '</p><strong>Data Devolução:</strong> <p>' +
//           result[item_id].data_devolucao +
//           '</p>';
//         var livros = result[item_id].livros;
//         for (var i = 0; i < livros.length; i++) {
//           textP = textP + 'Título do Livro: ' + livros[i].titulo;
//         }
//       }
//       document.getElementById('info').innerHTML =
//         textP + '<hr style="background-color: black;height: 1px; border: 0;">';
//     }
//   };
//   xhr.open('GET', `http://localhost:5000/borrow/${id}`, true);
//   xhr.send();
// }
