console.log('loading publishers');
var selectForm = document.getElementById('editora');

const xhr = new XMLHttpRequest();
xhr.open('GET', `http://localhost:5000/publisher`);
xhr.responseType = 'json';
xhr.onload = function (e) {
  if (this.status == 200) {
    for (let i = 0; i < this.response.length; i++) {
      var opt = document.createElement('option');
      opt.value = this.response[i].codigo_editora;
      opt.innerHTML = this.response[i].nome;
      selectForm.appendChild(opt);
    }
  }
};
xhr.send();
