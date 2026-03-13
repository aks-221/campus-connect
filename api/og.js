export default async function handler(req, res) {
  try {
    const { id } = req.query;
    
    console.log('ID:', id);
    console.log('KEY exists:', !!process.env.VITE_SUPABASE_PUBLISHABLE_KEY);

    if (!id) return res.status(400).send('Missing id');

    const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    
    if (!anonKey) return res.status(500).send('Missing API key');

    const url = `https://lmyyaxbjlhfcyybgtgwo.supabase.co/rest/v1/products?id=eq.${id}&select=name,description,price,image_url`;
    console.log('Fetching:', url);

    const response = await fetch(url, {
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
      }
    });

    console.log('Response status:', response.status);
    
    const products = await response.json();
    console.log('Products:', JSON.stringify(products));
    
    const product = products?.[0];
    if (!product) return res.status(404).send('Product not found');

    const price = new Intl.NumberFormat('fr-FR').format(product.price) + ' FCFA';
    const title = `${product.name} — ${price}`;
    const description = product.description || 'Disponible sur UAM Commerce';
    const productUrl = `https://uam-commerce.com/produit/${id}`;
    const image = product.image_url || 'https://uam-commerce.com/og-default.png';

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
    return res.send(html);

  } catch (error) {
    console.error('FULL ERROR:', error);
    return res.status(500).send('Error: ' + error.message);
  }
}