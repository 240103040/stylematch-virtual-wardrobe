import { useEffect, useMemo, useState } from 'react';
import { Shirt, Sparkles, LayoutDashboard, Plus, Search, Trash2, WandSparkles, Layers3, Heart, Menu } from 'lucide-react';
import type { ClothingItem, Category, Season, Occasion, Outfit } from './types';
import { httpWardrobeService, mockWardrobeService } from './services/wardrobeService';

const useMock = new URLSearchParams(window.location.search).get('mock') === '1';
const service = useMock ? mockWardrobeService : httpWardrobeService;
type Page = 'Overview' | 'My Wardrobe' | 'Outfit Studio' | 'Style Ideas';
const pages: { name: Page; icon: typeof LayoutDashboard }[] = [
  { name: 'Overview', icon: LayoutDashboard }, { name: 'My Wardrobe', icon: Shirt }, { name: 'Outfit Studio', icon: Layers3 }, { name: 'Style Ideas', icon: Sparkles },
];
const categories: Category[] = ['top', 'bottom', 'shoes', 'accessory', 'outerwear'];
const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter', 'all-season'];
const occasions: Occasion[] = ['casual', 'university', 'work', 'formal', 'party'];

export default function App() {
  const [page, setPage] = useState<Page>('Overview');
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', category: 'top' as Category, color: '', season: 'all-season' as Season, occasion: 'casual' as Occasion, image_url: '' });
  const [selected, setSelected] = useState<number[]>([]);
  const [outfitName, setOutfitName] = useState('My new look');
  const [recommendations, setRecommendations] = useState<{clothing_item_ids:number[];explanation:string}[]>([]);

  async function refresh() {
    setLoading(true); setError('');
    try { const [clothes, saved] = await Promise.all([service.listClothing(), service.listOutfits()]); setItems(clothes); setOutfits(saved); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not load data. Is the backend running?'); }
    finally { setLoading(false); }
  }
  useEffect(() => { void refresh(); }, []);
  const filtered = useMemo(() => items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) && (category === 'all' || i.category === category)), [items, search, category]);
  async function addItem(e: React.FormEvent) {
    e.preventDefault(); setError(''); setNotice('');
    try {
      await service.addClothing({ name: form.name.trim(), category: form.category, color: form.color.trim(), season: form.season, occasions: [form.occasion], image_url: form.image_url.trim() || null });
      setShowForm(false); setForm({ name: '', category: 'top', color: '', season: 'all-season', occasion: 'casual', image_url: '' }); setNotice('Item added to your wardrobe.'); await refresh();
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not add item.'); }
  }
  async function deleteItem(id: number) { if (!window.confirm('Remove this item from your wardrobe?')) return; try { await service.deleteClothing(id); setNotice('Item removed.'); await refresh(); } catch(e) { setError(e instanceof Error ? e.message : 'Could not delete item.'); } }
  async function saveOutfit() {
    if (selected.length === 0) { setError('Select at least one clothing item first.'); return; }
    try { await service.addOutfit({ name: outfitName.trim() || 'My look', occasion: 'casual', season: 'all-season', clothing_item_ids: selected }); setSelected([]); setNotice('Outfit saved.'); await refresh(); }
    catch(e) { setError(e instanceof Error ? e.message : 'Could not save outfit.'); }
  }
  async function generate() { try { setError(''); setRecommendations(await service.generate('casual')); } catch(e) { setError(e instanceof Error ? e.message : 'Could not generate outfits.'); } }
  const label = (s: string) => s.replaceAll('-', ' ').replace(/\b\w/g, c => c.toUpperCase());
  const itemById = (id: number) => items.find(i => i.id === id);

  return <div className="app-shell">
    <aside className="sidebar"><div className="brand-mark">S<span>·</span></div><div className="brand-copy"><strong>stylematch</strong><small>YOUR PERSONAL EDIT</small></div>
      <div className="side-label">WORKSPACE</div><nav>{pages.map(({name,icon:Icon}) => <button key={name} className={`nav-link ${page===name?'active':''}`} onClick={() => {setPage(name);setError('');}}><Icon size={18}/><span>{name}</span>{name==='My Wardrobe'&&<span className="nav-count">{items.length}</span>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="season-card"><span className="season-icon">✳</span><p>Wear what you love.</p><small>Make more of what you own.</small></div><div className="profile"><div className="avatar">A</div><div><strong>Your closet</strong><small>Personal collection</small></div></div></div>
    </aside>
    <main className="main-content"><header className="topbar"><div className="mobile-brand"><span className="brand-mark small">S</span><strong>stylematch</strong></div><div className="breadcrumb">YOUR SPACE <span>/</span> {page.toUpperCase()}</div><div className="top-actions"><span className="today-pill">✦ YOUR STYLE, YOUR RULES</span><button className="icon-button" title="Open wardrobe" onClick={()=>setPage('My Wardrobe')}><Menu size={18}/></button></div></header>
      {error && <div className="alert error" role="alert">{error}<button onClick={()=>setError('')}>×</button></div>}{notice && <div className="alert success" role="status">{notice}<button onClick={()=>setNotice('')}>×</button></div>}
      {loading ? <div className="loading-state">Opening your wardrobe…</div> : <>
      {page==='Overview' && <>
        <section className="hero"><div className="hero-copy"><span className="eyebrow">THE ART OF GETTING DRESSED</span><h1>Less wondering.<br/><em>More wearing.</em></h1><p>Your wardrobe, thoughtfully organized. Find new ways to wear the pieces you already love.</p><button className="primary-button" onClick={()=>setPage('My Wardrobe')}>Explore my wardrobe <span>↗</span></button></div><div className="hero-image"><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000" alt="Editorial fashion styling"/><div className="image-note"><span>STYLE NOTE 01</span><strong>Good style starts<br/>with what you own.</strong></div></div><span className="hero-number">01 / EDIT</span></section>
        <section className="stats-grid"><div className="stat-card"><span className="stat-label">YOUR PIECES</span><Shirt size={18}/><strong>{items.length.toString().padStart(2,'0')}</strong><small>Pieces in your collection</small></div><div className="stat-card"><span className="stat-label">YOUR OUTFITS</span><Layers3 size={18}/><strong>{outfits.length.toString().padStart(2,'0')}</strong><small>Looks saved for later</small></div><div className="stat-card accent-stat"><span className="stat-label">A LITTLE INSPIRATION</span><Sparkles size={18}/><strong>∞</strong><small>New ways to wear your pieces</small></div></section>
        <section className="section-block"><div className="section-heading"><div><span className="eyebrow">CURATED FOR YOU</span><h2>Recently added</h2></div><button className="text-button" onClick={()=>setPage('My Wardrobe')}>View all pieces ↗</button></div><div className="clothing-grid">{items.slice(0,4).map(item=><ClothingCard key={item.id} item={item} onDelete={deleteItem} label={label}/>)}</div>{items.length===0&&<EmptyState text="Your wardrobe is waiting for its first piece." action="Add your first item" onClick={()=>setShowForm(true)}/>}</section>
      </>}
      {page==='My Wardrobe' && <><PageHeading eyebrow="EVERY PIECE, IN ITS PLACE" title="My wardrobe" subtitle="A little collection of things that feel like you." action={<button className="primary-button" onClick={()=>setShowForm(true)}><Plus size={16}/> Add a piece</button>}/><div className="toolbar"><label className="search-box"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find something in your closet…"/></label><select value={category} onChange={e=>setCategory(e.target.value)} aria-label="Filter by category"><option value="all">All categories</option>{categories.map(c=><option key={c} value={c}>{label(c)}</option>)}</select></div><div className="result-count">SHOWING {filtered.length} {filtered.length===1?'PIECE':'PIECES'}</div><div className="clothing-grid">{filtered.map(item=><ClothingCard key={item.id} item={item} onDelete={deleteItem} label={label}/>)}</div>{filtered.length===0&&<EmptyState text="No pieces found. Try another search or add something new." action="Add a piece" onClick={()=>setShowForm(true)}/>}</>}
      {page==='Outfit Studio' && <><PageHeading eyebrow="PUT THE PIECES TOGETHER" title="Outfit studio" subtitle="Mix, match, and make it your own."/><div className="studio-layout"><section className="studio-panel"><div className="panel-title"><span>01</span><div><h3>Choose your pieces</h3><p>Select the items you want to style together.</p></div></div><div className="mini-item-list">{items.map(item=><button key={item.id} className={`mini-item ${selected.includes(item.id)?'selected':''}`} onClick={()=>setSelected(prev=>prev.includes(item.id)?prev.filter(id=>id!==item.id):[...prev,item.id])}><img src={item.image_url||fallbackImage(item.category)} alt=""/><span><strong>{item.name}</strong><small>{label(item.category)} · {item.color}</small></span><span className="select-indicator">{selected.includes(item.id)?'✓':'+'}</span></button>)}</div>{items.length===0&&<p className="muted">Add clothing before creating an outfit.</p>}</section><section className="studio-panel preview-panel"><div className="panel-title"><span>02</span><div><h3>Your composition</h3><p>{selected.length} pieces selected</p></div></div><div className="composition">{selected.length?selected.map(id=>{const item=itemById(id);return item?<div className="composition-item" key={id}><img src={item.image_url||fallbackImage(item.category)} alt={item.name}/><span>{item.name}</span></div>:null}):<div className="composition-empty"><Sparkles size={28}/><p>Your next favorite outfit<br/>starts here.</p><small>Select pieces from the left.</small></div>}</div><label className="field-label">NAME YOUR LOOK<input value={outfitName} onChange={e=>setOutfitName(e.target.value)} maxLength={100}/></label><button className="primary-button full-button" onClick={saveOutfit}>Save this outfit <Heart size={16}/></button></section></div></>}
      {page==='Style Ideas' && <><PageHeading eyebrow="A FRESH PERSPECTIVE" title="Style ideas" subtitle="Thoughtful combinations, made from pieces you already own." action={<button className="primary-button" onClick={generate}><WandSparkles size={16}/> Generate looks</button>}/><div className="recommendation-list">{recommendations.map((rec,i)=><div className="recommendation-card" key={i}><div className="rec-number">LOOK {String(i+1).padStart(2,'0')}</div><div className="rec-items">{rec.clothing_item_ids.map(id=>{const item=itemById(id);return item?<div key={id}><img src={item.image_url||fallbackImage(item.category)} alt={item.name}/><small>{item.name}</small></div>:null})}</div><p>{rec.explanation}</p><button className="text-button" onClick={async()=>{try{await service.addOutfit({name:`Style idea ${i+1}`,occasion:'casual',season:'all-season',clothing_item_ids:rec.clothing_item_ids});setNotice('Style idea saved to your outfits.');await refresh();}catch(e){setError(e instanceof Error?e.message:'Could not save idea.')}}}>Save this look ↗</button></div>)}</div>{recommendations.length===0&&<div className="ideas-empty"><div className="ideas-sparkle"><Sparkles size={28}/></div><h3>Your next look is already in your closet.</h3><p>Generate combinations from your wardrobe. Add at least one top, one bottom, and a pair of shoes to get a complete look.</p><button className="primary-button" onClick={generate}><WandSparkles size={16}/> Find my looks</button></div>}</>}
      {outfits.length>0&&page!=='Outfit Studio'&&<section className="section-block saved-section"><div className="section-heading"><div><span className="eyebrow">KEPT CLOSE</span><h2>Saved outfits</h2></div><span className="result-count">{outfits.length} LOOKS</span></div><div className="saved-outfits">{outfits.map(o=><div className="saved-outfit" key={o.id}><div className="saved-thumbs">{o.clothing_item_ids.slice(0,3).map(id=>{const item=itemById(id);return item?<img key={id} src={item.image_url||fallbackImage(item.category)} alt=""/>:null})}</div><div><strong>{o.name}</strong><small>{o.clothing_item_ids.length} pieces · {label(o.occasion)}</small></div></div>)}</div></section>}
      </>}
    </main>
    {showForm&&<div className="modal-backdrop" role="presentation" onClick={e=>{if(e.target===e.currentTarget)setShowForm(false)}}><form className="modal" onSubmit={addItem}><div className="modal-heading"><div><span className="eyebrow">A NEW FAVORITE</span><h2>Add a piece</h2></div><button type="button" className="close-button" onClick={()=>setShowForm(false)} aria-label="Close">×</button></div><label className="field-label">ITEM NAME<input required minLength={1} maxLength={100} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Linen white shirt"/></label><div className="form-row"><label className="field-label">CATEGORY<select value={form.category} onChange={e=>setForm({...form,category:e.target.value as Category})}>{categories.map(c=><option key={c} value={c}>{label(c)}</option>)}</select></label><label className="field-label">COLOR<input required value={form.color} onChange={e=>setForm({...form,color:e.target.value})} placeholder="e.g. Ivory"/></label></div><label className="field-label">SEASON<select value={form.season} onChange={e=>setForm({...form,season:e.target.value as Season})}>{seasons.map(s=><option key={s} value={s}>{label(s)}</option>)}</select></label><label className="field-label">OCCASION<select value={form.occasion} onChange={e=>setForm({...form,occasion:e.target.value as Occasion})}>{occasions.map(o=><option key={o} value={o}>{label(o)}</option>)}</select></label><label className="field-label">IMAGE URL <span className="optional">(OPTIONAL)</span><input type="url" value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})} placeholder="https://…"/></label><div className="modal-actions"><button type="button" className="secondary-button" onClick={()=>setShowForm(false)}>Cancel</button><button className="primary-button" type="submit">Add to wardrobe <Plus size={16}/></button></div></form></div>}
    <footer className="footer"><span>STYLEMATCH © 2026</span><span>CONSIDERED STYLE. CONSCIOUS CLOSET.</span></footer>
  </div>;
}
function PageHeading({eyebrow,title,subtitle,action}:{eyebrow:string;title:string;subtitle:string;action?:React.ReactNode}){return <section className="page-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div>{action}</section>}
function ClothingCard({item,onDelete,label}:{item:ClothingItem;onDelete:(id:number)=>void;label:(s:string)=>string}){return <article className="clothing-card"><div className="clothing-image"><img src={item.image_url||fallbackImage(item.category)} alt={item.name} loading="lazy"/><span className="category-tag">{label(item.category)}</span><button className="delete-button" title={`Delete ${item.name}`} aria-label={`Delete ${item.name}`} onClick={()=>onDelete(item.id)}><Trash2 size={15}/></button></div><div className="clothing-meta"><div><h3>{item.name}</h3><p>{label(item.season)} · {item.color}</p></div><span className="color-dot" title={item.color} style={{background:cssColor(item.color)}}/></div></article>}
function EmptyState({text,action,onClick}:{text:string;action:string;onClick:()=>void}){return <div className="empty-state"><Shirt size={28}/><p>{text}</p><button className="text-button" onClick={onClick}>{action} ↗</button></div>}
function fallbackImage(category:string){const q=category==='shoes'?'shoes':category==='bottom'?'jeans':'clothing';return `https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop`;}
function cssColor(color:string){const map:Record<string,string>={white:'#f7f5ef',black:'#242321',blue:'#4d7192',beige:'#d7c4a7',red:'#9b3737',green:'#60765a',brown:'#795548',pink:'#e7b6bf',gray:'#aaa'};return map[color.toLowerCase()]||'#c8b8a5';}
