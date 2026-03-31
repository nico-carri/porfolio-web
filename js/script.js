// ── CONTACT (obfuscated) ──
(function(){
  const getEmail = () => [
    99,97,114,114,105,122,111,110,105,99,111,108,97,115,100,56,64,103,109,97,105,108,46,99,111,109
  ].map(c=>String.fromCharCode(c)).join('');

  const wp=[53,52,49,49,54,55,52,56,49,56,55,48];

  const em = getEmail();
  const wn = wp.map(c=>String.fromCharCode(c)).join('');

  // email dinámico con subject + body
  const subject = encodeURIComponent("Contacto desde tu portfolio");
  const body = encodeURIComponent("Hola Nicolás, vi tu portfolio y me gustaría hablar con vos.");

  document.getElementById('email-link').href =
    `mailto:${em}?subject=${subject}&body=${body}`;

  // whatsApp
  const wa = document.getElementById('wa-link');
  if(wa){
    wa.href = 'https://wa.me/' + wn;
  }
})();

// ── THEME ──
function toggleTheme(){
  const h=document.documentElement;
  const dark=h.dataset.theme==='dark';
  h.dataset.theme=dark?'light':'dark';
  const lbl=document.getElementById('theme-label');
  lbl.textContent=dark?(lang==='es'?'Modo noche':'Night mode'):(lang==='es'?'Modo día':'Day mode');
  const ic=document.getElementById('theme-icon');
  ic.innerHTML=dark?'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>':'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
}

// ── LANGUAGE ──
let lang='es';
function toggleLang(){
  lang=lang==='es'?'en':'es';
  document.getElementById('lang-btn').childNodes[2].textContent=' '+(lang==='es'?'EN':'ES');
  document.documentElement.lang=lang==='es'?'es':'en';
  // Update all data-es / data-en elements
  document.querySelectorAll('[data-es]').forEach(el=>{
    const val=el.getAttribute('data-'+lang);
    if(!val) return;
    if(el.tagName==='INPUT'||el.tagName==='TEXTAREA') return;
    el.innerHTML=val;
  });
  // Placeholders
  document.querySelectorAll('[data-placeholder-'+lang+']').forEach(el=>{
    el.placeholder=el.getAttribute('data-placeholder-'+lang);
  });
  // Theme label
  const dark=document.documentElement.dataset.theme==='dark';
  document.getElementById('theme-label').textContent=dark?(lang==='es'?'Modo noche':'Night mode'):(lang==='es'?'Modo día':'Day mode');
}

// ── CAROUSELS ──
const CS={};
function getCS(id){if(!CS[id])CS[id]={idx:0};return CS[id];}
function slide(id,dir){
  const n=id.slice(-1);
  const imgs=document.querySelectorAll('#ct'+n+' img');
  const s=getCS(id);
  s.idx=(s.idx+dir+imgs.length)%imgs.length;
  updateC(id,s.idx);
}
function goTo(id,i){getCS(id).idx=i;updateC(id,i);}
function updateC(id,idx){
  const n=id.slice(-1);
  document.getElementById('ct'+n).style.transform='translateX(-'+(idx*100)+'%)';
  document.querySelectorAll('#cd'+n+' .cdot').forEach((d,i)=>d.classList.toggle('active',i===idx));
}

// ── LIGHTBOX ──
let lbCurrent=null,lbIdx=0,lbImgs=[];
function openLb(carouselId,imgIdx){
  const n=carouselId.slice(-1);
  lbImgs=Array.from(document.querySelectorAll('#ct'+n+' img')).map(i=>i.src);
  lbCurrent=carouselId;
  lbIdx=imgIdx;
  showLbImg();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow='hidden';
}
function showLbImg(){
  document.getElementById('lb-img').src=lbImgs[lbIdx];
  document.getElementById('lb-counter').textContent=(lbIdx+1)+' / '+lbImgs.length;
}
function lbSlide(dir){
  lbIdx=(lbIdx+dir+lbImgs.length)%lbImgs.length;
  showLbImg();
}
function closeLb(){
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow='';
}
function lbBgClick(e){if(e.target===document.getElementById('lightbox'))closeLb();}
document.addEventListener('keydown',e=>{
  if(!document.getElementById('lightbox').classList.contains('open'))return;
  if(e.key==='Escape')closeLb();
  if(e.key==='ArrowLeft')lbSlide(-1);
  if(e.key==='ArrowRight')lbSlide(1);
});

