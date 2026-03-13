export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) return res.status(400).send('Missing id');

  const response = await fetch(
  `https://lmyyaxbjlhfcyybgtgwo.supabase.co/rest/v1/products?id=eq.${id}&select=name,description,price,image_url`,
  {
    headers: {
      'apikey': process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      'Authorization': `Bearer ${process.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    }
  }
);

  const products = await response.json();
  const product = products?.[0];

  if (!product) return res.status(404).send('Not found');

  const price = new Intl.NumberFormat('fr-FR').format(product.price) + ' FCFA';
  const title = `${product.name} — ${price}`;
  const description = product.description || 'Disponible sur UAM Commerce';
  const image = product.image_url || 'https://uamcommerce.vercel.app/og-default.png';
  const productUrl = `https://uamcommerce.vercel.app/produit/${id}`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:url" content="${productUrl}" />
  <meta property="og:type" content="product" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta http-equiv="refresh" content="0;url=${productUrl}" />
</head>
<body><p>Redirection...</p></body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
}
```

Ensuite dans **Vercel → Settings → Environment Variables**, ajoute :
```
VITE_SUPABASE_PUBLISHABLE_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteXlheGJqbGhmY3l5Ymd0Z3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MTY2MTksImV4cCI6MjA4NDA5MjYxOX0.3VdMkTy98lMT3fn1qPZNLjUg6Igqc8VMligG6i3kySU"