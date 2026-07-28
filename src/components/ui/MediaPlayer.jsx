import { useState } from 'react';
import { MediaFallback } from './MediaFallback';

export function MediaPlayer({ src, type = 'video', label }) {
  const [failed, setFailed] = useState(!src);
  if (failed) return <MediaFallback label={label} />;
  const onError = () => setFailed(true);
  return type === 'audio'
    ? <audio className="audio-player" controls src={src} onError={onError} />
    : <video className="video-player" controls playsInline src={src} onError={onError} />;
}
