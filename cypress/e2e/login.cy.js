import { Routes } from '/src/constans'

describe('Login Page', () => {
  let credentials
  before(async () => {
    credentials = await cy.fixture('user')
  })

  it('Redirect to main page after login', () => {
    cy.visit(Routes.LOGIN) // Переходим на страницу логина

    cy.intercept(`${Cypress.env('REACT_APP_API_URL')}/login`, (req) => {
      expect(req.body).to.deep.equal(this.credentials)
    }) // Перехватим запрос логна и проверим, что в теле запроса находятся введённые данные
    cy.get('input[data-testid="email"]').type(credentials.email) // Введём email
    cy.get('input[data-testid="password"]').type(credentials.password) // Введём пароль
    cy.get('[data-testid="submit"]').click() // Нажатие на кнопку подтверждения
    cy.url().should('include', Routes.ROOT) // Проеверим, что перешли на главную страницу
  })

  it('Link to register', () => {
    cy.visit(Routes.LOGIN)

    cy.get('a').click()
    cy.url().should('include', Routes.REGISTER)
  })
  it('Link to login', () => {
    cy.visit(Routes.REGISTER)

    cy.get('a').click()
    cy.url().should('include', Routes.LOGIN)
  })
})
