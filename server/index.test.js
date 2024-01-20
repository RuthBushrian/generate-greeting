const request = require('supertest');
const nock = require('nock');
const app = require('./index'); 

describe('POST /generateGreeting', () => {
  it('responds with generated greetings', async () => {
    // Mock the OpenAI API call
    const mockOpenAIResponse = {
      choices: [
        { message: { content: 'Mocked greeting 1' } },
        { message: { content: 'Mocked greeting 2' } },
        { message: { content: 'Mocked greeting 3' } },
      ],
    };
    nock('https://api.openai.com/v1')
      .post('/chat/completions')
      .reply(200, mockOpenAIResponse);

    // Make a request to your Express app
    const response = await request(app)
      .post('/generateGreeting')
      .send({
        event: 'birthday',
        name: 'John',
        greetingType: 'casual',
        atmosphere: 'joyful',
        details: { age: 25, FavoriteHobbies: 'reading' },
        from: 'Alice',
      });

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('greetings');
    expect(response.body.greetings).toEqual([
      'Mocked greeting 1',
      'Mocked greeting 2',
      'Mocked greeting 3',
    ]);
  });
});
