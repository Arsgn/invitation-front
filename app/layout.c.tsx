"use client";

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

interface ILayoutClientProps {
  children: ReactNode;
}

const LayoutClient: FC<ILayoutClientProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // ▶️ play / pause вручную
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch(() => {});
    }
  };

  // 🔊 громкость
  const changeVolume = (v: number) => {
    if (!audioRef.current) return;

    audioRef.current.volume = v;
    setVolume(v);
  };

  // 🎵 запуск ТОЛЬКО после клика (работает на телефонах)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startAudio = () => {
      audio.muted = false;
      audio.volume = volume;

      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});

      // удаляем все слушатели после первого касания
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("pointerdown", startAudio);
      window.removeEventListener("click", startAudio);
    };

    // 👇 ВАЖНО: сразу все типы событий
    window.addEventListener("touchstart", startAudio, { once: true });
    window.addEventListener("pointerdown", startAudio, { once: true });
    window.addEventListener("click", startAudio, { once: true });

    return () => {
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("pointerdown", startAudio);
      window.removeEventListener("click", startAudio);
    };
  }, []);

  return (
    <ReactQueryProvider>
      <>
        {/* 🎵 ГЛОБАЛЬНАЯ МУЗЫКА */}
        <audio ref={audioRef} src="/music.mp3" loop preload="auto" muted />
        {children}
      </>
    </ReactQueryProvider>
  );
};

export default LayoutClient;
