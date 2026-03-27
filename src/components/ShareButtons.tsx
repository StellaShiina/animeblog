import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, Twitter, Facebook, Link, MessageSquare, X } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const socialShares = [
    {
      name: 'X',
      icon: X || Link,
      url: `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook || Link,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'Weibo',
      icon: Share2,
      url: `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    },
    {
      name: 'Reddit',
      icon: MessageSquare || Link,
      url: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-12 border-t-2 border-border/50">
			<div className="flex items-center gap-4">
				<div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
					<Share2 size={24} />
				</div>
				<div>
					<p className="font-bold text-foreground">觉得有意思？</p>
					<p className="text-sm text-muted-foreground">分享给你的小伙伴吧！</p>
				</div>
			</div>
			<div className="flex gap-4">
        {socialShares.map(social => {
          const Icon = social.icon;
          return (
            <a 
              key={social.name} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all transform hover:scale-110"
              title={`分享到 ${social.name}`}
            >
              <Icon size={20} />
            </a>
          )
        })}
        <button 
          onClick={copyToClipboard} 
          className="cute-button bg-secondary text-primary hover:bg-secondary/80 flex items-center gap-2"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          <span className="hidden md:inline">{copied ? '已复制!' : '复制链接'}</span>
        </button>
			</div>
		</div>
  );
}
