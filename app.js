const WA = "5581993225955";
const waUrl = t => "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
document.querySelectorAll(".wa-link").forEach(a => a.href = waUrl("Olá, DGTech! Vim pelo site e gostaria de um orçamento."));
document.querySelectorAll(".wa-bio").forEach(a => a.href = waUrl("Olá, DGTech! Gostaria de receber o resumo profissional do Dalgon."));
document.querySelectorAll(".wa-agenda").forEach(a => a.href = waUrl("Olá, DGTech! Gostaria de agendar um atendimento presencial."));

// Anos de experiência (desde 01/10/2014)
const start = new Date(2014, 9, 1), now = new Date();
let yrs = now.getFullYear() - start.getFullYear();
if (now < new Date(now.getFullYear(), 9, 1)) yrs--;
document.querySelectorAll(".years").forEach(e => e.textContent = yrs);
document.getElementById("y").textContent = now.getFullYear();

// Header e menu
const header = document.getElementById("top");
addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 20), {passive:true});
const nav = document.getElementById("nav"), mb = document.getElementById("menuBtn");
mb.onclick = () => { const o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o); };
nav.querySelectorAll("ul a").forEach(a => a.onclick = () => nav.classList.remove("open"));

// Filtros de serviços
document.querySelectorAll(".filters button").forEach(b => b.onclick = () => {
  document.querySelectorAll(".filters button").forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  const f = b.dataset.f;
  document.querySelectorAll(".svc").forEach(s => s.classList.toggle("hide", f !== "all" && !s.dataset.c.split(" ").includes(f)));
});

// Formulário → WhatsApp
document.getElementById("form").onsubmit = e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const t = `Olá, DGTech! Gostaria de um orçamento.\n\n*Nome:* ${d.get("nome")}` +
    (d.get("empresa") ? `\n*Empresa:* ${d.get("empresa")}` : "") +
    `\n*Atendimento:* ${d.get("tipo")}\n*Serviço:* ${d.get("servico")}\n*Mensagem:* ${d.get("msg")}`;
  window.open(waUrl(t), "_blank", "noopener");
};

// Animação ao rolar
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
