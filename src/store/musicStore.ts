import { atom } from 'nanostores';

export interface MusicInfo {
  url: string;
  title: string;
  artist?: string;
}

// 默认主页音乐
export const DEFAULT_MUSIC: MusicInfo = {
  url: 'https://s.rtt.li/f/1ohm/HOYO-MiX%20-%20%E7%9B%B8%E9%81%87%EF%BC%8C%E7%9B%B8%E5%88%AB%20Meeting%20and%20Passing.mp3',
  title: 'HOYO-MiX - 相遇，相别 Meeting and Passing',
  artist: 'HOYO-MiX'
};

// 当前播放器中加载的音乐
export const currentMusicStore = atom<MusicInfo | null>(null);

// 当前页面提供的音乐信息
export const pageMusicStore = atom<MusicInfo | null>(null);

// 播放状态
export const isPlayingStore = atom<boolean>(false);

// 静音状态
export const isMutedStore = atom<boolean>(false);

// 播放/暂停逻辑（关键修复）
export function playPageMusic(audio?: HTMLAudioElement | null) {
  const pageMusic = pageMusicStore.get();
  const currentMusic = currentMusicStore.get();

  // 没有当前音乐 → 直接选歌 + 播放（一次完成）
  if (!currentMusic) {
    const music = pageMusic ?? DEFAULT_MUSIC;
    currentMusicStore.set(music);

    if (audio) {
      audio.src = music.url;
      audio.load();

      // ⚠️ 必须在用户点击同步调用
      audio.play().catch(() => {
        console.log('播放被浏览器拦截');
      });
    }

    isPlayingStore.set(true);
    return;
  }

  // 已有音乐 → 切换播放状态
  if (audio) {
    if (audio.paused) {
      audio.play().catch(() => {});
      isPlayingStore.set(true);
    } else {
      audio.pause();
      isPlayingStore.set(false);
    }
  }
}

// 切歌逻辑
export function switchPageMusic(audio?: HTMLAudioElement | null) {
  const pageMusic = pageMusicStore.get();

  if (pageMusic) {
    currentMusicStore.set(pageMusic);

    if (audio) {
      audio.src = pageMusic.url;
      audio.load();
      audio.play().catch(() => {});
    }

    isPlayingStore.set(true);
  }
}