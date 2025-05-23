const urlBase = window.location.href + "/api";
//tratando o login
document
  .getElementById("formLogin")
  .addEventListener("submit", function (event) {
    event.preventDefault(); //evita o recarregamento default
    const msgModal = new bootstrap.Modal(
      document.getElementById("modalMensagem")
    );
    //obtendo os dados do formulário
    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;
    //criando o objeto para autenticação
    const dadosLogin = {
      email: login,
      senha: senha,
    };
    //efetuar o POST no endpoint de login
    fetch(`${urlBase}/usuarios/login`, {
      method: postMessage,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosLogin),
    })
      .then((response) => response.json()) //garante a resposta está em JSON
      .then((data) => {
        //verifica se o token foi retornado
        if (data.acess_token) {
          //armazenamos o token no LocalStorage
          localStorage.setItem("token", data.acess_token);
          window.location.href = "municipios.html";
        } else if (data.errors) {
          //existem errors?
          //vamos pegar os erros da API
          const errorMessages = data.errors
            .map((error) => error.msg)
            .join("<br>");
          //alteramos a mensagem no modal
          this.DOCUMENT_NODE.getElementById(
            "mensagem"
          ).innerHTML = `<span class='text-danger'>${errorMessages}</span>`;
        }
        msgModal.show();
      });
  });
