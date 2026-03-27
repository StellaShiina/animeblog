import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Tag, Folder, X } from 'lucide-react';
import BlogCard from './BlogCard';

interface Post {
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
}

interface BlogFilterProps {
  posts: Post[];
}

export default function BlogFilter({ posts }: BlogFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const categories = useMemo(() => {
    const cats = posts.map(p => p.data.category);
    return Array.from(new Set(cats));
  }, [posts]);

  const allTags = useMemo(() => {
    const tags = posts.flatMap(p => p.data.tags);
    return Array.from(new Set(tags));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts
      .filter(post => {
        const matchesSearch = post.data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.data.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || post.data.category === selectedCategory;
        const matchesTag = !selectedTag || post.data.tags.includes(selectedTag);
        return matchesSearch && matchesCategory && matchesTag;
      })
      .sort((a, b) => {
        const dateA = new Date(a.data.pubDate).getTime();
        const dateB = new Date(b.data.pubDate).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
  }, [posts, searchQuery, selectedCategory, selectedTag, sortOrder]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTag(null);
  };

  return (
    <div className="space-y-12">
      {/* Search and Filters */}
      <section className="cute-card space-y-8 bg-gradient-to-br from-card to-background border-border">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative w-full md:w-1/2 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
            <input
              type="text"
              placeholder="搜索感兴趣的话题..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cute-input w-full pl-12 h-14 text-lg bg-background"
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="cute-button flex-1 md:flex-none h-14"
            >
              <Calendar size={18} />
              {sortOrder === 'desc' ? '最近更新' : '最早发布'}
            </button>
            {(selectedCategory || selectedTag || searchQuery) && (
              <button
                onClick={clearFilters}
                className="p-4 rounded-full bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
                title="清除所有筛选"
              >
                <X size={24} />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Folder size={18} />
            <span>分类:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                    : 'bg-card text-muted-foreground hover:bg-secondary/30 border border-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Tag size={18} />
            <span>标签:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                    : 'bg-card text-muted-foreground hover:bg-secondary/30 border border-border'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Count */}
      <div className="flex justify-between items-center px-4">
        <p className="text-muted-foreground">
          找到 <span className="text-primary font-bold">{filteredPosts.length}</span> 篇相关的分享
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 cute-card"
        >
          <div className="text-6xl mb-4">QAQ</div>
          <h3 className="text-xl font-bold text-muted-foreground">没找到相关的博客内容呢...</h3>
          <p className="mt-2 text-muted-foreground">换个关键词试试看吧？</p>
          <button
            onClick={clearFilters}
            className="cute-button mt-6"
          >
            清除所有筛选
          </button>
        </motion.div>
      )}
    </div>
  );
}
