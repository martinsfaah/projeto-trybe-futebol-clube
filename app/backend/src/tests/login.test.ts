import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';
import User from '../database/models/user';
import { Response } from 'superagent';

import userMock from '../tests/mocks/loginMock';

chai.use(chaiHttp);

const { expect } = chai;

let chaiResponse: Response;

describe('endpoint POST /login', () => {
  before(async () => {
    sinon.stub(User, 'findOne').resolves(userMock as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('Status code 200 se tudo estiver ok', async () => {
    chaiResponse = await chai.request(app).post('/login').send({
      email: 'testando@test.com',
      password: 'secret_user',
    });

    expect(chaiResponse.status).to.be.equal(200);
  });

  it('Informações do usuário', async () => {
    chaiResponse = await chai.request(app).post('/login').send({
      email: 'user@user.com',
      password: 'secret_user',
    });

    expect(chaiResponse.body).to.have.property('user');
  });

  it('Status code 401 para email inválido', async () => {
    chaiResponse = await chai.request(app).post('/login').send({
      email: 'user$user.com',
      password: 'secret_user',
    });

    expect(chaiResponse.status).to.be.equal(401);
  });

  it('Mensagem de erro de email inválido', async () => {
    chaiResponse = await chai.request(app).post('/login').send({
      email: 'user$user.com',
      password: 'secret_user',
    });

    expect(chaiResponse.body.message).to.be.equal(
      'Incorrect email or password'
    );
  });

  it('Status code 401 para senha inválida', async () => {
    chaiResponse = await chai.request(app).post('/login').send({
      email: 'user@user.com',
      password: 'public_user',
    });

    expect(chaiResponse.status).to.be.equal(401);
  });

  it('Mensagem de erro de senha inválida', async () => {
    chaiResponse = await chai.request(app).post('/login').send({
      email: 'user$user.com',
      password: 'public_user',
    });

    expect(chaiResponse.body.message).to.be.equal(
      'Incorrect email or password'
    );
  });

  it('Status code 400 para email inexistente', async () => {
    chaiResponse = await chai.request(app).post('/login').send({
      password: 'secret_user',
    });

    expect(chaiResponse.status).to.be.equal(400);
  });

  it('Mensagem de erro para email inexistente', async () => {
    chaiResponse = await chai.request(app).post('/login').send({
      password: 'public_user',
    });

    expect(chaiResponse.body.message).to.be.equal('All fields must be filled');
  });

  it('Status code 400 para senha inexistente', async () => {
    chaiResponse = await chai.request(app).post('/login').send({
      email: 'user$user.com',
    });

    expect(chaiResponse.status).to.be.equal(400);
  });

  it('Mensagem de erro para senha inexistente', async () => {
    chaiResponse = await chai.request(app).post('/login').send({
      email: 'user$user.com',
    });

    expect(chaiResponse.body.message).to.be.equal('All fields must be filled');
  });
});

describe('Endpoint GET /login/validate', async () => {
  before(async () => {
    sinon.stub(User, 'findOne').resolves(userMock as User);
    sinon.stub(jwt, 'verify').resolves({ user: 'user@user.com' });
  });

  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
    (User.findOne as sinon.SinonStub).restore();
  });

  it('Status code 200 se tudo estiver ok', async () => {
    chaiResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', 'mock_token')
      .send();

    expect(chaiResponse.status).to.be.equal(200);
  });
});

describe('Casos de erro no endpoint GET /login/validate', () => {
  before(async () => {
    sinon.stub(User, 'findOne').resolves(null);
    sinon.stub(jwt, 'verify').resolves({ user: 'user@user.com' });
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
  });

  it('Status code 401 para validação incorreta', async () => {
    chaiResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', 'mock_token')
      .send();

    expect(chaiResponse.status).to.be.equal(404);
  });

  it('Mensagem de validação incorreta', async () => {
    chaiResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', 'mock_token')
      .send();

    expect(chaiResponse.body.message).to.be.equal('User not found');
  });
});