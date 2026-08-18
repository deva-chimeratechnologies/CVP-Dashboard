// Vercel Serverless Function — PIN is in Vercel env var, never sent to browser
module.exports = function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  let pin = '';
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    pin = String(body.pin || '');
  } catch (_) {
    return res.status(400).json({ ok: false });
  }

  // Set COST_PIN in Vercel Dashboard → Settings → Environment Variables
  const expected = process.env.COST_PIN || '123456';

  if (pin && pin === expected) {
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ ok: false });
};
