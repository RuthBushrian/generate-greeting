import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

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
  });

  it('should generate a new job greeting', (done) => {
    const data = {
      event: 'new job',
      name: 'Jane',
      greetingType: 'formal',
      atmosphere: 'exciting',
      details: { position: 'Software Engineer', aspirations: 'to lead a team' },
      from: 'Bob',
    };

    chai.request(app)
      .post('/generateGreeting')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.greetings).to.be.an('array').to.have.lengthOf(3);
        done();
      });
  });

  it('should handle invalid event type', (done) => {
    const data = {
      event: 'invalid_event',
      name: 'InvalidName',
      greetingType: 'casual',
      atmosphere: 'relaxed',
      details: {},
      from: 'Sender',
    };

    chai.request(app)
      .post('/generateGreeting')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(500); 
        done();
      });
  });
});
