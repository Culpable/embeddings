"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[673],{673:(e,i,t)=>{t.r(i),t.d(i,{OptimisationRipple:()=>a});var p=t(5155);function a(){return(0,p.jsx)("div",{className:"relative mt-8 w-full overflow-hidden aspect-[2.15/1] md:aspect-[2.45/1] lg:aspect-[3/1]",role:"img","aria-label":"Live trend signals rippling out to product records and marking relevant listings as optimised.",children:(0,p.jsxs)("svg",{viewBox:"0 0 960 320",preserveAspectRatio:"xMidYMid slice",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"h-full w-full","aria-hidden":"true",children:[[{x:280,y:70,label:"Blue Midi Dress",trend:"dress"},{x:680,y:70,label:"Sapphire Earrings",trend:"dress"},{x:230,y:200,label:"SPF 50+ Sunscreen",trend:"spf"},{x:730,y:200,label:"UV Beach Hat",trend:"spf"},{x:340,y:270,label:"Organic Chocolate",trend:"metals"},{x:620,y:270,label:"Kids Lunchbox",trend:"metals"}].map((e,i)=>{let{x:t,y:a,label:s}=e;return(0,p.jsxs)("g",{className:`opt-ripple-node opt-ripple-node-${i}`,children:[(0,p.jsx)("rect",{x:t-48,y:a-12,width:"96",height:"24",rx:"6",fill:"white",stroke:"#e5e5e5",strokeWidth:"0.5"}),(0,p.jsx)("text",{x:t,y:a,textAnchor:"middle",dominantBaseline:"central",fill:"#171717",style:{fontSize:"8px",fontWeight:500,opacity:.5},children:s}),(0,p.jsx)("text",{x:t,y:a+22,textAnchor:"middle",fill:"#16a34a",style:{fontSize:"7px",fontWeight:600,opacity:0},className:`opt-ripple-badge opt-ripple-badge-${i}`,children:"+optimised"})]},s)}),(0,p.jsxs)("g",{className:"opt-ripple-set-1",children:[(0,p.jsx)("circle",{cx:480,cy:160,r:"4",fill:"#171717",opacity:"0.4",className:"opt-ripple-drop-1"}),(0,p.jsx)("circle",{cx:480,cy:160,r:"0",fill:"none",stroke:"#171717",strokeWidth:"1",className:"opt-ripple-ring-1a"}),(0,p.jsx)("circle",{cx:480,cy:160,r:"0",fill:"none",stroke:"#171717",strokeWidth:"0.75",className:"opt-ripple-ring-1b"}),(0,p.jsx)("circle",{cx:480,cy:160,r:"0",fill:"none",stroke:"#171717",strokeWidth:"0.5",className:"opt-ripple-ring-1c"})]}),(0,p.jsx)("text",{x:480,y:130,textAnchor:"middle",fill:"#171717",style:{fontSize:"9px",fontWeight:500,opacity:0},className:"opt-ripple-trend-1",children:"Taylor Swift blue dress"}),(0,p.jsxs)("g",{className:"opt-ripple-set-2",children:[(0,p.jsx)("circle",{cx:465,cy:170,r:"4",fill:"#171717",opacity:"0.4",className:"opt-ripple-drop-2"}),(0,p.jsx)("circle",{cx:465,cy:170,r:"0",fill:"none",stroke:"#171717",strokeWidth:"1",className:"opt-ripple-ring-2a"}),(0,p.jsx)("circle",{cx:465,cy:170,r:"0",fill:"none",stroke:"#171717",strokeWidth:"0.75",className:"opt-ripple-ring-2b"}),(0,p.jsx)("circle",{cx:465,cy:170,r:"0",fill:"none",stroke:"#171717",strokeWidth:"0.5",className:"opt-ripple-ring-2c"})]}),(0,p.jsx)("text",{x:465,y:140,textAnchor:"middle",fill:"#171717",style:{fontSize:"9px",fontWeight:500,opacity:0},className:"opt-ripple-trend-2",children:"SPF sunscreen recall"}),(0,p.jsxs)("g",{className:"opt-ripple-set-3",children:[(0,p.jsx)("circle",{cx:500,cy:155,r:"4",fill:"#171717",opacity:"0.4",className:"opt-ripple-drop-3"}),(0,p.jsx)("circle",{cx:500,cy:155,r:"0",fill:"none",stroke:"#171717",strokeWidth:"1",className:"opt-ripple-ring-3a"}),(0,p.jsx)("circle",{cx:500,cy:155,r:"0",fill:"none",stroke:"#171717",strokeWidth:"0.75",className:"opt-ripple-ring-3b"}),(0,p.jsx)("circle",{cx:500,cy:155,r:"0",fill:"none",stroke:"#171717",strokeWidth:"0.5",className:"opt-ripple-ring-3c"})]}),(0,p.jsx)("text",{x:500,y:135,textAnchor:"middle",fill:"#171717",style:{fontSize:"9px",fontWeight:500,opacity:0},className:"opt-ripple-trend-3",children:"heavy metals in chocolate"}),(0,p.jsx)("style",{children:`
          /* ----------------------------------------------------------- */
          /* Ripple ring expansion — scale from 0 to large, fade out     */
          /* ----------------------------------------------------------- */

          /* Ripple set 1 rings — starts at 0s */
          .opt-ripple-ring-1a { animation: optRippleExpand 12s ease-out infinite 0s; }
          .opt-ripple-ring-1b { animation: optRippleExpand 12s ease-out infinite 0.3s; }
          .opt-ripple-ring-1c { animation: optRippleExpand 12s ease-out infinite 0.6s; }

          /* Ripple set 2 rings — starts at 4s */
          .opt-ripple-ring-2a { animation: optRippleExpand 12s ease-out infinite 4s; }
          .opt-ripple-ring-2b { animation: optRippleExpand 12s ease-out infinite 4.3s; }
          .opt-ripple-ring-2c { animation: optRippleExpand 12s ease-out infinite 4.6s; }

          /* Ripple set 3 rings — starts at 8s */
          .opt-ripple-ring-3a { animation: optRippleExpand 12s ease-out infinite 8s; }
          .opt-ripple-ring-3b { animation: optRippleExpand 12s ease-out infinite 8.3s; }
          .opt-ripple-ring-3c { animation: optRippleExpand 12s ease-out infinite 8.6s; }

          @keyframes optRippleExpand {
            0% { r: 0; opacity: 0.3; }
            40% { r: 280; opacity: 0; }
            100% { r: 280; opacity: 0; }
          }

          /* ----------------------------------------------------------- */
          /* Drop dot appearance                                          */
          /* ----------------------------------------------------------- */
          .opt-ripple-drop-1 { animation: optDropAppear 12s ease-out infinite 0s; }
          .opt-ripple-drop-2 { animation: optDropAppear 12s ease-out infinite 4s; }
          .opt-ripple-drop-3 { animation: optDropAppear 12s ease-out infinite 8s; }

          @keyframes optDropAppear {
            0% { opacity: 0; r: 0; }
            3% { opacity: 0.5; r: 5; }
            8% { opacity: 0.3; r: 3; }
            30% { opacity: 0; }
            100% { opacity: 0; }
          }

          /* ----------------------------------------------------------- */
          /* Trend labels — fade in/out with each ripple                  */
          /* ----------------------------------------------------------- */
          .opt-ripple-trend-1 { animation: optTrendLabel 12s ease-in-out infinite 0s; }
          .opt-ripple-trend-2 { animation: optTrendLabel 12s ease-in-out infinite 4s; }
          .opt-ripple-trend-3 { animation: optTrendLabel 12s ease-in-out infinite 8s; }

          @keyframes optTrendLabel {
            0%, 2% { opacity: 0; }
            5% { opacity: 0.45; }
            25% { opacity: 0.45; }
            30%, 100% { opacity: 0; }
          }

          /* ----------------------------------------------------------- */
          /* Node flash + badge — timed to matching ripple arrival        */
          /* Each ripple set activates its two matching product nodes     */
          /* ----------------------------------------------------------- */

          /* Ripple 1 ("Taylor Swift blue dress") → nodes 0 & 1 */
          /* Ripple reaches nodes ~1.5s after drop (distance \xf7 speed) */
          .opt-ripple-node-0 { animation: optNodeFlash 12s ease-out infinite 1.2s; }
          .opt-ripple-node-1 { animation: optNodeFlash 12s ease-out infinite 1.5s; }
          .opt-ripple-badge-0 { animation: optBadgeFade 12s ease-out infinite 1.6s; }
          .opt-ripple-badge-1 { animation: optBadgeFade 12s ease-out infinite 1.9s; }

          /* Ripple 2 ("SPF sunscreen recall") → nodes 2 & 3 */
          .opt-ripple-node-2 { animation: optNodeFlash 12s ease-out infinite 5.2s; }
          .opt-ripple-node-3 { animation: optNodeFlash 12s ease-out infinite 5.5s; }
          .opt-ripple-badge-2 { animation: optBadgeFade 12s ease-out infinite 5.6s; }
          .opt-ripple-badge-3 { animation: optBadgeFade 12s ease-out infinite 5.9s; }

          /* Ripple 3 ("heavy metals") → nodes 4 & 5 */
          .opt-ripple-node-4 { animation: optNodeFlash 12s ease-out infinite 9.2s; }
          .opt-ripple-node-5 { animation: optNodeFlash 12s ease-out infinite 9.5s; }
          .opt-ripple-badge-4 { animation: optBadgeFade 12s ease-out infinite 9.6s; }
          .opt-ripple-badge-5 { animation: optBadgeFade 12s ease-out infinite 9.9s; }

          @keyframes optNodeFlash {
            0%, 2% { filter: brightness(1); }
            5% { filter: brightness(1.4); }
            12% { filter: brightness(1); }
            100% { filter: brightness(1); }
          }

          @keyframes optBadgeFade {
            0%, 2% { opacity: 0; }
            6% { opacity: 0.6; }
            20% { opacity: 0.6; }
            25%, 100% { opacity: 0; }
          }
        `})]})})}}}]);