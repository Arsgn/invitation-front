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
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch(() => {});
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
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const startAudio = () => {
      audio.muted = false;
      audio.volume = volume;

      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {});

      document.removeEventListener("click", startAudio);
      document.removeEventListener("touchstart", startAudio);
    };

    document.addEventListener("click", startAudio);
    document.addEventListener("touchstart", startAudio);

    return () => {
      document.removeEventListener("click", startAudio);
      document.removeEventListener("touchstart", startAudio);
    };
  }, []);

  return (
    <ReactQueryProvider>
      <>
        {/* 🎵 ГЛОБАЛЬНАЯ МУЗЫКА */}
        <audio
          ref={audioRef}
          src="/music.mp3"
          loop
          preload="auto"
          muted
        />

        {children}
      </>
    </ReactQueryProvider>
  );
};

export default LayoutClient;