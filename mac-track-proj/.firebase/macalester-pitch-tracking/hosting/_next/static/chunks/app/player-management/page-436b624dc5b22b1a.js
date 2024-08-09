(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[354],{1359:function(e,t,r){Promise.resolve().then(r.bind(r,9053))},9053:function(e,t,r){"use strict";var n=r(7437),a=r(2278),s=r(1014),o=r(9343),i=r(9772),u=r(495),l=r(6661),c=r(3102),d=r(5657),m=r(9842);let f=i.z.object({fullName:i.z.string().min(2,{message:"Username must be at least 2 characters."}),playerNumber:i.z.number({required_error:"You must enter a number."}),gradYear:i.z.number({required_error:"You must enter a graduation year."})});t.default=()=>{let{toast:e}=(0,d.pm)(),t=(0,o.cI)({resolver:(0,s.F)(f),defaultValues:{fullName:"",playerNumber:1,gradYear:2025}}),r=async r=>{let n=r.fullName.replace(" ","-"),s=(0,m.JU)(a.db,"pitcher","".concat(r.gradYear).concat(n).concat(r.playerNumber));try{await (0,m.pl)(s,{fullName:r.fullName,playerNumber:r.playerNumber,gradYear:r.gradYear}),e({description:"Player added successfully."})}catch(r){e({title:"Uh oh! Something went wrong.",description:"There was a problem with your player submission attempt. Please try again.",variant:"destructive"}),t.reset()}};return(0,n.jsx)("div",{className:"flex items-center justify-center min-w-[400px] p-4",children:(0,n.jsx)(l.l0,{...t,children:(0,n.jsxs)("form",{onSubmit:t.handleSubmit(r),className:"w-2/3 space-y-6",children:[(0,n.jsx)(l.Wi,{control:t.control,name:"fullName",render:e=>{let{field:t}=e;return(0,n.jsxs)(l.xJ,{children:[(0,n.jsx)(l.lX,{children:"Name"}),(0,n.jsx)(l.NI,{children:(0,n.jsx)(c.I,{placeholder:"Enter your name...",...t})}),(0,n.jsx)(l.zG,{})]})}}),(0,n.jsx)(l.Wi,{control:t.control,name:"playerNumber",render:e=>{let{field:t}=e;return(0,n.jsxs)(l.xJ,{children:[(0,n.jsx)(l.lX,{children:"Number"}),(0,n.jsx)(l.NI,{children:(0,n.jsx)(c.I,{type:"number",min:0,max:99,placeholder:"Enter your number...",...t,onChange:e=>t.onChange(+e.target.value)})}),(0,n.jsx)(l.zG,{})]})}}),(0,n.jsx)(l.Wi,{control:t.control,name:"gradYear",render:e=>{let{field:t}=e;return(0,n.jsxs)(l.xJ,{children:[(0,n.jsx)(l.lX,{children:"Grad Year"}),(0,n.jsx)(l.NI,{children:(0,n.jsx)(c.I,{type:"number",min:2024,max:3e3,placeholder:"Enter your graduation year...",...t,onChange:e=>t.onChange(+e.target.value)})}),(0,n.jsx)(l.zG,{})]})}}),(0,n.jsx)("div",{className:"flex justify-end",children:(0,n.jsx)(u.z,{type:"submit",children:"Add Player"})})]})})})}},495:function(e,t,r){"use strict";r.d(t,{z:function(){return l}});var n=r(7437),a=r(2265),s=r(3355),o=r(2218),i=r(7440);let u=(0,o.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),l=a.forwardRef((e,t)=>{let{className:r,variant:a,size:o,asChild:l=!1,...c}=e,d=l?s.g7:"button";return(0,n.jsx)(d,{className:(0,i.cn)(u({variant:a,size:o,className:r})),ref:t,...c})});l.displayName="Button"},6661:function(e,t,r){"use strict";r.d(t,{l0:function(){return d},NI:function(){return b},Wi:function(){return f},xJ:function(){return h},lX:function(){return x},zG:function(){return y}});var n=r(7437),a=r(2265),s=r(3355),o=r(9343),i=r(7440),u=r(8837);let l=(0,r(2218).j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),c=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)(u.f,{ref:t,className:(0,i.cn)(l(),r),...a})});c.displayName=u.f.displayName;let d=o.RV,m=a.createContext({}),f=e=>{let{...t}=e;return(0,n.jsx)(m.Provider,{value:{name:t.name},children:(0,n.jsx)(o.Qr,{...t})})},p=()=>{let e=a.useContext(m),t=a.useContext(g),{getFieldState:r,formState:n}=(0,o.Gc)(),s=r(e.name,n);if(!e)throw Error("useFormField should be used within <FormField>");let{id:i}=t;return{id:i,name:e.name,formItemId:"".concat(i,"-form-item"),formDescriptionId:"".concat(i,"-form-item-description"),formMessageId:"".concat(i,"-form-item-message"),...s}},g=a.createContext({}),h=a.forwardRef((e,t)=>{let{className:r,...s}=e,o=a.useId();return(0,n.jsx)(g.Provider,{value:{id:o},children:(0,n.jsx)("div",{ref:t,className:(0,i.cn)("space-y-2",r),...s})})});h.displayName="FormItem";let x=a.forwardRef((e,t)=>{let{className:r,...a}=e,{error:s,formItemId:o}=p();return(0,n.jsx)(c,{ref:t,className:(0,i.cn)(s&&"text-destructive",r),htmlFor:o,...a})});x.displayName="FormLabel";let b=a.forwardRef((e,t)=>{let{...r}=e,{error:a,formItemId:o,formDescriptionId:i,formMessageId:u}=p();return(0,n.jsx)(s.g7,{ref:t,id:o,"aria-describedby":a?"".concat(i," ").concat(u):"".concat(i),"aria-invalid":!!a,...r})});b.displayName="FormControl",a.forwardRef((e,t)=>{let{className:r,...a}=e,{formDescriptionId:s}=p();return(0,n.jsx)("p",{ref:t,id:s,className:(0,i.cn)("text-sm text-muted-foreground",r),...a})}).displayName="FormDescription";let y=a.forwardRef((e,t)=>{let{className:r,children:a,...s}=e,{error:o,formMessageId:u}=p(),l=o?String(null==o?void 0:o.message):a;return l?(0,n.jsx)("p",{ref:t,id:u,className:(0,i.cn)("text-sm font-medium text-destructive",r),...s,children:l}):null});y.displayName="FormMessage"},3102:function(e,t,r){"use strict";r.d(t,{I:function(){return o}});var n=r(7437),a=r(2265),s=r(7440);let o=a.forwardRef((e,t)=>{let{className:r,type:a,...o}=e;return(0,n.jsx)("input",{type:a,className:(0,s.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",r),ref:t,...o})});o.displayName="Input"},5657:function(e,t,r){"use strict";r.d(t,{pm:function(){return m}});var n=r(2265);let a=0,s=new Map,o=e=>{if(s.has(e))return;let t=setTimeout(()=>{s.delete(e),c({type:"REMOVE_TOAST",toastId:e})},1e6);s.set(e,t)},i=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case"DISMISS_TOAST":{let{toastId:r}=t;return r?o(r):e.toasts.forEach(e=>{o(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===t.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)}}},u=[],l={toasts:[]};function c(e){l=i(l,e),u.forEach(e=>{e(l)})}function d(e){let{...t}=e,r=(a=(a+1)%Number.MAX_SAFE_INTEGER).toString(),n=()=>c({type:"DISMISS_TOAST",toastId:r});return c({type:"ADD_TOAST",toast:{...t,id:r,open:!0,onOpenChange:e=>{e||n()}}}),{id:r,dismiss:n,update:e=>c({type:"UPDATE_TOAST",toast:{...e,id:r}})}}function m(){let[e,t]=n.useState(l);return n.useEffect(()=>(u.push(t),()=>{let e=u.indexOf(t);e>-1&&u.splice(e,1)}),[e]),{...e,toast:d,dismiss:e=>c({type:"DISMISS_TOAST",toastId:e})}}},2278:function(e,t,r){"use strict";r.d(t,{I8:function(){return i},Vv:function(){return u},db:function(){return l}});var n=r(5236),a=r(5735),s=r(9842);let o=(0,n.ZF)({apiKey:"AIzaSyCj2CaaGlDtJsGHKECYi_3X7gJ1d-GhOZA",authDomain:"macalester-pitch-tracking.firebaseapp.com",projectId:"macalester-pitch-tracking",storageBucket:"macalester-pitch-tracking.appspot.com",messagingSenderId:"996067582924",appId:"1:996067582924:web:80a551badd88ba692c3369",measurementId:"G-WJBNF7TC0Y"}),i=(0,a.v0)(o),u=new a.hJ,l=(0,s.ad)(o)},7440:function(e,t,r){"use strict";r.d(t,{cn:function(){return s}});var n=r(4839),a=r(6164);function s(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,a.m6)((0,n.W)(t))}}},function(e){e.O(0,[358,898,558,897,971,23,744],function(){return e(e.s=1359)}),_N_E=e.O()}]);