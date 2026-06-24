import { useEffect, useRef, useState } from "react";
import "./App.css";

import img1  from "./assets/1.png";
import img2  from "./assets/2.png";
import img3  from "./assets/3.png";
import img4  from "./assets/11.png";
import img5  from "./assets/5.jpeg";
import img6  from "./assets/6.jpeg";
import img7  from "./assets/7.jpeg";
import img8  from "./assets/8.jpeg";
import img9  from "./assets/9.jpeg";
import img10 from "./assets/my-photo.jpeg";
import st1 from "./assets/spendtrack1.jpeg";
import st2 from "./assets/spendtrack2.jpeg";
import st3 from "./assets/spendtrack3.jpeg";

const stylepickzImages  = [img1, img2, img3, img4];
const parkingImages     = [img5, img6, img7, img8, img9];
const spendtrackImages  = [st1, st2, st3];

const skills = [
  { cat:"Languages",  color:"cyan",   items:["Java","Dart","JavaScript","HTML","CSS"] },
  { cat:"Frameworks", color:"purple", items:["Spring Boot","Flutter","Selenium"] },
  { cat:"Database",   color:"green",  items:["MySQL"] },
  { cat:"DevOps",     color:"orange", items:["Docker","AWS EC2","Git","GitHub"] },
  { cat:"AI / ML",    color:"pink",   items:["TensorFlow Lite","NLP"] },
];

const certs = [
  { name:"Programming in Java", issuer:"NPTEL",     icon:"☕" },
  { name:"Selenium with Java",  issuer:"Udemy",     icon:"🧪" },
  { name:"Claude Code Action",  issuer:"Anthropic", icon:"🤖" },
];

const marqueeItems = [
  "Java","Spring Boot","Flutter","MySQL","Docker",
  "AWS EC2","TensorFlow Lite","NLP","Selenium","Git",
  "REST APIs","GitHub","VS Code","Eclipse",
];

const navLinks = ["home","about","experience","projects","skills","contact"];

const roles = [
  "Full Stack Developer",
  "Learning Spring Boot",
  "AI-Assisted App Builder",
  "Exploring AI/ML",
  "CS Engineer",
];


const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

function Reveal({ children, className="", delay=0, tag="div" }) {
  const Tag = tag;
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("revealed"), delay); ob.disconnect(); }
    }, { threshold: 0.08 });
    ob.observe(el);
    return () => ob.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`}>{children}</Tag>;
}

function TiltCard({ children, className="" }) {
  const ref = useRef(null);
  const raf = useRef(null);
  const onMove = e => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const c = ref.current; if (!c) return;
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      c.style.transform = `perspective(900px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-5px)`;
    });
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return <div ref={ref} className={`tilt ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>;
}

