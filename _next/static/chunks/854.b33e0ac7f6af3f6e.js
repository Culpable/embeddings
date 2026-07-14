"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[854],{5854:(e,t,i)=>{i.r(t),i.d(t,{FreshnessPipelineFlow:()=>r});var s=i(5155);function r(){return(0,s.jsx)("div",{className:"relative mt-8 w-full overflow-hidden aspect-[2.1/1] md:aspect-[2.4/1] lg:aspect-[3/1]",role:"img","aria-label":"ERP, POS, and inventory updates flowing into a fresh catalogue record.",children:(0,s.jsxs)("svg",{viewBox:"0 0 960 320",preserveAspectRatio:"xMidYMid slice",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"h-full w-full","aria-hidden":"true",children:[(0,s.jsxs)("defs",{children:[(0,s.jsxs)("linearGradient",{id:"freshPipeGrad",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[(0,s.jsx)("stop",{offset:"0%",stopColor:"#171717",stopOpacity:"0.15"}),(0,s.jsx)("stop",{offset:"50%",stopColor:"#171717",stopOpacity:"0.3"}),(0,s.jsx)("stop",{offset:"100%",stopColor:"#171717",stopOpacity:"0.15"})]}),(0,s.jsx)("path",{id:"freshPathERP",d:"M 280 80  C 380 80,  500 120, 640 160"}),(0,s.jsx)("path",{id:"freshPathPOS",d:"M 280 160 C 400 160, 500 160, 640 160"}),(0,s.jsx)("path",{id:"freshPathInv",d:"M 280 240 C 380 240, 500 200, 640 160"})]}),(0,s.jsxs)("g",{children:[(0,s.jsx)("rect",{x:"160",y:"60",width:"110",height:"40",rx:"8",fill:"white",stroke:"#e5e5e5",strokeWidth:"1"}),(0,s.jsx)("text",{x:"215",y:"85",textAnchor:"middle",className:"fill-neutral-950 font-display",style:{fontSize:"11px",fontWeight:600,letterSpacing:"0.05em"},children:"ERP"})]}),(0,s.jsxs)("g",{children:[(0,s.jsx)("rect",{x:"160",y:"140",width:"110",height:"40",rx:"8",fill:"white",stroke:"#e5e5e5",strokeWidth:"1"}),(0,s.jsx)("text",{x:"215",y:"165",textAnchor:"middle",className:"fill-neutral-950 font-display",style:{fontSize:"11px",fontWeight:600,letterSpacing:"0.05em"},children:"POS"})]}),(0,s.jsxs)("g",{children:[(0,s.jsx)("rect",{x:"160",y:"220",width:"110",height:"40",rx:"8",fill:"white",stroke:"#e5e5e5",strokeWidth:"1"}),(0,s.jsx)("text",{x:"215",y:"245",textAnchor:"middle",className:"fill-neutral-950 font-display",style:{fontSize:"11px",fontWeight:600,letterSpacing:"0.05em"},children:"Inventory"})]}),(0,s.jsx)("path",{d:"M 280 80  C 380 80,  500 120, 640 160",stroke:"url(#freshPipeGrad)",strokeWidth:"1.5",fill:"none"}),(0,s.jsx)("path",{d:"M 280 160 C 400 160, 500 160, 640 160",stroke:"url(#freshPipeGrad)",strokeWidth:"1.5",fill:"none"}),(0,s.jsx)("path",{d:"M 280 240 C 380 240, 500 200, 640 160",stroke:"url(#freshPipeGrad)",strokeWidth:"1.5",fill:"none"}),(0,s.jsx)("circle",{r:"3",fill:"#171717",opacity:"0.5",children:(0,s.jsx)("animateMotion",{dur:"3s",repeatCount:"indefinite",begin:"0s",children:(0,s.jsx)("mpath",{href:"#freshPathERP"})})}),(0,s.jsx)("circle",{r:"2",fill:"#171717",opacity:"0.3",children:(0,s.jsx)("animateMotion",{dur:"3s",repeatCount:"indefinite",begin:"1.5s",children:(0,s.jsx)("mpath",{href:"#freshPathERP"})})}),(0,s.jsx)("circle",{r:"3",fill:"#171717",opacity:"0.5",children:(0,s.jsx)("animateMotion",{dur:"3.5s",repeatCount:"indefinite",begin:"0.3s",children:(0,s.jsx)("mpath",{href:"#freshPathPOS"})})}),(0,s.jsx)("circle",{r:"2",fill:"#171717",opacity:"0.3",children:(0,s.jsx)("animateMotion",{dur:"3.5s",repeatCount:"indefinite",begin:"2s",children:(0,s.jsx)("mpath",{href:"#freshPathPOS"})})}),(0,s.jsx)("circle",{r:"2.5",fill:"#171717",opacity:"0.4",children:(0,s.jsx)("animateMotion",{dur:"4s",repeatCount:"indefinite",begin:"0.6s",children:(0,s.jsx)("mpath",{href:"#freshPathInv"})})}),(0,s.jsx)("circle",{r:"2",fill:"#171717",opacity:"0.3",children:(0,s.jsx)("animateMotion",{dur:"4s",repeatCount:"indefinite",begin:"2.5s",children:(0,s.jsx)("mpath",{href:"#freshPathInv"})})}),(0,s.jsx)("text",{x:"420",y:"85",fill:"#171717",style:{fontSize:"9px",fontWeight:500,opacity:.4},className:"fresh-pipe-text-1",children:"stock: 142 → 139"}),(0,s.jsx)("text",{x:"440",y:"143",fill:"#171717",style:{fontSize:"9px",fontWeight:500,opacity:.4},className:"fresh-pipe-text-2",children:"price: $189 → $179"}),(0,s.jsx)("text",{x:"460",y:"240",fill:"#171717",style:{fontSize:"9px",fontWeight:500,opacity:.4},className:"fresh-pipe-text-3",children:"status: active"}),(0,s.jsxs)("g",{children:[(0,s.jsx)("rect",{x:"640",y:"130",width:"140",height:"60",rx:"10",fill:"white",stroke:"#e5e5e5",strokeWidth:"1",className:"fresh-pipe-catalogue"}),(0,s.jsx)("text",{x:"710",y:"165",textAnchor:"middle",className:"fill-neutral-950 font-display",style:{fontSize:"12px",fontWeight:600,letterSpacing:"0.05em"},children:"Catalogue"})]}),(0,s.jsx)("style",{children:`
          /* Catalogue node breathes subtly to show it's receiving data */
          .fresh-pipe-catalogue {
            animation: freshPipePulse 3s ease-in-out infinite;
          }

          @keyframes freshPipePulse {
            0%, 100% { filter: drop-shadow(0 0 0 transparent); }
            50% { filter: drop-shadow(0 0 8px rgba(23, 23, 23, 0.06)); }
          }

          /* Status text snippets cycle visibility */
          .fresh-pipe-text-1 {
            animation: freshPipeTextFade 4s ease-in-out infinite;
          }
          .fresh-pipe-text-2 {
            animation: freshPipeTextFade 4s ease-in-out infinite 1.3s;
          }
          .fresh-pipe-text-3 {
            animation: freshPipeTextFade 4s ease-in-out infinite 2.6s;
          }

          @keyframes freshPipeTextFade {
            0%, 15% { opacity: 0; }
            25% { opacity: 0.5; }
            50% { opacity: 0.5; }
            65% { opacity: 0; }
            100% { opacity: 0; }
          }
        `})]})})}}}]);