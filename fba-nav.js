(()=>{'use strict';
const sections=[
{title:'FBA Wallpapers',links:[
['Toutes les collections','fba-wallpapers.html'],
{title:'Formule 1',links:[{title:'Saison 2026',links:[['Tous les pilotes','fba-wallpapers-f1.html'],['Monoplaces','fba-f1-monoplaces-2026.html'],['Circuits','fba-f1-circuits-2026.html'],['Écuries','fba-f1-ecuries-2026.html']]}]},
{title:'MotoGP',links:[{title:'Saison 2026',links:[['Pilotes','fba-motogp-2026.html#pilotes'],['Motos de course','fba-motogp-2026.html#motos'],['Équipes','fba-motogp-2026.html#equipes'],['Circuits','fba-motogp-2026.html#circuits']]}]},
{title:'Cyclisme',links:[{title:'Tour de France — 2026',links:[['Les 21 étapes','fba-tour-de-france-2026.html#etapes'],['Coureurs','fba-tour-de-france-2026.html#coureurs'],['Équipes','fba-tour-de-france-2026.html#equipes'],['Coulisses du cyclisme','fba-tour-de-france-2026.html#coulisses']]}]},
{title:'Aviation',links:[['Avions de chasse',null],['Avions civils',null],['Hélicoptères',null]]},
{title:'Secours et interventions',links:[['Pompiers',null],['Véhicules de secours',null],['Hélicoptères de secours',null]]},
{title:'Automobile',links:[['Voitures de sport',null],['Voitures de légende',null]]},
{title:'Trains',links:[['Trains à grande vitesse',null],['Locomotives',null]]},
['Éditions limitées','editions-limitees.html'],
['Boutique générale','boutique.html'],
['Mon panier','panier.html'],
['FBA Club (projet)','fba-club.html']]},
{title:'FBA Games',links:[['Studio FBA Games (en préparation)',null],['Business Empire Simulator (en préparation)',null]]},
{title:'Nos univers',links:[['Métiers','metiers.html'],['Studio','fba-studio.html'],['Secours','fba-secours.html'],['Forces de l’ordre','fba-force-ordre.html'],['BTP','fba-btp.html'],['Défense','fba-defense.html'],['Métiers insolites','metiers-insolites.html'],['Reportage','fba-reportage.html'],['Productions','fba-productions.html']]}
];
const header=document.querySelector('header');if(!header)return;
const button=document.createElement('button');button.type='button';button.className='fba-nav-button';button.setAttribute('aria-label','Ouvrir le menu');button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','fbaNavDrawer');button.innerHTML='<i></i><i></i><i></i>';
const anchor=header.querySelector('.top')||header;anchor.append(button);
const overlay=document.createElement('div');overlay.className='fba-nav-overlay';overlay.hidden=true;
const drawer=document.createElement('aside');drawer.id='fbaNavDrawer';drawer.className='fba-nav-drawer';drawer.setAttribute('aria-label','Navigation FBA');drawer.hidden=true;drawer.inert=true;
const top=document.createElement('div');top.className='fba-nav-top';
const title=document.createElement('p');title.className='fba-nav-title';title.textContent='Explorer FBA';top.append(title);
const close=document.createElement('button');close.type='button';close.className='fba-nav-close';close.setAttribute('aria-label','Fermer le menu');close.textContent='×';top.append(close);drawer.append(top);
const label=document.createElement('label');label.htmlFor='fbaNavSearch';label.textContent='Rechercher une rubrique';drawer.append(label);
const search=document.createElement('input');search.id='fbaNavSearch';search.type='search';search.placeholder='Collections, pilotes, jeux…';drawer.append(search);
const root=document.createElement('div');drawer.append(root);
function addLink(parent,text,url){if(!url){const p=document.createElement('p');p.className='fba-nav-pending';p.textContent=text;parent.append(p);return;}const a=document.createElement('a');a.href=url;a.textContent=text;parent.append(a);}
addLink(root,'Accueil','index.html');
function addGroup(parent,group,nested=false){const details=document.createElement('details');if(nested)details.className='fba-nav-subgroup';const summary=document.createElement('summary');summary.textContent=group.title;details.append(summary);for(const entry of group.links){if(Array.isArray(entry))addLink(details,entry[0],entry[1]);else addGroup(details,entry,true);}parent.append(details);}
for(const section of sections)addGroup(root,section);
addLink(root,'À propos','index.html#apropos');addLink(root,'Contact','index.html#contact');
const empty=document.createElement('p');empty.className='fba-nav-empty';empty.textContent='Aucune rubrique trouvée.';empty.hidden=true;drawer.append(empty);
document.body.append(overlay,drawer);
let returnFocus=null;
function openMenu(open){if(open)returnFocus=document.activeElement;drawer.hidden=!open;drawer.inert=!open;overlay.hidden=!open;button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');document.body.classList.toggle('fba-nav-open',open);if(open)close.focus();else if(returnFocus&&returnFocus.isConnected)returnFocus.focus();}
button.addEventListener('click',()=>openMenu(drawer.hidden));overlay.addEventListener('click',()=>openMenu(false));close.addEventListener('click',()=>openMenu(false));
drawer.addEventListener('click',e=>{if(e.target.closest('a'))openMenu(false);});
document.addEventListener('keydown',e=>{if(drawer.hidden)return;if(e.key==='Escape'){openMenu(false);return;}if(e.key!=='Tab')return;const visible=[...drawer.querySelectorAll('button,input,summary,a[href]')].filter(el=>el.getClientRects().length);const i=visible.indexOf(document.activeElement);if(e.shiftKey&&i===0){e.preventDefault();visible[visible.length-1].focus();}else if(!e.shiftKey&&i===visible.length-1){e.preventDefault();visible[0].focus();}});
const normalize=s=>s.toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
search.addEventListener('input',()=>{const q=normalize(search.value.trim());let count=0;for(const el of root.children){if(el.tagName==='DETAILS'){const links=[...el.querySelectorAll('a,.fba-nav-pending')];const match=normalize(el.querySelector('summary').textContent).includes(q);links.forEach(a=>a.hidden=!!q&&!match&&!normalize(a.textContent).includes(q));for(const sub of el.querySelectorAll('details.fba-nav-subgroup')){const subMatch=normalize(sub.querySelector('summary').textContent).includes(q);if(q&&subMatch)sub.querySelectorAll('a,.fba-nav-pending').forEach(a=>a.hidden=false);sub.hidden=!!q&&!match&&!subMatch&&![...sub.querySelectorAll('a,.fba-nav-pending')].some(a=>!a.hidden);if(q&&!sub.hidden)sub.open=true;}el.hidden=!!q&&!match&&!links.some(a=>!a.hidden)&&![...el.querySelectorAll('details.fba-nav-subgroup')].some(sub=>!sub.hidden);if(q&&!el.hidden)el.open=true;}else el.hidden=!!q&&!normalize(el.textContent).includes(q);if(!el.hidden)count++;}empty.hidden=count!==0;});
})();