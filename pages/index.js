import React, { useState } from 'react';

const venues = [
  { id: 'bar-olo', name: 'Bar Olo', order: 1, color: '#c9a227', address: '165 Nicholson Street, Carlton', hours: 'Tue–Sat 4pm–late', description: 'Italian elegance. The perfect opener.', images: ['https://media.timeout.com/images/106233356/750/422/image.jpg'] },
  { id: 'shady-lady', name: 'Shady Lady', order: 2, color: '#6c5ce7', address: '36 Johnston Street, Fitzroy', hours: 'Nightly until late', description: 'Kitsch dive bar with frozen cocktails.', images: ['https://media.timeout.com/images/105165006/750/422/image.jpg'] },
  { id: 'pendant', name: 'Pendant Public Bar', order: 3, color: '#8b4513', address: '334 Brunswick Street, Fitzroy', hours: 'Wed–Mon 4pm–late', description: 'Irish pub meets cocktail bar. $10 pints.', images: ['https://cdn.broadsheet.com.au/cache/19/c6/19c6155f084e2fbc63e9920b733f21a7.webp'] },
  { id: 'black-cat', name: 'Black Cat', order: 4, color: '#2d3436', address: '252 Brunswick Street, Fitzroy', hours: 'Daily', description: '30+ year institution. Beer garden vibes.', images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/eb/34/4c/photo0jpg.jpg?w=900&h=500&s=1'] },
  { id: 'amarillo', name: 'Amarillo', order: 5, color: '#e17055', address: '149 Brunswick Street, Fitzroy', hours: 'Daily', description: 'Golden wine bar with tapas.', images: ['https://cdn.broadsheet.com.au/cache/93/f7/93f72fe68d3ad4af8f97faa5f13f02a9.webp'] },
  { id: 'moondrop', name: 'Moondrop', order: 6, color: '#d63031', address: '150 Gertrude Street, Fitzroy', hours: 'Wed–Sun evenings', description: '1920s Shanghai glamour upstairs.', images: ['https://media.timeout.com/images/106384438/750/422/image.jpg'] }
];

export default function App() {
  const [active, setActive] = useState(null);
  const [started, setStarted] = useState(false);

  if (!started) return (
    <div style={{minHeight: '100vh', background: '#f5f0e8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🎉</div>
      <h1 style={{fontSize: '3rem', textAlign: 'center', color: '#2d3436', marginBottom: '1rem'}}>Benji's B'day<br/><span style={{color: '#ff6b9d'}}>Bar Hop</span></h1>
      <button onClick={() => setStarted(true)} style={{padding: '1rem 2rem', background: '#ff6b9d', color: 'white', border: 'none', borderRadius: '2rem', fontSize: '1.2rem', cursor: 'pointer'}}>Start The Crawl</button>
    </div>
  );

  return (
    <div style={{background: '#f5f0e8', minHeight: '100vh', paddingBottom: '2rem'}}>
      <div style={{position: 'sticky', top: 0, height: '50vh', background: '#e8e0d5'}}>
        {venues.map(v => (
          <button key={v.id} onClick={() => setActive(v)} style={{position: 'absolute', left: v.order * 12 + '%', top: v.order % 2 === 0 ? '30%' : '60%', transform: 'translate(-50%, -50%)', background: 'none', border: 'none', cursor: 'pointer'}}>
            <img src={v.images[0]} style={{width: '60px', height: '60px', borderRadius: '50%', border: active?.id === v.id ? '4px solid #ff6b9d' : '4px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.2)'}} />
            <div style={{background: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', marginTop: '4px'}}>{v.order}. {v.name}</div>
          </button>
        ))}
      </div>
      
      <div style={{padding: '1rem'}}>
        {venues.map(v => (
          <div key={v.id} style={{background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
              <div style={{width: '48px', height: '48px', borderRadius: '50%', background: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold'}}>{v.order}</div>
              <div>
                <h2 style={{margin: 0}}>{v.name}</h2>
                <p style={{margin: 0, color: '#666', fontSize: '14px'}}>{v.address}</p>
              </div>
            </div>
            <p>{v.description}</p>
            <button onClick={() => setActive(v)} style={{width: '100%', padding: '0.75rem', background: '#2d3436', color: 'white', border: 'none', borderRadius: '8px', marginTop: '0.5rem'}}>View Details</button>
          </div>
        ))}
      </div>

      {active && (
        <div onClick={() => setActive(null)} style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 100}}>
          <div onClick={e => e.stopPropagation()} style={{background: 'white', borderRadius: '16px', maxWidth: '400px', width: '100%', maxHeight: '80vh', overflow: 'auto', padding: '1.5rem'}}>
            <button onClick={() => setActive(null)} style={{float: 'right', background: 'none', border: 'none', fontSize: '1.5rem'}}>×</button>
            <img src={active.images[0]} style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem'}} />
            <h2>{active.name}</h2>
            <p style={{color: '#666'}}>{active.description}</p>
            <p style={{fontSize: '14px', color: '#999'}}>{active.hours}</p>
          </div>
        </div>
      )}
    </div>
  );
}
