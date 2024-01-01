// test/app.test.mjs
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app'; // Update the path accordingly

chai.use(chaiHttp);
const { expect } = chai;

describe('API Tests', () => {
  it('should generate a birthday greeting', async () => {
    const response = await chai
      .request(app)
      .post('/generateGreeting')
      .send({
        event: 'birthday',
        name: 'John',
        greetingType: 'warm',
        atmosphere: 'joyful',
        details: { age: 30, FavoriteHobbies: 'reading' },
        from: 'Alice',
      });

    expect(response).to.have.status(200);
    expect(response.body.greetings).to.be.an('array').with.lengthOf(3);
    // Add more specific assertions if needed
  });

  it('should generate a new job greeting', async () => {
    const response = await chai
      .request(app)
      .post('/generateGreeting')
      .send({
        event: 'new job',
        name: 'Jane',
        greetingType: 'congratulatory',
        atmosphere: 'exciting',
        details: { position: 'developer', aspirations: 'growth' },
        from: 'Bob',
      });

    expect(response).to.have.status(200);
    expect(response.body.greetings).to.be.an('array').with.lengthOf(3);
    // Add more specific assertions if needed
  });

  it('should handle invalid event', async () => {
    const response = await chai
      .request(app)
      .post('/generateGreeting')
      .send({
        event: 'invalid_event',
        name: 'SomeName',
        greetingType: 'casual',
        atmosphere: 'laid-back',
        details: {},
        from: 'Someone',
      });

    expect(response).to.have.status(500);
    // Add more specific assertions if needed
  });
});
