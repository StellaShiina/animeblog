import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX, VolumeOff, SkipForward } from 'lucide-react';
import { useStore } from '@nanostores/react';
import {
  currentMusicStore,
  isPlayingStore,
  isMutedStore,
  playPageMusic,
  switchPageMusic,
  pageMusicStore
} from '../store/musicStore';

export default function MusicPlayer() {
  const currentMusic = useStore(currentMusicStore);
  const isPlaying = useStore(isPlayingStore);
  const isMuted = useStore(isMutedStore);
  const pageMusic = useStore(pageMusicStore);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 同步静音
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // 仅用于兜底同步播放状态（不负责首次播放）
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying && audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
    }

    if (!isPlaying && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const MuteIcon = VolumeOff ?? VolumeX ?? Volume2;

  return (
    <div className="fixed bottom-8 left-8 z-50 group">
      {/* ✅ audio 永远存在 */}
      <audio ref={audioRef} loop />

      <motion.div
        className="flex items-center gap-4 bg-background/80 backdrop-blur-md rounded-full p-2 border-2 border-border shadow-lg overflow-hidden"
        initial={{ width: 56 }}
        whileHover={{ width: 340 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* 播放按钮 */}
        <button
          onClick={() => playPageMusic(audioRef.current)}
          className="relative w-10 h-10 flex-shrink-0 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-transform z-10"
        >
          <motion.div
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            <Music size={20} />
          </motion.div>

          <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 border border-border">
            {isPlaying ? (
              <Pause size={10} fill="currentColor" className="text-primary" />
            ) : (
              <Play size={10} fill="currentColor" className="text-primary ml-0.5" />
            )}
          </div>
        </button>

        {/* 展开内容 */}
        <div className="flex items-center gap-3 flex-grow opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 whitespace-nowrap pr-2 overflow-hidden">
          <div className="flex-grow min-w-0">
            <p className="text-sm font-bold text-primary truncate">
              {currentMusic
                ? currentMusic.title
                : (pageMusic ? '待播放: ' + pageMusic.title : '未选择音乐')}
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest truncate">
              {currentMusic?.artist || 'AnimeBlog BGM'}
            </p>
          </div>

          <div className="flex items-center gap-1">
            {/* 切歌 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                switchPageMusic(audioRef.current);
              }}
              className={`p-2 rounded-full transition-colors ${
                pageMusic
                  ? 'hover:bg-primary/10 text-primary'
                  : 'text-muted-foreground cursor-not-allowed'
              }`}
            >
              <SkipForward size={18} fill="currentColor" />
            </button>

            {/* 静音 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                isMutedStore.set(!isMuted);
              }}
              className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors"
            >
              {isMuted ? <MuteIcon size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}