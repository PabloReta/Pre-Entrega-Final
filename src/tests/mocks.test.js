import { expect } from 'chai'
import supertest from 'supertest'
import app from '../../app.js' // Asegúrate de que la ruta sea correcta


const requester = supertest(app)

describe('Functional tests for mocks.router.js', () => {
  describe('POST /api/mocks/generateUsers', () => {
    it('debe generar usuarios mockeados correctamente', async () => {
      const res = await requester.post('/api/mocks/generateUsers')
      expect(res.statusCode).to.equal(200)
      expect(res.body).to.have.property('message')
      expect(res.body).to.have.property('users')
      expect(res.body.users).to.be.an('array')
    })
  })

  describe('POST /api/mocks/generateMockProducts', () => {
    it('debe generar productos mockeados correctamente', async () => {
      const res = await requester.post('/api/mocks/generateMockProducts')
      expect(res.statusCode).to.equal(200)
      expect(res.body).to.have.property('message')
      expect(res.body).to.have.property('products')
      expect(res.body.products).to.be.an('array')
    })
  })

  describe('POST /api/mocks/generateMockCarts', () => {
    it('debe generar carritos mockeados correctamente', async () => {
      const res = await requester.post('/api/mocks/generateMockCarts')
      expect(res.statusCode).to.equal(200)
      expect(res.body).to.have.property('message')
      expect(res.body).to.have.property('carts')
      expect(res.body.carts).to.be.an('array')
    })
  })

  describe('POST /api/mocks/generateAllData', () => {
    it('debe generar usuarios, productos y carritos mockeados correctamente', async () => {
      const res = await requester.post('/api/mocks/generateAllData')
      expect(res.statusCode).to.equal(200)
      expect(res.body.message).to.equal('Todos los datos mockeados generados con éxito.')
    })
  })
})
