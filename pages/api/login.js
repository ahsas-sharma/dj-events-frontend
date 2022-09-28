import { API_URL } from '@/config/index';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { identifier, password } = req.body;
    console.log(`${identifier} / ${password}`);

    const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await strapiRes.json();
    if (strapiRes.ok) {
      // Set cookie
      res.status(200).json({ user: data.user });
    } else {
      console.log(strapiRes.status);
      res.status(strapiRes.status).json({ message: data.error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} is not allowed ` });
  }
};
