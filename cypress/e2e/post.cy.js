import { Routes } from '/src/constans'

describe('Posts', () => {
  let createdPost
  let editedPost
  before(() => {
    cy.fixture('createdPost').then((data) => {
      createdPost = data
    })
    cy.fixture('editedPost').then((data) => {
      editedPost = data
    })
  })
  beforeEach(() => {
    cy.login()
  })
  it('Create post', () => {
    cy.visit(Routes.ROOT) // Переходим на страницу постов
    cy.get('[data-testid="addIcon"]').click() // Нажмём на кнопку создания
    cy.url().should('include', Routes.CREATE) // Проверим, что перешли на форму создания
    cy.get('[data-testid="title"]').type(createdPost.title) // Введём заголовок
    cy.get('[data-testid="content"]').type(createdPost.content) // Введём текст
    cy.get('button').click() // Нажмём на кнопку подтверждения
    cy.url().should('include', Routes.ROOT) // Проверим, что перешли на страницу постов
    cy.contains(createdPost.title).should('exist') // Проверим, что созданный пост отображается
    cy.contains(createdPost.content).should('exist')
  })
  it('Like/unlike post', () => {
    cy.visit(Routes.ROOT) // Переходим на страницу постов
    cy.contains(createdPost.title).parent().find('[data-testid="likeButton"]').click() // Нажмём на кнопку лайка созданного поста
    cy.contains(createdPost.title).parent().find('[data-testid="likedIcon"]').should('exist') // Проверим, что иконка лайка присутствует у созданного поста
    cy.contains(createdPost.title).parent().find('[data-testid="likeButton"]').click() // Нажмём на кнопку лайка созданного поста снова
    cy.contains(createdPost.title).parent().find('[data-testid="unlikedIcon"]').should('exist') // Проверим, что иконка отсутствия лайка присутствует у созданного поста
  })
  it('Edit created post', () => {
    cy.visit(Routes.ROOT) // Переходим на страницу постов
    cy.contains(createdPost.title).parent().find('[data-testid="editButton"]').click() // Нажмём конпку редактирования для созданного поста
    cy.url().should('include', '/info') // Проверим, что перешли на страницу поста
    cy.get('[data-testid="title"]').clear().type(editedPost.title) // Введём новый заголовок
    cy.get('[data-testid="content"]').clear().type(editedPost.content) // Введём новый текст
    cy.get('[type="submit"]').click() // Нажмём на кнопку подтверждения
    cy.url().should('include', Routes.ROOT) // Проверим, что перешли на страницу постов
    cy.contains(editedPost.title).should('exist') // Проверим, что изменённый пост отображается
    cy.contains(editedPost.content).should('exist')
  })
  it('Delete edited post', () => {
    cy.visit(Routes.ROOT) // Переходим на страницу постов
    cy.contains(editedPost.title).parent().find('[data-testid="editButton"]').click() // Нажмём конпку редактирования для изменённого поста
    cy.url().should('include', '/info') // Проверим, что перешли на страницу поста
    cy.get('[type="button"]').click() // Нажмём на кнопку удаления
    cy.url().should('include', Routes.ROOT) // Проверим, что перешли на страницу постов
    cy.contains(editedPost.title).should('not.exist') // Проверим, что пост больше не отображается
    cy.contains(editedPost.content).should('not.exist')
  })
})
