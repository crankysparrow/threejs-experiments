import{X as C,k as g,Y as t,b as r,J as h,Z as b}from"../../three.module-f3808c7b.js";/* empty css                  */import{S,W as L}from"../../World-66b936b7.js";import{a as M}from"../../lil-gui.esm-ee8b5e9f.js";import{G as k}from"../../GLTFLoader-2ceaf2e5.js";import"../../OrbitControls-7df3182b.js";h.enabled=!0;const x=new S,n=new L(x),W=new b,l=new M;n.camera.position.set(16,7.5,-15);n.renderer.outputColorSpace=C;n.controls.zoomSpeed=.5;const G=new g,T=new k,f="/threejs-experiments",c=G.load(f+"/house/baked.jpg");c.flipY=!1;c.colorSpace=C;const z=new t({map:c}),d=new t({color:"#ffe7db"}),a=new t({color:"#fff3d6"});T.load(f+"/house/house2.glb",e=>{const i=e.scene.children,m=i.find(o=>o.name==="emissionWindow"),w=i.find(o=>o.name==="emissionRoundWindow"),p=i.find(o=>o.name==="emissionLamp");e.scene.traverse(o=>{o instanceof r&&(o.material=z)}),p instanceof r&&(p.material=d),m instanceof r&&(m.material=a),w instanceof r&&(w.material=a),n.scene.add(e.scene),e.scene.position.y=-2});const s={clearColor:"#0e0033",windowColor:a.color.getHexString(),lampColor:d.color.getHexString()};n.renderer.setClearColor(s.clearColor);l.addColor(s,"clearColor").onChange(e=>{n.renderer.setClearColor(e)});l.addColor(s,"windowColor").onChange(e=>{a.color.set(e)});l.addColor(s,"lampColor").onChange(e=>{d.color.set(e)});const u=()=>{W.getElapsedTime(),n.render(),window.requestAnimationFrame(u)};window.requestAnimationFrame(u);