function MagBtn({ children, className="", ...props }) {
  const ref = useRef(null);
  const onMove = e => {
    const b = ref.current; if (!b) return;
    const r = b.getBoundingClientRect();
    b.style.transform = `translate(${(e.clientX-r.left-r.width/2)*0.22}px,${(e.clientY-r.top-r.height/2)*0.22}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return <a ref={ref} className={className} {...props} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</a>;
}

export default function App() {
  const [spIdx,    setSpIdx]    = useState(0);
  const [pkIdx,    setPkIdx]    = useState(0);
  const [stIdx,    setStIdx]    = useState(0);
  const [menu,     setMenu]     = useState(false);
  const [active,   setActive]   = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const [roleIdx,   setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [scrambled, setScrambled] = useState("Vishwa M");

  const canvasRef     = useRef(null);
  const statsRef      = useRef(null);
  const statsAnimated = useRef(false);
  const rafCanvas     = useRef(null);
  const rafScroll     = useRef(null);

  useEffect(() => {
    const si = setInterval(() => setSpIdx(p => (p+1)%stylepickzImages.length),  3200);
    const pi = setInterval(() => setPkIdx(p => (p+1)%parkingImages.length),     3200);
    const ti = setInterval(() => setStIdx(p => (p+1)%spendtrackImages.length),  3200);
    return () => { clearInterval(si); clearInterval(pi); clearInterval(ti); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    let mx=-999, my=-999;
    const onMouse = e => { mx=e.clientX; my=e.clientY; };
    window.addEventListener("mousemove", onMouse);
    const pts = Array.from({length:70}, () => ({
      x:Math.random()*innerWidth, y:Math.random()*innerHeight,
      vx:(Math.random()-.5)*.35,  vy:(Math.random()-.5)*.35,
      r:Math.random()*1.4+.5,
    }));
    const frame = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0) p.x=canvas.width; if(p.x>canvas.width)  p.x=0;
        if(p.y<0) p.y=canvas.height; if(p.y>canvas.height) p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle="rgba(56,189,248,.45)"; ctx.fill();
      });
      for(let i=0;i<pts.length;i++){
        for(let j=i+1;j<pts.length;j++){
          const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
          if(d<130){
            ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
            ctx.strokeStyle=`rgba(56,189,248,${(1-d/130)*.14})`; ctx.lineWidth=.6; ctx.stroke();
          }
        }
        const dx=pts[i].x-mx, dy=pts[i].y-my, d=Math.sqrt(dx*dx+dy*dy);
        if(d<170){
          ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(mx,my);
          ctx.strokeStyle=`rgba(129,140,248,${(1-d/170)*.3})`; ctx.lineWidth=.8; ctx.stroke();
        }
      }
      rafCanvas.current = requestAnimationFrame(frame);
    };
    frame();
    return () => { cancelAnimationFrame(rafCanvas.current); window.removeEventListener("resize",resize); window.removeEventListener("mousemove",onMouse); };
  }, []);


  // Click-and-drag + wheel horizontal scroll for the tech marquee strip.
  useEffect(() => {
    const el = document.getElementById("mq")?.parentElement;
    if(!el) return;
    let down=false, startX=0, startScroll=0;
    const onDown =e=>{ down=true; startX=e.pageX; startScroll=el.scrollLeft; el.classList.add("dragging"); };
    const onMove =e=>{ if(!down) return; e.preventDefault(); el.scrollLeft=startScroll-(e.pageX-startX); };
    const onUp   =()=>{ down=false; el.classList.remove("dragging"); };
    const onWheel=e=>{ if(e.deltaY===0) return; el.scrollLeft+=e.deltaY; e.preventDefault(); };
    el.addEventListener("mousedown",onDown);
    window.addEventListener("mousemove",onMove);
    window.addEventListener("mouseup",onUp);
    el.addEventListener("wheel",onWheel,{passive:false});
    return ()=>{ el.removeEventListener("mousedown",onDown); window.removeEventListener("mousemove",onMove); window.removeEventListener("mouseup",onUp); el.removeEventListener("wheel",onWheel); };
  }, []);

  useEffect(() => {
    const apply = () => {
      const sy    = window.scrollY;
      const total = document.documentElement.scrollHeight - innerHeight;
      const bar = document.getElementById("spbar");
      if(bar) bar.style.width = `${(sy/total)*100}%`;
      // Only update state when the boolean flips — calling setScrolled every
      // frame re-renders the whole App on each scroll tick, causing flicker.
      setScrolled(prev => { const next = sy > 20; return prev === next ? prev : next; });

      if(sy < innerHeight*1.6){
        [
          ["#ring-wrap",  0.38],["#hero-hi",   0.18],["#hero-name", 0.26],
          ["#hero-sub",   0.20],["#hero-tag",  0.15],["#hero-stats",0.11],
          ["#hero-ctas",  0.09],["#scroll-arr",0.07],
        ].forEach(([sel,rate])=>{
          const el=document.querySelector(sel);
          if(el) el.style.transform=`translateY(${sy*rate}px)`;
        });
      }

      const dr1=document.getElementById("dr1"), dr2=document.getElementById("dr2"), dr3=document.getElementById("dr3");
      if(dr1) dr1.style.transform=`translate(-50%,-50%) rotate(${sy*.04}deg)`;
      if(dr2) dr2.style.transform=`translate(-50%,-50%) rotate(${-sy*.07}deg)`;
      if(dr3) dr3.style.transform=`translate(-50%,-50%) rotate(${sy*.02}deg) scale(${1+sy*.0002})`;

      const o1=document.querySelector(".o1"), o2=document.querySelector(".o2"), o3=document.querySelector(".o3");
      if(o1) o1.style.transform=`translateY(${sy*.12}px)`;
      if(o2) o2.style.transform=`translateY(${-sy*.09}px)`;
      if(o3) o3.style.transform=`translateY(${sy*.16}px)`;


      // Image parallax zoom — desktop only. On mobile the scale(1.14) overflow
      // combined with the 3D card transforms makes images bleed out and overlap.
      const enableImgParallax = innerWidth > 768;
      document.querySelectorAll(".slideshow").forEach(ss=>{
        const img=ss.querySelector("img");
        if(!img) return;
        if(!enableImgParallax){ img.style.transform=""; return; }
        const rect=ss.getBoundingClientRect();
        if(rect.top<innerHeight&&rect.bottom>0){
          const prog=(innerHeight-rect.top)/(innerHeight+rect.height);
          img.style.transform=`translateY(${(prog-.5)*50}px) scale(1.14)`;
        }
      });

      document.querySelectorAll("section[data-n]").forEach(sec=>{
        const rect=sec.getBoundingClientRect();
        const prog=Math.max(0,Math.min(1,(innerHeight-rect.top)/innerHeight));
        sec.style.setProperty("--gny",`${(prog-.5)*-60}px`);
      });

      document.querySelectorAll("section[id]").forEach(sec=>{
        const r=sec.getBoundingClientRect();
        if(r.top<=innerHeight*.45&&r.bottom>=innerHeight*.45){
          setActive(prev => prev === sec.id ? prev : sec.id);
        }
      });

      rafScroll.current=null;
    };
    const onScroll=()=>{ if(!rafScroll.current) rafScroll.current=requestAnimationFrame(apply); };
    window.addEventListener("scroll",onScroll,{passive:true});
    apply();
    return ()=>{ window.removeEventListener("scroll",onScroll); if(rafScroll.current) cancelAnimationFrame(rafScroll.current); };
  }, []);

  useEffect(() => {
    const secs=document.querySelectorAll("section[id]");
    // Reveal once and stop observing — toggling show on/off at a section
    // boundary made the entry transition loop while parked there.
    const ob=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add("show"); ob.unobserve(e.target); }
    }),{threshold:0.07});
    secs.forEach(s=>ob.observe(s));
    return ()=>ob.disconnect();
  }, []);

  useEffect(()=>{ const c=()=>setMenu(false); window.addEventListener("scroll",c); return ()=>window.removeEventListener("scroll",c); },[]);

  /* Typewriter role cycle */
  useEffect(()=>{
    const target = roles[roleIdx];
    let i = 0; let deleting = false; let timer;
    const tick = () => {
      if (!deleting) {
        setDisplayed(target.slice(0, i+1));
        i++;
        if (i === target.length) { timer = setTimeout(()=>{ deleting=true; tick(); }, 1800); return; }
      } else {
        setDisplayed(target.slice(0, i));
        i--;
        if (i < 0) { deleting=false; setRoleIdx(r=>(r+1)%roles.length); return; }
      }
      timer = setTimeout(tick, deleting ? 45 : 80);
    };
    timer = setTimeout(tick, 400);
    return ()=>clearTimeout(timer);
  }, [roleIdx]);

  /* Name scramble on mount */
  useEffect(()=>{
    const final = "Vishwa M";
    let iter = 0;
    const iv = setInterval(()=>{
      setScrambled(final.split("").map((ch, i)=>{
        if (ch === " ") return " ";
        if (i < iter) return ch;
        return SCRAMBLE_CHARS[Math.floor(Math.random()*SCRAMBLE_CHARS.length)];
      }).join(""));
      iter += 0.4;
      if (iter >= final.length) { setScrambled(final); clearInterval(iv); }
    }, 40);
    return ()=>clearInterval(iv);
  }, []);

  useEffect(()=>{
    const el=statsRef.current; if(!el) return;
    const ob=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!statsAnimated.current){
        statsAnimated.current=true;
        el.querySelectorAll("[data-t]").forEach(span=>{
          const target=parseFloat(span.dataset.t), dec=span.dataset.t.includes(".")?1:0;
          let cur=0; const step=target/60;
          const tick=()=>{ cur=Math.min(cur+step,target); span.textContent=dec?cur.toFixed(1):Math.floor(cur); if(cur<target)requestAnimationFrame(tick); };
          tick();
        });
        ob.disconnect();
      }
    },{threshold:.5});
    ob.observe(el);
    return ()=>ob.disconnect();
  },[]);

  return (
    <div className="app">
      <div className="sp-track"><div id="spbar" className="sp-bar"/></div>
      <div className="grain"/>
      <canvas ref={canvasRef} className="bg-canvas"/>
      <div className="orb o1"/><div className="orb o2"/><div className="orb o3"/>

      <nav className={scrolled?"nav-scroll":""}>
        <a href="#home" className="brand"><span>V</span>M</a>
        <div className={`nav-links${menu?" open":""}`}>
          {navLinks.map(id=>(
            <a key={id} href={`#${id}`} className={active===id?"act":""} onClick={()=>setMenu(false)}>
              {id[0].toUpperCase()+id.slice(1)}
            </a>
          ))}
        </div>
        <button className={`burger${menu?" x":""}`} onClick={()=>setMenu(o=>!o)} aria-label="menu">
          <span/><span/><span/>
        </button>
      </nav>

      <section id="home" className="hero">
        <div id="dr1" className="deco-ring dr1"/>
        <div id="dr2" className="deco-ring dr2"/>
        <div id="dr3" className="deco-ring dr3"/>
        {[{x:"12%",y:"22%",s:6,o:.4},{x:"85%",y:"16%",s:4,o:.3},{x:"88%",y:"68%",s:8,o:.25},
          {x:"9%",y:"72%",s:5,o:.35},{x:"52%",y:"90%",s:4,o:.2},{x:"72%",y:"32%",s:3,o:.4}
        ].map((d,i)=>(
          <div key={i} className="fd" style={{left:d.x,top:d.y,width:d.s,height:d.s,opacity:d.o}}/>
        ))}

        <div id="ring-wrap" className="ring-wrap">
          <div className="ring-spin"/>
          <img src={img10} alt="Vishwa M" className="avatar"/>
        </div>

        {["Java","Spring Boot","Flutter","MySQL","Docker","Selenium"].map((s,i)=>{
          const angle = 30 + (i/6)*360;
          return (
            <div key={s} className="orbit-badge-wrap"
              style={{transform:`translate(-50%,-50%) rotate(${angle}deg) translateY(-335px)`}}>
              <span className="orbit-badge"
                style={{transform:`rotate(${-angle}deg)`,animationDelay:`${i*0.375}s`}}>{s}</span>
            </div>
          );
        })}

        <p  id="hero-hi"    className="hero-hi   anim-up" style={{animationDelay:".10s"}}>Hello, I am</p>
        <h1 id="hero-name"  className="hero-name anim-up" style={{animationDelay:".25s"}}>{scrambled}</h1>
        <div className="name-line anim-up" style={{animationDelay:".32s"}} />
        <h2 id="hero-sub"   className="hero-sub  anim-up" style={{animationDelay:".40s"}}>
          <span className="typewriter">{displayed}</span>
        </h2>
        <p  id="hero-tag"   className="hero-tag  anim-up" style={{animationDelay:".55s"}}>
          Building scalable applications and AI-powered solutions.<br/>
          Passionate about clean code and high-quality engineering.
        </p>
        <div id="hero-stats" className="stats anim-up" style={{animationDelay:".70s"}} ref={statsRef}>
          <div className="stat"><span className="sv" data-t="8.4">0</span><span className="sl">CGPA</span></div>
          <div className="sep"/>
          <div className="stat"><span className="sv" data-t="2">0</span><span className="sl">Internships</span></div>
          <div className="sep"/>
          <div className="stat"><span className="sv" data-t="3">0</span><span className="sl">Projects</span></div>
        </div>
        <div id="hero-ctas" className="ctas anim-up" style={{animationDelay:".85s"}}>
          <MagBtn href={`${import.meta.env.BASE_URL}VISHWA_M-2026.pdf`} download className="btn-p">Download Resume</MagBtn>
          <MagBtn href="#projects" className="btn-o">View Projects</MagBtn>
        </div>
        <a id="scroll-arr" href="#about" className="scroll-arr" aria-label="scroll">
          <span/><span/><span/>
        </a>
      </section>

      <div className="mq-outer">
        <div id="mq" className="mq-inner">
          {marqueeItems.map((t,i)=>(
            <span key={i} className="mq-item"><span className="mq-dot">◆</span>{t}</span>
          ))}
        </div>
      </div>

      <section id="about" data-n="01">
        <Reveal className="slbl">Who I Am</Reveal>
        <Reveal className="stitle" delay={80}>About Me</Reveal>
        <div className="about-grid">
          <div className="about-copy">
            {[
              <>I'm <strong>Vishwa M</strong>, a final-year CS student who loves building things that actually work — not just on localhost. I enjoy owning the full picture, from designing APIs to shipping a mobile app to figuring out why it breaks in production.</>,
              <>Currently interning at <strong>NUVAI AI Solutions</strong> where I work on LLM-driven development using Claude Code. Previously at <strong>INCRIX Techlutions</strong>, I built and deployed full-stack apps with Spring Boot, MySQL, and Docker. My projects include a <strong>parking system running on AWS EC2</strong> and an <strong>AI expense tracker</strong> with on-device ML inference.</>,
              <>I'm drawn to problems that don't have obvious solutions — whether that's wiring up an NLP pipeline, optimising a backend, or making an app feel fast on low-end devices.</>,
            ].map((t,i)=><Reveal key={i} tag="p" delay={i*100}>{t}</Reveal>)}
          </div>
          <div className="fact-col">
            {[
              {icon:"🎓",t:"B.E. Computer Science",  s:"GCE Erode · CGPA 8.4"},
              {icon:"🏫",t:"HSC — 93%",              s:"Mount Park HSS, Kallakurichi"},
              {icon:"📍",t:"Kallakurichi, TN",        s:"India"},
              {icon:"💼",t:"Open to Opportunities",   s:"Full-time · Internship"},
            ].map((f,i)=>(
              <Reveal key={f.t} className="fact" delay={i*80}>
                <span className="fi">{f.icon}</span>
                <div><p className="ft">{f.t}</p><p className="fs">{f.s}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" data-n="02">
        <Reveal className="slbl">Career</Reveal>
        <Reveal className="stitle" delay={80}>Experience</Reveal>
        <div className="timeline">
          {[
            {role:"Software Engineer Intern",      company:"NUVAI AI SOLUTIONS PVT LTD",date:"Dec 2025 – Present",
             desc:"Contributing to product development with prompt engineering using Claude Code — functional thinking, structured prompt design, and LLM-driven code generation.",
             tags:["Claude Code","Prompt Engineering","LLM"]},
            {role:"Full Stack Development Intern", company:"INCRIX TECHLUTIONS",         date:"Jun – Jul 2025",
             desc:"Built and deployed scalable full-stack applications using Spring Boot, MySQL, and Docker containerization.",
             tags:["Spring Boot","MySQL","Docker"]},
          ].map((e,i)=>(
            <Reveal key={e.role} className="tl-item" delay={i*120}>
              <div className="tl-line"><div className="tl-dot"/></div>
              <TiltCard className="tl-body">
                <div className="tl-top">
                  <div><h3 className="tl-role">{e.role}</h3><p className="tl-co">{e.company}</p></div>
                  <span className="tl-date">{e.date}</span>
                </div>
                <p className="tl-desc">{e.desc}</p>
                <div className="tl-tags">{e.tags.map(t=><span key={t}>{t}</span>)}</div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="projects" data-n="03">
        <Reveal className="slbl">Work</Reveal>
        <Reveal className="stitle" delay={80}>Projects</Reveal>
        <div className="proj-grid">
          <Reveal delay={0}>
            <TiltCard className="proj-card">
              <div className="proj-head"><span className="proj-ico">💰</span><h3>SpendTrack</h3></div>
              <div className="ptags">{["Flutter","TensorFlow Lite","NLP","Speech-to-Text"].map(t=><span key={t}>{t}</span>)}</div>
              <p>AI-powered expense tracker with <strong>offline ML inference</strong> via TensorFlow Lite. Speech-to-Text, NLP extraction, and automated bank SMS parsing.</p>
              <div className="slideshow">
                <img src={spendtrackImages[stIdx]} alt={`SpendTrack ${stIdx+1}`} />
                <div className="dots">
                  {spendtrackImages.map((_,i) => <span key={i} className={i===stIdx?"d on":"d"} />)}
                </div>
              </div>
            </TiltCard>
          </Reveal>
          <Reveal delay={100}>
            <TiltCard className="proj-card">
              <div className="proj-head"><span className="proj-ico">🅿️</span><h3>Parking Slot Management</h3></div>
              <div className="ptags">{["Spring Boot","MySQL","Railway","REST API"].map(t=><span key={t}>{t}</span>)}</div>
              <p>Spring Boot app with <strong>RESTful APIs</strong>, Spring Security role-based access, MySQL. Deployed on <strong>Railway</strong>.</p>
              <a href="https://parkingmanagement-production.up.railway.app/signup"
                 target="_blank" rel="noopener noreferrer" className="proj-link">Visit Live →</a>
              <div className="slideshow">
                <img src={parkingImages[pkIdx]} alt={`Parking ${pkIdx+1}`}/>
                <div className="dots">{parkingImages.map((_,i)=><span key={i} className={i===pkIdx?"d on":"d"}/>)}</div>
              </div>
            </TiltCard>
          </Reveal>
          <Reveal delay={200}>
            <TiltCard className="proj-card">
              <div className="proj-head"><span className="proj-ico">🛍️</span><h3>STYLEPICKZ</h3></div>
              <div className="ptags">{["HTML/CSS","JavaScript","Zoho Catalyst"].map(t=><span key={t}>{t}</span>)}</div>
              <p>Responsive e-commerce platform with product listings, shopping cart, and search. Deployed on <strong>Zoho Catalyst</strong>.</p>
              <a href="https://stylepicfinal-60038721483.development.catalystserverless.in"
                 target="_blank" rel="noopener noreferrer" className="proj-link">Visit Live →</a>
              <div className="slideshow">
                <img src={stylepickzImages[spIdx]} alt={`Stylepickz ${spIdx+1}`}/>
                <div className="dots">{stylepickzImages.map((_,i)=><span key={i} className={i===spIdx?"d on":"d"}/>)}</div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      <section id="skills" data-n="04">
        <Reveal className="slbl">Stack</Reveal>
        <Reveal className="stitle" delay={80}>Skills &amp; Certifications</Reveal>
        <div className="skills-grid">
          {skills.map((g,i)=>(
            <Reveal key={g.cat} className={`skill-card sc-${g.color}`} delay={i*70}>
              <h3 className="sc-cat">{g.cat}</h3>
              <div className="sc-pills">{g.items.map(it=><span key={it}>{it}</span>)}</div>
            </Reveal>
          ))}
        </div>
        <Reveal className="certs-head" delay={100}>Certifications</Reveal>
        <div className="certs-row">
          {certs.map((c,i)=>(
            <Reveal key={c.name} className="cert" delay={i*80}>
              <span className="cert-ico">{c.icon}</span>
              <div><p className="cert-n">{c.name}</p><p className="cert-s">{c.issuer}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" data-n="05">
        <Reveal className="slbl">Get in Touch</Reveal>
        <Reveal className="stitle" delay={80}>Lets Connect</Reveal>
        <Reveal tag="p" className="contact-sub" delay={140}>Open to internships, full-time roles, and collaboration.</Reveal>
        <div className="contact-grid">
          {[
            {href:"https://www.linkedin.com/in/vishwa-m-b93719324/",cls:"ln",icon:"https://cdn-icons-png.flaticon.com/64/174/174857.png",  label:"LinkedIn"},
            {href:"https://github.com/ViShWa-MV",                   cls:"gh",icon:"https://cdn-icons-png.flaticon.com/64/25/25231.png",   label:"GitHub"},
            {href:"https://leetcode.com/u/ukgbGC16O5/",              cls:"lc",icon:"https://cdn-icons-png.flaticon.com/64/9888/9888260.png",label:"LeetCode"},
            {href:"mailto:mvishwa270@gmail.com",                    cls:"em",icon:"https://cdn-icons-png.flaticon.com/64/732/732200.png",  label:"Email Me"},
            {href:"https://www.instagram.com/vishx__a/",            cls:"ig",icon:"https://cdn-icons-png.flaticon.com/64/2111/2111463.png",label:"Instagram"},
          ].map((c,i)=>(
            <Reveal key={c.label} delay={i*60}>
              <MagBtn href={c.href} target={c.href.startsWith("mailto")?undefined:"_blank"}
                      rel="noopener noreferrer" className={`cc ${c.cls}`}>
                <img src={c.icon} alt={c.label}/><span>{c.label}</span>
              </MagBtn>
            </Reveal>
          ))}
        </div>
        <Reveal tag="p" className="contact-info" delay={300}>mvishwa270@gmail.com · +91 93456 76311</Reveal>
      </section>

      <footer>
        <p>Designed and Built by <span>Vishwa M</span> · 2026</p>
        <p className="fstack">React · Vite · GitHub Pages</p>
      </footer>
    </div>
  );
}
