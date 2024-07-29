describe('Testes Automatizados da API do Trello', () => {
  const apiKey = 'SUA_API_KEY'; // Substitua com a chave de API
  const token = 'SEU_TOKEN'; // Substitua com token de acesso

  let boardId; // Variável para armazenar o ID do board
  let listId;  // Variável para armazenar o ID da lista
  let cardId;  // Variável para armazenar o ID do card

  // Teste para cadastrar um novo board
  it('Deve cadastrar um novo board', () => {
    cy.api({
      method: 'POST', // Método HTTP para criar um novo recurso
      url: `https://api.trello.com/1/boards/?name=BoardDeTeste&key=${apiKey}&token=${token}`, // Endpoint da API do Trello para criar um board
      headers: {
        Accept: 'application/json' // Cabeçalho para aceitar respostas em JSON
      }
    }).then((response) => {
      expect(response.status).to.eq(200); // Verifica se a resposta foi bem-sucedida
      boardId = response.body.id; // Armazena o ID do board criado
      cy.log('ID do Board: ', boardId); // Exibe o ID do board no log
    });
  });

  // Teste para criar uma lista dentro do board criado
  it('Deve criar uma lista dentro do board', () => {
    cy.api({
      method: 'POST', // Método HTTP para criar um novo recurso
      url: `https://api.trello.com/1/lists?name=ListaDeTeste&idBoard=${boardId}&key=${apiKey}&token=${token}`, // Endpoint da API do Trello para criar uma lista
      headers: {
        Accept: 'application/json' // Cabeçalho para aceitar respostas em JSON
      }
    }).then((response) => {
      expect(response.status).to.eq(200); // Verifica se a resposta foi bem-sucedida
      listId = response.body.id; // Armazena o ID da lista criada
      cy.log('ID da Lista: ', listId); // Exibe o ID da lista no log
    });
  });

  // Teste para cadastrar um novo card na lista criada
  it('Deve cadastrar um novo card', () => {
    cy.api({
      method: 'POST', // Método HTTP para criar um novo recurso
      url: `https://api.trello.com/1/cards?idList=${listId}&key=${apiKey}&token=${token}`, // Endpoint da API do Trello para criar um card
      headers: {
        Accept: 'application/json' // Cabeçalho para aceitar respostas em JSON
      }
    }).then((response) => {
      expect(response.status).to.eq(200); // Verifica se a resposta foi bem-sucedida
      cardId = response.body.id; // Armazena o ID do card criado
      cy.log('ID do Card: ', cardId); // Exibe o ID do card no log
    });
  });

  // Teste para excluir o card criado
  it('Deve excluir o card criado', () => {
    cy.api({
      method: 'DELETE', // Método HTTP para excluir um recurso
      url: `https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${token}`, // Endpoint da API do Trello para excluir um card
      headers: {
        Accept: 'application/json' // Cabeçalho para aceitar respostas em JSON
      }
    }).then((response) => {
      expect(response.status).to.eq(200); // Verifica se a resposta foi bem-sucedida
    });
  });

  // Teste para excluir o board criado
  it('Deve excluir o board criado', () => {
    cy.api({
      method: 'DELETE', // Método HTTP para excluir um recurso
      url: `https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${token}`, // Endpoint da API do Trello para excluir um board
      headers: {
        Accept: 'application/json' // Cabeçalho para aceitar respostas em JSON
      }
    }).then((response) => {
      expect(response.status).to.eq(200); // Verifica se a resposta foi bem-sucedida
    });
  });
});
