"use client";

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import "./globals.scss";

interface ILayoutClientProps {
  children: ReactNode;
}

const LayoutClient: FC<ILayoutClientProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // ▶️ play / pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }

    setPlaying(!playing);
  };

  // 🔊 громкость
  const changeVolume = (v: number) => {
    if (!audioRef.current) return;

    audioRef.current.volume = v;
    setVolume(v);
  };

  // 🎵 автозапуск + разблокировка звука
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // пробуем запустить без звука
    audio.play().catch(() => {});

    const enableSound = () => {
      audio.muted = false;
      audio.volume = volume;

      audio.play().catch(() => {});
      setPlaying(true);

      window.removeEventListener("click", enableSound);
      window.removeEventListener("touchstart", enableSound);
    };

    window.addEventListener("click", enableSound);
    window.addEventListener("touchstart", enableSound);

    return () => {
      window.removeEventListener("click", enableSound);
      window.removeEventListener("touchstart", enableSound);
    };
  }, []);

  return (
    <ReactQueryProvider>
      <>
        {/* 🎵 ГЛОБАЛЬНАЯ МУЗЫКА */}
        <audio ref={audioRef} src="/music.mp3" loop muted preload="auto" />

        {children}
      </>
    </ReactQueryProvider>
  );
};

export default LayoutClient;
