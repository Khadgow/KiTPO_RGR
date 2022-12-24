const credentials = {
  email: 'admin@admin.com',
  password: 'password',
}

Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('REACT_APP_API_URL')}/login`,
    body: credentials,
    headers: {
      'X-Application-Key': Cypress.env('REACT_APP_API_KEY'),
    },
  }).then((response) => {
    window.localStorage.setItem('userToken', response.body.data.token)
  })
})
