const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
async function api(url,opt){const r=await fetch(url,opt);if(!r.ok)throw new Error(await r.text());return r.status===204?null:r.json();}
async function reviews(){
 const pending=document.getElementById('pending-reviews'),published=document.getElementById('published-reviews');
 try{
  const rows=await api('/api/admin/reviews');
  const pend=rows.filter(r=>r.status==='pending'),pub=rows.filter(r=>r.status==='published');
  pending.innerHTML=pend.length?pend.map(r=>`<article class="admin-item"><strong>${esc(r.name)} — ${'★'.repeat(r.stars)}</strong><p>${esc(r.comment)}</p><div class="admin-actions"><button class="publish" onclick="publishReview(${r.id})">Publier</button><button class="edit" onclick='editReview(${r.id},${JSON.stringify(r.name)},${JSON.stringify(r.comment)})'>Modifier</button><button class="delete" onclick="deleteReview(${r.id})">Supprimer</button></div></article>`).join(''):'Aucun témoignage en attente.';
  published.innerHTML=pub.length?pub.map(r=>`<article class="admin-item"><strong>${esc(r.name)} — ${'★'.repeat(r.stars)}</strong><p>${esc(r.comment)}</p><div class="admin-actions"><button class="publish" onclick="unpublishReview(${r.id})">Dépublier</button><button class="edit" onclick='editReview(${r.id},${JSON.stringify(r.name)},${JSON.stringify(r.comment)})'>Modifier</button><button class="delete" onclick="deleteReview(${r.id})">Supprimer</button></div></article>`).join(''):'Aucun témoignage publié.';
 }catch(e){pending.textContent='Administration non disponible.';published.textContent='Administration non disponible.';}
}
async function publishReview(id){await api(`/api/admin/reviews/${id}/publish`,{method:'POST'});reviews();}
async function unpublishReview(id){await api(`/api/admin/reviews/${id}/unpublish`,{method:'POST'});reviews();}
async function deleteReview(id){if(confirm('Supprimer définitivement ce témoignage ?')){await api(`/api/admin/reviews/${id}`,{method:'DELETE'});reviews();}}
async function editReview(id,name,comment){const n=prompt('Nom ou pseudo',name);if(n===null)return;const c=prompt('Commentaire',comment);if(c===null)return;await api(`/api/admin/reviews/${id}`,{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({name:n,comment:c})});reviews();}
async function gallery(){const box=document.getElementById('admin-gallery');try{const rows=await api('/api/admin/gallery');box.innerHTML=rows.length?rows.map(x=>`<article class="admin-item"><strong>${esc(x.title||x.object_key)}</strong><p>${esc(x.caption||'')}</p><div class="admin-actions"><button class="delete" onclick="deletePhoto(${x.id})">Supprimer</button></div></article>`).join(''):'Aucune photo.';}catch(e){box.textContent='Galerie admin non disponible tant que R2/D1/Access ne sont pas configurés.';}}
const form=document.getElementById('photo-form');form.addEventListener('submit',async e=>{e.preventDefault();const status=document.getElementById('photo-status');status.textContent='Envoi…';try{await api('/api/admin/gallery',{method:'POST',body:new FormData(form)});form.reset();status.textContent='Photo ajoutée.';gallery();}catch(e){status.textContent='Ajout impossible : '+e.message;}});
async function deletePhoto(id){if(confirm('Supprimer cette photo ?')){await api(`/api/admin/gallery/${id}`,{method:'DELETE'});gallery();}}
reviews();gallery();
