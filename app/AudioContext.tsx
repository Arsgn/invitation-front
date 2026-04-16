"use client";
import { createContext, useContext } from "react";

type AudioType = {
  audioRef: React.RefObject<HTMLAudioElement>;
  play: () => void;
};

export const AudioContext = createContext<AudioType | null>(null);

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside provider");
  return ctx;
};