const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require("openai");
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;
const openai = new OpenAI({
  key: "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" // Replace with your actual API key
}); 
//const openaiApiKey = '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'; 
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const openaiClient = new openai.Completion({
//   key: openaiApiKey,
//   engine: 'text-davinci-003.5',  
// });

function birthdayQestion(details){
  const {age, FavoriteHobbies} = details;
  return `in age: ${age} and his favorite hobbies are: ${FavoriteHobbies} `;

}

function newJobQestion(details){
  const {position, aspirations } = details;
  return `position ${position} for person with aspirations ${aspirations} `;
}


// Function to generate a greeting based on user inputs
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
    //....
  }
console.log(from);
  const end = `I'd like the greeting type to be ${greetingType} and the atmosphere to be ${atmosphere}`;
  return prompt + additionalInfo + end + ". the greeting is from" + from; ///...

}

async function sendRequest(requestPrompt)
{ 
  
  // try {
  //   const response = await openaiClient.complete({
  //     prompt: requestPrompt,
  //     model: 'text-davinci-003.5', // You can adjust the model as needed
  //     temperature: 0.7, // You can adjust the temperature as needed
  //     max_tokens: 150, // You can adjust the max tokens as needed
  //   });
  //   console.log(response);
  //   return response.choices[0].text.trim();
  // } catch (error) {
  //   console.error('Error generating greeting:', error);
  //   throw error;
  // }
  //console.log(requestPrompt);
}


// Express route for generating greetings
app.post('/generateGreeting', async (req, res) => {
  const { event, name, greetingType, atmosphere, details , from} = req.body;
  const prompt = generateGreeting(event, name, greetingType, atmosphere, from, details)   
  console.log(prompt);
   openai.chat.completions.create({
    messages: [{ role: "assistant", content: prompt }],
    model: "gpt-3.5-turbo",
    n:3
  }).then(response => {
    console.log(response);
      const generatedText = response.choices[0].message;
      console.log(generatedText);
      res.send({greetings:[response.choices[0].message.content,response.choices[1].message.content,response.choices[2].message.content]})
    })
    .catch(error => console.error(error));
    
  // try {
  //   const request = generateGreeting(event, name, greetingType, atmosphere, details)
  //   const greeting = await sendRequest(request);
  //   res.json({ greeting });
  // } catch (error) {
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
});

// Express server listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});