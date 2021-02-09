console.log("loading books");
var table = document.getElementById("booksTable");

const xhr = new XMLHttpRequest();
xhr.open("GET", `http://localhost:5000/book`);
xhr.responseType = "json";
xhr.onload = function (e) {
  if (this.status == 200) {
    for (var i = 0; i < this.response.length; i++) {
      book = this.response[i];
      $(".books-table").append(
        "<tr>" +
        "<td>" +
        book.codigo_livro +
        "</td>" +
        "<td>" +
        book.titulo +
        "</td>" +
        "<td>" +
        book.ano_publicacao.slice(0, 10) +
        "</td>" +
        "<td>" +
        book.num_exemplares +
        "</td>" +
        "<td>" +
        book.num_edicao +
        "</td>" +
        "<td>" +
        "<button type='button' class='btn btn-secundary buttons-style' data-toggle='modal' data-target='#myModal' onclick='return editMethod(" +
        book.codigo_livro +
        ")'>Editar</button>" +
        "</td>" +
        "<td>" +
        "<button type='button' class='btn btn-secundary buttons-style' onclick='return removeMethod(" +
        book.codigo_livro +
        ")'>Remover</button>" +
        "</td>" +
        "</tr>"
      );
    }
  }
};
xhr.send();

var id_book;

function editMethod(id) {
  loadPublishers();

  id_book = id;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var result = JSON.parse(xhr.responseText);

      console.log(result);

      document.getElementById("book-title").value = result.titulo;
      document.getElementById("book-authors").value = result.autores;
      document.getElementById("book-publication-year").value =
        result.ano_publicacao;
      document.getElementById("book-number-of-copies").value =
        result.num_exemplares;
      document.getElementById("book-isbn").value = result.isbn;
      document.getElementById("book-number-of-pages").value =
        result.num_paginas;
      document.getElementById("book-gender").value = result.genero;
      document.getElementById("book-number-edition").value = result.num_edicao;
      document.getElementById("editora").value = result.codigo_editora;
    }
  };
  xhr.open("GET", `http://localhost:5000/book/${id}`, true);
  xhr.send();
}

function updateMethod() {
  var title_book = document.getElementById("book-title").value;

  var data = {};
  data.nome = title_book;
  data.titulo = document.getElementById("book-title").value;
  data.autores = document.getElementById("book-authors").value;
  data.ano_publicacao = document.getElementById("book-publication-year").value;
  data.num_exemplares = document.getElementById("book-number-of-copies").value;
  data.isbn = document.getElementById("book-isbn").value;
  data.num_paginas = document.getElementById("book-number-of-pages").value;
  data.genero = document.getElementById("book-gender").value;
  data.num_edicao = document.getElementById("book-number-edition").value;
  data.codigo_editora = document.getElementById("editora").value;

  var json = JSON.stringify(data);

  var xhr = new XMLHttpRequest();
  xhr.open("PUT", `http://localhost:5000/book/${id_book}`);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhr.onload = function () {
    if (xhr.readyState == 4 && xhr.status == "200") {
      console.log("edit book sucess");
    } else {
      console.error("edit book error");
    }
  };
  alert("Livro editado com sucesso!");

  xhr.send(json);
}

function closeReload() {
  window.location.reload();
}

function removeMethod(id) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log("deleted with sucess!");
    }
  };
  xhr.open("DELETE", `http://localhost:5000/book/${id}`, true);
  xhr.send();

  alert("Livro Removido com sucesso!");
  window.location.reload();
}

function loadPublishers() {
  console.log("loading publishers");
  var selectForm = document.getElementById("editora");

  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:5000/publisher`);
  xhr.responseType = "json";
  xhr.onload = function (e) {
    if (this.status == 200) {
      for (let i = 0; i < this.response.length; i++) {
        var opt = document.createElement("option");
        opt.value = this.response[i].codigo_editora;
        opt.innerHTML = this.response[i].nome;
        selectForm.appendChild(opt);
      }
    }
  };
  xhr.send();
}

function searchBookByName() {
  document.querySelector(".books-table").innerHTML = "";
  const bookName = document
    .querySelector(".book-name-search")
    .value.toLowerCase();

  xhr.open("GET", `http://localhost:5000/book`);
  xhr.responseType = "json";
  xhr.onload = function (e) {
    if (this.status == 200) {
      for (var i = 0; i < this.response.length; i++) {
        book = this.response[i];
        if (book.titulo.toLowerCase().includes(bookName)) {
          $(".books-table").append(
            "<tr>" +
            "<td>" +
            book.codigo_livro +
            "</td>" +
            "<td>" +
            book.titulo +
            "</td>" +
            "<td>" +
            book.ano_publicacao.slice(0, 10) +
            "</td>" +
            "<td>" +
            book.num_exemplares +
            "</td>" +
            "<td>" +
            book.num_edicao +
            "</td>" +
            "<td>" +
            "<button type='button' class='btn btn-secundary buttons-style' data-toggle='modal' data-target='#myModal' onclick='return editMethod(" +
            book.codigo_livro +
            ")'>Editar</button>" +
            "</td>" +
            "<td>" +
            "<button type='button' class='btn btn-secundary buttons-style' onclick='return removeMethod(" +
            book.codigo_livro +
            ")'>Remover</button>" +
            "</td>" +
            "</tr>"
          );
        }
      }
    }
  };
  xhr.send();
}
