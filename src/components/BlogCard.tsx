import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, Folder, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: {
    id: string;
    data: {
      title: string;
      description: string;
      pubDate: Date;
      heroImage?: {
        src: string;
        width: number;
        height: number;
        format: string;
      };
      category: string;
      tags: string[];
    };
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  const { title, description, pubDate, heroImage, category, tags } = post.data;
  const formattedDate = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(pubDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="cute-card overflow-hidden flex flex-col h-full relative group cursor-pointer"
    >
      <a href={`/blog/${post.id}`} className="absolute inset-0 z-30" aria-label={`Read more about ${title}`}></a>
      
      {heroImage && (
        <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-[1.4rem]">
          <img
            src={heroImage.src}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
              {category}
            </span>
          </div>
        </div>
      )}

      <div className="flex-grow space-y-3 relative z-20">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar size={14} className="text-primary" />
          <span>{formattedDate}</span>
        </div>

        <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-3">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t-2 border-border/50 flex flex-wrap gap-2 relative z-20">
        {tags.slice(0, 3).map((tag) => (
          <span key={tag} className="flex items-center gap-1 text-[10px] bg-secondary/20 text-primary px-2 py-0.5 rounded-full font-medium">
            <Tag size={10} />
            {tag}
          </span>
        ))}
        <div className="ml-auto text-primary group-hover:translate-x-1 transition-transform">
          <ArrowRight size={20} />
        </div>
      </div>
    </motion.div>
  );
}
