import{Z as C,k as g,a0 as t,b as a,K as h,$ as b}from"../../three.module-eb0894ce.js";/* empty css                  */import{S,W as L}from"../../World-4ff8b13f.js";import{a as M}from"../../lil-gui.esm-ee8b5e9f.js";import{G as k}from"../../GLTFLoader-e9c8349b.js";import"../../OrbitControls-18e3733d.js";h.enabled=!0;const x=new S,n=new L(x),W=new b,l=new M;n.camera.position.set(16,7.5,-15);n.renderer.outputColorSpace=C;n.controls.zoomSpeed=.5;const G=new g,T=new k,f="/threejs-experiments",c=G.load(f+"/scenes/house/baked.jpg");c.flipY=!1;c.colorSpace=C;const z=new t({map:c}),d=new t({color:"#ffe7db"}),r=new t({color:"#fff3d6"});T.load(f+"/scenes/house/house2.glb",e=>{const i=e.scene.children,m=i.find(o=>o.name==="emissionWindow"),w=i.find(o=>o.name==="emissionRoundWindow"),p=i.find(o=>o.name==="emissionLamp");e.scene.traverse(o=>{o instanceof a&&(o.material=z)}),p instanceof a&&(p.material=d),m instanceof a&&(m.material=r),w instanceof a&&(w.material=r),n.scene.add(e.scene),e.scene.position.y=-2});const s={clearColor:"#0e0033",windowColor:r.color.getHexString(),lampColor:d.color.getHexString()};n.renderer.setClearColor(s.clearColor);l.addColor(s,"clearColor").onChange(e=>{n.renderer.setClearColor(e)});l.addColor(s,"windowColor").onChange(e=>{r.color.set(e)});l.addColor(s,"lampColor").onChange(e=>{d.color.set(e)});const u=()=>{W.getElapsedTime(),n.render(),window.requestAnimationFrame(u)};window.requestAnimationFrame(u);
