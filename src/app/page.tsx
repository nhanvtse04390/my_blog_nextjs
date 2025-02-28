'use client';

import { useEffect, useState } from 'react';
import { fetchData } from './services/api';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then((data:any) => setData(data));
  }, []);

  return (
    <div>
      <main>
        <h1>Data from API:</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
    </div>
  );
}