import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, MessageSquare, User, Send, Plus, Search, Heart as HeartIcon, Sparkles, BookOpen } from 'lucide-react';
import { Card, Button, Textarea } from '../ui/Base';
import { BLOG_POSTS } from '../../constants';
import { BlogPost, Comment } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

export const BlogView = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [customPosts, setCustomPosts] = useState<BlogPost[]>([]);
  const [allComments, setAllComments] = useState<Record<string, Comment[]>>({});
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  
  // Filtering and searching states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // States for new post form
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Crecimiento Personal");

  const [newCommentText, setNewCommentText] = useState("");
  const [userName, setUserName] = useState("Estudiante");

  // Load posts, comments, and likes from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem('blog_comments');
    const savedPosts = localStorage.getItem('user_blog_posts');
    const savedLikes = localStorage.getItem('blog_likes');
    const savedLikedPosts = localStorage.getItem('user_liked_posts');
    
    if (savedComments) {
      try { setAllComments(JSON.parse(savedComments)); } 
      catch (e) { console.error("Error loading comments", e); }
    }
    
    if (savedPosts) {
      try { setCustomPosts(JSON.parse(savedPosts)); }
      catch (e) { console.error("Error loading posts", e); }
    }

    if (savedLikes) {
      try { setLikes(JSON.parse(savedLikes)); }
      catch (e) { console.error("Error loading likes", e); }
    }

    if (savedLikedPosts) {
      try { setLikedPosts(JSON.parse(savedLikedPosts)); }
      catch (e) { console.error("Error loading liked posts", e); }
    }
  }, []);

  const combinedPosts = [...BLOG_POSTS, ...customPosts];

  // Extract unique categories for filtering
  const categories = ["Todos", ...Array.from(new Set(combinedPosts.map(p => {
    if (!p.category) return "General";
    // Clean category for simple tabs (e.g. "Psicología / Salud Mental" -> "Psicología")
    return p.category.split('/')[0].trim();
  })))];

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: BlogPost = {
      id: `user-${Date.now()}`,
      title: newPostTitle.trim(),
      excerpt: newPostContent.trim().substring(0, 100) + "...",
      content: newPostContent.trim(),
      category: newPostCategory,
      date: "Hoy (Publicado por ti)",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop"
    };

    const updated = [...customPosts, newPost];
    setCustomPosts(updated);
    localStorage.setItem('user_blog_posts', JSON.stringify(updated));
    
    // Reset form
    setNewPostTitle("");
    setNewPostContent("");
    setIsCreating(false);
  };

  const handleToggleLike = (postId: string) => {
    const isAlreadyLiked = likedPosts[postId];
    const newLikedPosts = { ...likedPosts, [postId]: !isAlreadyLiked };
    const currentLikes = likes[postId] || 0;
    const newLikes = { ...likes, [postId]: isAlreadyLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1 };
    
    setLikedPosts(newLikedPosts);
    setLikes(newLikes);
    localStorage.setItem('user_liked_posts', JSON.stringify(newLikedPosts));
    localStorage.setItem('blog_likes', JSON.stringify(newLikes));
  };

  // Save comments to localStorage
  const saveComments = (updatedComments: Record<string, Comment[]>) => {
    setAllComments(updatedComments);
    localStorage.setItem('blog_comments', JSON.stringify(updatedComments));
  };

  const handleAddComment = () => {
    if (!selectedPost || !newCommentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      userName: userName || "Anónimo",
      text: newCommentText.trim(),
      date: "Ahora mismo"
    };

    const postComments = allComments[selectedPost.id] || [];
    const updated = {
      ...allComments,
      [selectedPost.id]: [...postComments, newComment]
    };

    saveComments(updated);
    setNewCommentText("");
  };

  // Advanced content formatter
  const parseBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const clean = part.slice(2, -2);
        return <strong key={i} className="font-extrabold text-slate-800 bg-rose-50/50 px-1 rounded">{clean}</strong>;
      }
      return part;
    });
  };

  const renderContent = (content: string) => {
    const blocks = content.split('\n\n');
    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Header H4
      if (trimmed.startsWith('#### ') || trimmed.startsWith('### ')) {
        const text = trimmed.replace(/^#{3,4}\s+/, '');
        return (
          <h4 key={idx} className="text-xs sm:text-sm font-black text-rose-600 tracking-tight mt-4 mb-2 border-l-3 border-rose-500 pl-2">
            {parseBoldText(text)}
          </h4>
        );
      }

      // Bullets list
      if (trimmed.startsWith('•') || trimmed.startsWith('*') || trimmed.startsWith('-')) {
        const bulletLines = trimmed.split('\n');
        return (
          <div key={idx} className="space-y-1.5 my-2">
            {bulletLines.map((line, lIdx) => {
              const cleanLine = line.replace(/^[•*\-\s]+/, '').trim();
              return (
                <div key={lIdx} className="flex items-start gap-1.5 bg-rose-50/10 p-2 rounded-lg border border-rose-100/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                  <p className="text-slate-600 text-[10px] sm:text-xs leading-relaxed flex-1 font-medium">
                    {parseBoldText(cleanLine)}
                  </p>
                </div>
              );
            })}
          </div>
        );
      }

      // Numbered list
      if (/^\d+\.\s+/.test(trimmed)) {
        const lines = trimmed.split('\n');
        return (
          <div key={idx} className="space-y-1.5 my-2">
            {lines.map((line, lIdx) => {
              const match = line.match(/^(\d+)\.\s+(.*)/);
              if (match) {
                const num = match[1];
                const text = match[2];
                return (
                  <div key={lIdx} className="flex items-start gap-1.5 bg-slate-50/20 p-2 rounded-lg border border-slate-100/20">
                    <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center font-black text-[8px] flex-shrink-0 shadow-sm mt-0.5">
                      {num}
                    </span>
                    <p className="text-slate-600 text-[10px] sm:text-xs leading-relaxed flex-1 font-medium">
                      {parseBoldText(text)}
                    </p>
                  </div>
                );
              }
              return (
                <p key={lIdx} className="text-slate-600 text-[10px] sm:text-xs leading-relaxed pl-6 font-medium">
                  {parseBoldText(line)}
                </p>
              );
            })}
          </div>
        );
      }

      // Default paragraph
      return (
        <p key={idx} className="text-slate-600 text-[10px] sm:text-xs leading-relaxed mb-2.5 last:mb-0 font-medium">
          {parseBoldText(trimmed)}
        </p>
      );
    });
  };

  // Filter posts based on search query and category tab
  const filteredPosts = combinedPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === "Todos") return matchesSearch;
    const cleanCat = (post.category || "General").split('/')[0].trim();
    return cleanCat === selectedCategory && matchesSearch;
  });

  if (selectedPost) {
    const postComments = allComments[selectedPost.id] || [];
    const isPostLiked = likedPosts[selectedPost.id] || false;
    const postLikesCount = (likes[selectedPost.id] || 0) + (selectedPost.id === 'modern-bonds' ? 124 : selectedPost.id === 'science-of-love' ? 98 : selectedPost.id === 'attachment-styles' ? 152 : selectedPost.id === 'dating-mistakes' ? 110 : 12);

    return (
      <div className="space-y-4 pb-16 animate-in slide-in-from-right-4 duration-500">
        <header className="pt-2 px-1">
          <button 
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-1.5 text-rose-500 font-black text-[10px] uppercase tracking-wider mb-3 transition-transform active:scale-95 bg-white border border-rose-100 px-3 py-1.5 rounded-full shadow-sm hover:bg-rose-50"
          >
            <ChevronLeft size={14} /> Volver al Blog
          </button>
          
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <span className="text-[8px] font-black uppercase tracking-wider text-rose-500 bg-rose-50 border border-rose-100/50 px-2 py-0.5 rounded-full">
              {selectedPost.date}
            </span>
            {selectedPost.category && (
              <span className="text-[8px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                {selectedPost.category}
              </span>
            )}
          </div>
          <h2 className="text-sm sm:text-base md:text-lg font-black text-slate-800 leading-tight uppercase tracking-tight">
            {selectedPost.title}
          </h2>
        </header>

        <Card className="border-rose-50 shadow-sm p-0 overflow-hidden rounded-2xl">
          {selectedPost.image && (
            <div className="w-full h-36 sm:h-52 md:h-64 relative overflow-hidden">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
            </div>
          )}
          <div className="p-4 sm:p-5 md:p-6">
            <div className="prose prose-rose max-w-none">
              {renderContent(selectedPost.content)}
            </div>

            {/* Actions: Like and Share inside post */}
            <div className="flex items-center justify-between border-t border-slate-100 mt-5 pt-4">
              <button 
                onClick={() => handleToggleLike(selectedPost.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all ${
                  isPostLiked 
                    ? 'bg-rose-500 text-white border-rose-500 shadow-sm shadow-rose-100' 
                    : 'bg-white text-slate-500 border-slate-200 hover:bg-rose-50/20 hover:border-rose-200'
                }`}
              >
                <HeartIcon size={14} fill={isPostLiked ? "currentColor" : "none"} className={isPostLiked ? "animate-bounce" : ""} />
                <span className="text-[9px] font-black uppercase tracking-wider">
                  {isPostLiked ? '¡Me encanta!' : 'Me encanta'} ({postLikesCount})
                </span>
              </button>

              <div className="flex items-center gap-1 text-[8px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2.5 py-1.5 rounded-full">
                <Sparkles size={10} className="text-rose-400" /> Autoeducación Activa
              </div>
            </div>
          </div>
        </Card>

        {/* Sección de Comentarios */}
        <div className="space-y-3 px-1">
          <div className="flex items-center gap-1.5 text-slate-800 font-bold border-b border-rose-100/30 pb-2">
            <MessageSquare size={16} className="text-rose-500 animate-pulse" />
            <h3 className="text-xs uppercase tracking-tight font-black">Reflexiones Estudiantiles ({postComments.length})</h3>
          </div>

          <div className="space-y-2">
            {postComments.length === 0 ? (
              <div className="text-center py-6 bg-white/50 border border-dashed border-slate-200 rounded-2xl p-4">
                <p className="text-slate-400 text-[10px] italic mb-0.5">No hay comentarios ni reflexiones aún.</p>
                <p className="text-[9px] text-rose-450 font-semibold">¡Inicia la conversación compartiendo tu punto de vista!</p>
              </div>
            ) : (
              postComments.map((comment) => (
                <div key={comment.id} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-[10px] shadow-sm">
                      {comment.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-850 leading-none">{comment.userName}</p>
                      <p className="text-[8px] text-slate-400 uppercase font-black mt-0.5 leading-none">{comment.date}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-[10px] sm:text-xs leading-relaxed pl-1">{comment.text}</p>
                </div>
              ))
            )}
          </div>

          <div className="bg-slate-50 border border-slate-100/60 p-3 rounded-2xl space-y-2 shadow-inner">
            <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-500 pl-1">Agregar tu punto de vista</h4>
            <input 
              type="text" 
              placeholder="Tu nombre o Alias"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[10px] sm:text-xs outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-200/10 transition-all font-semibold"
            />
            <div className="flex gap-1.5">
              <Textarea 
                placeholder="Escribe tu reflexión..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="min-h-10 text-[10px] sm:text-xs bg-white py-1.5 px-3"
              />
              <Button 
                onClick={handleAddComment}
                disabled={!newCommentText.trim()}
                className="w-10 h-10 p-0 flex-shrink-0 rounded-lg"
              >
                <Send size={14} />
              </Button>
            </div>
          </div>
        </div>

        <div className="px-1">
          <Button 
            onClick={() => setSelectedPost(null)} 
            variant="outline" 
            className="w-full py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all rounded-xl"
          >
            Finalizar Lectura
          </Button>
        </div>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div className="space-y-6 pb-24 animate-in slide-in-from-bottom-8 duration-500">
        <header className="pt-4 px-2">
          <button 
            onClick={() => setIsCreating(false)}
            className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider mb-4 border border-slate-200 bg-white px-4 py-2 rounded-full shadow-sm hover:bg-slate-50"
          >
            <ChevronLeft size={16} /> Cancelar Lección
          </button>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 uppercase tracking-tighter">Nueva Reflexión</h2>
          <p className="text-slate-500 text-sm">Comparte un artículo, vivencia o lección antropológica basada en tu aprendizaje.</p>
        </header>

        <Card className="space-y-4 border-rose-100 shadow-xl p-6 rounded-[2rem]">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Título del artículo</label>
            <input 
              type="text" 
              placeholder="Ej: El valor intangible de la fidelidad cotidiana"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-base font-bold outline-none focus:border-rose-300 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Categoría</label>
            <select 
              value={newPostCategory}
              onChange={(e) => setNewPostCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-rose-300 focus:bg-white transition-all"
            >
              <option value="Crecimiento Personal">Crecimiento Personal</option>
              <option value="Psicología">Psicología & Apego</option>
              <option value="Cultura y Relaciones">Cultura y Relaciones</option>
              <option value="Antropología Personalista">Antropología Personalista</option>
              <option value="Comunicación y Bienestar">Comunicación y Bienestar</option>
            </select>
          </div>

          <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Contenido completo (Usa **texto** para negrita)</label>
             <Textarea 
                placeholder="Escribe aquí tu pensamiento pedagógico o análisis de relaciones..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-[220px]"
             />
          </div>

          <Button 
            onClick={handleCreatePost}
            disabled={!newPostTitle.trim() || !newPostContent.trim()}
            className="w-full py-4 text-xs font-black uppercase tracking-widest shadow-lg shadow-rose-200 rounded-2xl"
          >
            Publicar en el Blog
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-16 animate-in fade-in duration-500">
      <header className="pt-2 px-1 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-slate-800 uppercase tracking-tighter">Biblioteca Conceptual</h2>
          <p className="text-slate-500 text-[10px] sm:text-xs">Lecciones para una afectividad madura.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-rose-500 hover:bg-rose-600 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform flex-shrink-0"
          title="Crear nueva publicación"
        >
          <Plus size={18} />
        </button>
      </header>

      {/* Styled Search Box & Category Filters */}
      <div className="space-y-2.5 px-1">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <Search size={14} />
          </span>
          <input 
            type="text" 
            placeholder="Buscar lecturas..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-xl pl-9 pr-3 py-1.5 text-xs font-semibold outline-none focus:border-rose-400 focus:bg-white transition-all shadow-sm"
          />
        </div>

        {/* Categories Horizontal Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin snap-x max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider whitespace-nowrap snap-start border transition-all ${
                selectedCategory === cat
                  ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-rose-50/10 hover:border-rose-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog List Grid */}
      <div className="space-y-3 px-1">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-2xl border border-slate-100 p-5 space-y-2">
            <BookOpen size={28} className="text-rose-300 mx-auto" strokeWidth={1.5} />
            <p className="text-slate-500 font-bold text-xs">No se encontraron artículos</p>
            <p className="text-[10px] text-slate-400">Prueba ajustando tu búsqueda o selecciona otra categoría.</p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const postImg = post.image || `https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop`;
            const isPostLiked = likedPosts[post.id] || false;
            const postLikesCount = (likes[post.id] || 0) + (post.id === 'modern-bonds' ? 124 : post.id === 'science-of-love' ? 98 : post.id === 'attachment-styles' ? 152 : post.id === 'dating-mistakes' ? 110 : 12);

            return (
              <Card 
                key={post.id} 
                onClick={() => setSelectedPost(post)}
                className="hover:shadow-md cursor-pointer transition-all hover:-translate-y-1 active:scale-[0.99] border-slate-100/70 hover:border-rose-100 relative group overflow-hidden p-3 sm:p-3.5 bg-white shadow-sm rounded-2xl"
              >
                <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                  <div className="w-full sm:w-28 md:w-32 h-28 sm:h-auto min-h-[90px] relative rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-50 shadow-inner">
                    <img 
                      src={postImg} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      {post.id.startsWith('user-') && (
                        <div className="absolute top-3 right-3 bg-amber-50 text-amber-600 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-amber-100 z-10 shadow-sm">
                          Tu publicación
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-1 mb-1 pr-16 bg-transparent">
                        <span className="text-[8px] font-black text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-full border border-rose-100/30 uppercase tracking-widest">{post.date}</span>
                        {post.category && (
                          <span className="text-[8px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded-full max-w-[150px] truncate">
                            {post.category.split('/')[0].trim()}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs sm:text-sm font-black text-slate-800 mb-0.5 group-hover:text-rose-500 transition-colors leading-snug uppercase tracking-tight">{post.title}</h3>
                      <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed font-semibold">{post.excerpt}</p>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between border-t border-slate-50 pt-2 bg-transparent">
                      <div className="flex items-center text-rose-500 font-extrabold text-[9px] gap-0.5 py-0.5 group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                        LEER INTERACTIVO <ChevronRight size={10} />
                      </div>

                      <div className="flex items-center gap-1 text-[9px] text-slate-450 font-black uppercase py-0.5">
                        <HeartIcon size={10} fill={isPostLiked ? '#f43f5e' : 'none'} className={isPostLiked ? 'text-rose-500' : 'text-slate-400'} /> 
                        <span>{postLikesCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

