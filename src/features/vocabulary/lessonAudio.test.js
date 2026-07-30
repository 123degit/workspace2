import { describe, expect, it, vi } from 'vitest';
import { playLessonAudio } from './VocabularyPage';

describe('playLessonAudio', () => {
  it('plays the selected word audio file', () => {
    const audio = { play: vi.fn() };
    const AudioMock = vi.fn(function AudioMock() { return audio; });
    vi.stubGlobal('Audio', AudioMock);

    playLessonAudio('/music/cherry拼读音频.mp3');

    expect(AudioMock).toHaveBeenCalledWith('/music/cherry拼读音频.mp3');
    expect(audio.play).toHaveBeenCalledOnce();
    vi.unstubAllGlobals();
  });
});
