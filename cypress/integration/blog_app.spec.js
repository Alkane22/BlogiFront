describe('Blog ', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }

        cy.request('POST', 'http://localhost:3003/api/users/', user)

        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('Blogs:')
    })

    it('login fails with wrong password', function () {
        cy.contains('Open').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrongpass')
        cy.get('#login-button').click()
        cy.get('.redMessage').contains('invalid username or password')
    })

    describe('login', function () {
        beforeEach(function () {
            cy.login({ username: 'mluukkai', password: 'salainen' })
        })

        describe('new blog', function () {
            beforeEach(function () {
                cy.contains('New note').click()
                cy.get('#blog-title').type('blog of cypress')
                cy.get('#blog-author').type('robot')
                cy.get('#blog-url').type('bot.net')
                cy.contains('Add').click()
                cy.contains('blog of cypress')
            })

            it('blog liked', function () {
                cy.get('#blogs')
                    .contains('blog of cypress')
                    .contains('show')
                    .click()

                cy.get('#blogs')
                    .contains('Like')
                    .click()

                cy.get('#blogs')
                    .contains('1')
            })

            it('blog deleted', function () {
                cy.get('#blogs')
                    .contains('blog of cypress')
                    .contains('show')
                    .click()

                cy.get('#blogs')
                    .contains('Delete')
                    .click()

                cy.get('.greenMessage').contains('blog of cypress by robot deleted')
            })
        })

        it.only('blogs are sorted', function () {
            cy.createBlog({
                title: 'blog1',
                author: 'auth1',
                url: 'ulr1.com'
            })

            cy.createBlog({
                title: 'blog2',
                author: 'auth2',
                url: 'ulr2.com'
            })

            cy.contains('blog1')
            cy.contains('blog2')

            cy.get('#blogs')
                .contains('blog1')
                .contains('show')
                .click()

            cy.get('#blogs')
                .contains('blog2')
                .contains('show')
                .click()

            cy.intercept('GET', '/api/blogs').as('liked')

            cy.get('#blog2')
                .contains('Like')
                .click()

            cy.wait('@liked')

            cy.get('#likes')
                .contains('1')
        })
    })
})

