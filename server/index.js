const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require("openai");
const cors = require('cors');

const app = express();
const port = 3000;
const openai = new OpenAI(); 
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function birthdayQestion(details){
  const {age, FavoriteHobbies} = details;
  return `in age: ${age} and his favorite hobbies are: ${FavoriteHobbies} `;

}

function newJobQestion(details){
  const {position, aspirations } = details;
  return `position ${position} for person with aspirations ${aspirations} `;
}

function generateGreeting(event, name, greetingType, atmosphere, from, details) {
  const prompt = `Write me a ${event} greeting for ${name} that is `;
  let additionalInfo = '';

  switch(event){
    case 'birthday':
      additionalInfo += birthdayQestion(details);
      break;
    case 'new job':
      additionalInfo += newJobQestion(details);
      break;
  }
  const end = `I'd like the greeting type to be ${greetingType} and the atmosphere to be ${atmosphere}`;
  return prompt + additionalInfo + end + ". the greeting is from" + from; ///...

}

app.post('/generateGreeting', async (req, res) => {
  const { event, name, greetingType, atmosphere, details , from} = req.body;
  const prompt = generateGreeting(event, name, greetingType, atmosphere, from, details)   
   openai.chat.completions.create({
    messages: [{ role: "assistant", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    n:3
  }).then(response => {
    console.log(response);
      res.send({greetings:[response.choices[0].message.content,response.choices[1].message.content,response.choices[2].message.content]})
    })
    .catch(error => console.error(error));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});