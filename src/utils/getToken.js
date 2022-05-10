export default async function getToken() {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const res = await fetch(URL);
  const { response_code: responseCode, token } = await res.json();
  if (responseCode !== 0) return;
  return token;
}
