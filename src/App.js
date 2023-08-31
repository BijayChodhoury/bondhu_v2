import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios';
import ContentWindow from './components/ContentWindow';

function App() {

  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState('')

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_CHATGPT_API_KEY}`,
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setListening(true);
        console.log('Speech recognition started');
      };

      recognition.onend = () => {
        setListening(false);
        console.log('Speech recognition ended');
      };

      recognition.onresult = (event) => {
        const results = event.results;
        const transcript = results[0][0].transcript;
        setTranscript(transcript);
        console.log('You said: ' + transcript);
      };

      if (!listening) {
        recognition.start();
      } else {
        recognition.stop();
      }
    } else {
      console.log('Speech recognition not supported in this browser');
    }
  }, [listening]);

  useEffect(() => {
    if ({ transcript } !== '') {
      const data = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: transcript
          }
        ],
        temperature: 0.7
      };
      axios.post('https://api.openai.com/v1/chat/completions', data, { headers })
        .then(response => {
          console.log(response.data.choices[0].message.content);
          let api_response_text = response.data.choices[0].message.content
          setResponse(api_response_text)
        })
        .catch(error => {
          console.error('Error:', error);
        });
      setResponse('its not completed yet')
    }
  }, [transcript])

  return (
    <>
      <ContentWindow transcript={transcript} response={response} />
    </>
  )
}

export default App;