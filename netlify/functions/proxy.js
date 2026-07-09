exports.handler = async (event) => {
  const targetPath = event.path.replace('/.netlify/functions/proxy', '');
  const targetUrl = `https://maarab.fwh.is/lostfound${targetPath}`;

  try {
    const response = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36'
      },
      body: ['GET', 'HEAD'].includes(event.httpMethod) ? undefined : event.body
    });

    const data = await response.text();

    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
      },
      body: data
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: false, message: 'Proxy error: ' + err.message })
    };
  }
};