import axios from 'axios';

async function testAPI() {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    console.log('Success:', response.data.length);
  } catch (error: any) {
    console.error('Erro:', error.response?.status, error.message);
  }
}

testAPI();
