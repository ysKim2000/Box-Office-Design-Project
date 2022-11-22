const axios = require('axios')

exports.handler = async function (event, context) {
  console.log(event)
  // 문자데이터를 객체데이터로 변환하여 변수에 저장
  const payload = JSON.parse(event.body)
  const { title, type, year, page, id } = payload;
  const OMDB_API_KEY = '999bdc7e274c0a5e1557a0642d612aee';
  const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;
  // const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

  try {
    const {data} = await axios.get(url)
    if (data.Error){
      return {
        statusCode: 400,
        body: data.Error
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }
}