// ── FORM ──
function sendMsg(){
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const subject = document.getElementById('f-subject').value.trim();
  const msg = document.getElementById('f-msg').value.trim();
  const status = document.getElementById('form-status');

  if(!name || !email || !msg){
    status.textContent = 'Completá los campos obligatorios';
    status.className = 'form-status err';
    return;
  }

  if(!/^[^@]+@[^@]+\.[^@]+$/.test(email)){
    status.textContent = 'Email inválido';
    status.className = 'form-status err';
    return;
  }

  emailjs.send("service_4y6ccxg", "template_3g5xt4f", {
    name: name,
    email: email,
    subject: subject,
    message: msg
  })
  .then(function(){
    status.textContent = '✓ Mensaje enviado correctamente';
    status.className = 'form-status ok';

    document.getElementById('f-name').value = '';
    document.getElementById('f-email').value = '';
    document.getElementById('f-subject').value = '';
    document.getElementById('f-msg').value = '';
  })
.catch(function(error){
  console.error("EMAILJS ERROR:", error);
  status.textContent = 'Error al enviar. Revisá la consola (F12)';
  status.className = 'form-status err';
});
}

// ── DOWNLOAD ──
function downloadCV(){
  const cv=`NICOLÁS DARÍO CARRIZO — DATA ANALYST
CABA, Argentina
LinkedIn: www.linkedin.com/in/nicolascarrizo938/
GitHub: https://github.com/nico-carri

PROFILE
Data Science & AI student focused on data analysis and BI.
Experienced with SQL, Python and Tableau. Projects include dashboards,
predictive models and cloud-integrated solutions.
Target roles: Data Analyst · BI Analyst · Salesforce Trainee

SKILLS
Data & BI:     SQL | Python (Pandas, Scikit-learn)
Visualization: Tableau | Looker Studio | Plotly
Development:   Java (Spring Boot) | HTML | CSS | JavaScript
Cloud/Tools:   Git | Docker | Oracle Cloud (OCI)
Salesforce:    Service Cloud | Reports | Dashboards | Case Mgmt | API

PROJECTS
Customer Churn Analysis (Telecom)
  GitHub: https://github.com/nico-carri/telecom-churn-analysis
  Demo:   https://telecom-churn-analysis-pndc.streamlit.app/
  • Predictive model AUC 0.84 — Python, SQL, Scikit-learn
  • Interactive simulator with Streamlit + Plotly

Salesforce Service Cloud Simulation
  • Multi-account support environment, dashboards, operational reports
  • Record-Triggered Flow automations for customer health scoring

E-commerce Web App — Yugen Store
  GitHub:  https://github.com/nico-carri/yugen-store
  Live:    https://yugen-ecommerce.kozow.com/
  Tableau: https://public.tableau.com/app/profile/nicolas.carrizo/viz/E-commerceDashboarddeVentas/DashboarddeVentas
  • Spring Boot + Oracle Cloud · ETL pipeline to Tableau

EDUCATION
IFTS N°11      Data Science & AI Technical Degree          08.2024 – Present
CPF8 SMATA     Web Specialization · Programming Track       08.2024 – 12.2025
Alura Latam    Oracle ONE Tech Foundation G8 – Data Sci     01.2025 – 08.2025
Talento Tech   Salesforce · Big Data / Data Analytics       03.2024 – 12.2025

LANGUAGES
Spanish: Native | English: B2 | Japanese: Advanced
`;
  const blob=new Blob([cv],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download='Nicolas_Carrizo_CV.txt';a.click();
  URL.revokeObjectURL(url);
}