console.log('loading publishers');
var table = document.getElementById('publishersTable');

const xhr = new XMLHttpRequest();
xhr.open('GET', `http://localhost:5000/publisher`);
xhr.responseType = 'json';
xhr.onload = function (e) {
  if (this.status == 200) {
    for (var i = 0; i < this.response.length; i++) {
      publisher = this.response[i];
      $('.publishers-table').append(
        '<tr>' +
          '<td>' +
          publisher.nome +
          '</td>' +
          '<td>' +
          "<button type='button' class='btn btn-secundary buttons-style' data-toggle='modal' data-target='#myModal' onclick='return editMethod(" +
          publisher.codigo_editora +
          ")'>Editar</button>" +
          '</td>' +
          '<td>' +
          "<button type='button' class='btn btn-secundary buttons-style' onclick='return removeMethod(" +
          publisher.codigo_editora +
          ")'>Remover</button>" +
          '</td>' +
          '</tr>'
      );
    }
  }
};
xhr.send();

var id_publisher;

function editMethod(id) {
  id_publisher = id;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var result = JSON.parse(xhr.responseText);
      document.getElementById('publisher-name').value = result.nome;
    }
  };
  xhr.open('GET', `http://localhost:5000/publisher/${id}`, true);
  xhr.send();
}

function updateMethod() {
  var name_publisher = document.getElementById('publisher-name').value;

  var data = {};
  data.nome = name_publisher;
  var json = JSON.stringify(data);

  var xhr = new XMLHttpRequest();
  xhr.open('PUT', `http://localhost:5000/publisher/${id_publisher}`);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function () {
    if (xhr.readyState == 4 && xhr.status == '200') {
      console.log('edit publisher sucess');
    } else {
      console.error('edit publisher error');
    }
  };
  alert('Editora editada com sucesso!');

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
  xhr.open('DELETE', `http://localhost:5000/publisher/${id}`, true);
  xhr.send();

  alert('Editora Removida com sucesso!');
  window.location.reload();
}
