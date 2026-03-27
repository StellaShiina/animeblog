import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter as TwitterIcon, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Github', icon: Github, href: 'https://github.com/stellashiina' },
    // { name: 'Twitter', icon: TwitterIcon || Github, href: 'https://twitter.com' },
  ];

  return (
    <footer className="bg-background border-t-2 border-border py-12 px-6">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* About Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-2xl font-bold text-primary justify-center md:justify-start">
            <Heart fill="currentColor" size={28} />
            <span>AnimeBlog</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            匆匆的路上，在次元间找个角落，在现实与梦境的边界间偷得一刻安宁
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-primary">快速链接</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-primary transition-colors">首页</a></li>
            <li><a href="/blog" className="hover:text-primary transition-colors">所有博客</a></li>
            <li><a href="/about" className="hover:text-primary transition-colors">关于本站</a></li>
          </ul>
        </div>

        {/* Social & Copyright */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-primary">关于我</h3>
          <div className="flex gap-4 justify-center md:justify-start">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                aria-label={social.name}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl mt-12 pt-8 border-t-2 border-border/50 text-center text-sm text-muted-foreground">
        <p>© {currentYear} AnimeBlog. Made with ❤️ and ✨</p>
      </div>
    </footer>
  );
}
