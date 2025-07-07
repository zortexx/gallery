import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { id } = req.query;
  const url = `https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${process.env.API_KEY}`;
  const resp = await fetch(url);
  res.setHeader('Content-Type', resp.headers.get('content-type'));
  res.setHeader('Cache-Control', 'public, max-age=3600');
  const buffer = await resp.arrayBuffer();
  res.status(200).end(Buffer.from(buffer));
}
