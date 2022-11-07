const request = require('supertest');
const app = require('./app');

describe('Recipe API', () => {
  it('GET /recipes --> should return array of recipes', async () => {
    let response = await request(app)
      .get('/recipes')
      .expect('Content-Type', /json/)
      .expect(200);

    return expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          description: expect.any(String),
          featured: expect.any(Boolean),
        }),
      ])
    );
  });

  it('GET /recipes/id --> should return specific recipe of ID', async () => {
    let response = await request(app)
      .get('/recipes/1')
      .expect('Content-Type', /json/)
      .expect(200);

    return expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        featured: expect.any(Boolean),
      })
    );
  });

  it('GET /recipes/id --> 404 if not found', async () => {
    let response = request(app).get('/recipes/123456');
    expect((await response).status == 404);
  });

  it('POST /recipes --> create recipe', async () => {
    let response = await request(app)
      .post('/recipes')
      .expect('Content-Type', /json/)
      .send({
        id: 1,
        name: 'Karahi Gosht',
        description: 'Karahi Gosht Description',
      })
      .expect(201);

    return expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Karahi Gosht',
        description: 'Karahi Gosht Description',
        featured: false,
      })
    );
  });

  it('POST /recipes --> validate body of request', () => {});
});
