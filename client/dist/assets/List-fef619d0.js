import{p as ve,aB as pe,U as me,r as x,aC as fe,v as xe,H as _e,c as _,ao as Ce,o as d,h as C,w as a,g as s,m as O,f,e as m,I as y,d as g,t as ge,ap as K,i as N,F as S,j as F,aj as W,k as $,$ as he,W as H,al as M,am as q,l as L,af as h,n as V,z as ye,A as be}from"./index-860b2e78.js";import{t as we}from"./vue-draggable-plus-451efaf6.js";const G=n=>(ye("data-v-6cd624ba"),n=n(),be(),n),ke={class:""},Le={class:"flex items-center cursor-grab"},Ve={key:1,class:"w-full"},De=G(()=>f("p",{class:"mb-2"},"Change list color",-1)),Ae={class:"flex gap-2"},Ee={class:"flex mt-2 gap-2"},Be={class:"overflow-hidden flex-col flex max-h-[70vh]"},Ie={class:"overflow-y-auto px-2 flex-1 max-h-full"},Ne={class:"px-2 z-50 mb-2"},Se={class:"px-2"},Fe=G(()=>f("div",null,[f("p",{class:"text-start text-md"},"Add a card")],-1)),$e={class:"gap-2 flex"},ze={__name:"List",props:{list:Object,index:Number,members:Array,isListLoading:Boolean,isDeleteLoading:Boolean,isWorkspacePremium:Boolean},emits:["deleteList","updateIndex"],setup(n,{emit:Ue}){var T;const J=M(()=>q(()=>import("./DeleteModal-96f2df6e.js"),["assets/DeleteModal-96f2df6e.js","assets/index-860b2e78.js","assets/index-57317e22.css"])),Q=M(()=>q(()=>import("./Card-76cf4bd2.js"),["assets/Card-76cf4bd2.js","assets/DeleteModal-96f2df6e.js","assets/index-860b2e78.js","assets/index-57317e22.css","assets/FullDate-ad74195c.js","assets/Card-3ff9c033.css"])),r=n,X=pe(),z=me(),Y=x(null),B=x((T=r.list)==null?void 0:T.name),b=x(""),w=x(!1),D=x(!1),{cards:c,isLoading:Z}=fe(r.list.id,r.list.board),k=x(!1),A=x("");xe(X);const E=x(!1),ee=t=>{w.value=!0,b.value=t},U=["#4BCE97","#F5CD47","#FEA362","#9F8FEF","#6CC3E0","#94C748","#E774BB","#579DFF"],te=()=>{w.value=!1,se(),b.value=""},P=()=>{E.value=!0,L.post("/card/create",{board:r.list.board,list:r.list.id,title:A.value},{withCredentials:!0}).then(t=>{h.emit("update-cards",r.list.board,[r.list.id]),A.value="",c.value.push(t.data),z.success("card added")}).catch(t=>{V(t)}).finally(()=>{E.value=!1})},le=t=>{L.delete(`/card/${t}`,{withCredentials:!0}).then(()=>{h.emit("update-cards",r.list.board,[r.list.id]),z.success("card was deleted"),h.emit("delete-card",t)}).catch(e=>{V(e)})},se=()=>{L.put(`/list/${r.list.id}`,{name:b.value}).then(t=>{B.value=t.data.name,h.emit("update-lists",{boardId:t.data.board,results:t.data})}).catch(t=>{V(t)})},R=(t,e,o,l)=>{L.put(`/card/${t}`,{position:l,list:e},{params:{sortBy:"position:asc"},withCredentials:!0}).then(()=>{h.emit("update-cards",r.list.board,[e,o]),h.emit("update-card",t)}).catch(i=>{V(i)})},ae=t=>{let e=t.newIndex,o=c.value[e-1],l=c.value[e+1],i=c.value[e],u=(i==null?void 0:i.position)||1024;o&&l?u=(o.position+l.position)/2:o?u=o.position+o.position/2:l?u=l.position/2:u=1024,R(i.id,r.list.id,i.list.id,u)},oe=t=>{let e=t.newIndex,o=c.value[e-1],l=c.value[e+1],i=c.value[e],u=(i==null?void 0:i.position)||1024;o&&l?u=(o.position+l.position)/2:o?u=o.position+o.position/2:l?u=l.position/2:u=1024,R(i.id,r.list.id,i.list.id,u)},ie=x(1),I=t=>{L.put(`/list/${r.list.id}`,{color:t}).then(e=>{B.value=e.data.name,h.emit("update-lists",{boardId:e.data.board,results:e.data})}).catch(e=>{V(e)})};return _e(c,()=>{ie.value=1}),(t,e)=>{const o=_("v-text-field"),l=_("v-btn"),i=_("v-list-item"),u=_("v-list"),de=_("v-menu"),ne=_("v-card-title"),re=_("v-tooltip"),ue=_("v-dialog"),ce=_("v-card"),j=Ce("click-outside");return d(),C(ce,{variant:"elevated",rounded:"lg",color:n.list.color||"list",class:"w-[272px] flex-1 flex h-max overflow-y-hidden",id:n.list.id.toString()},{default:a(()=>[s(re,{text:n.list.name},{activator:a(({props:v})=>[s(ne,O(v,{class:"flex sticky z-20 flex-row items-center justify-between header"}),{default:a(()=>[f("div",ke,[f("div",Le,[s(m(y),{icon:"ph:dots-six-vertical-bold",class:"opacity-50 mr-1",width:"30"}),w.value?K((d(),g("div",Ve,[s(o,{class:"text-2xl input",modelValue:b.value,"onUpdate:modelValue":e[1]||(e[1]=p=>b.value=p),"hide-details":"",autofocus:""},null,8,["modelValue"])])),[[j,te]]):(d(),g("div",{key:0,onClick:e[0]||(e[0]=()=>ee(B.value)),class:"w-full max-w-[90%] truncate items-center cursor-pointer text-xl py-2 pr-2 m-[0.5px]"},ge(n.list.name),1)),s(de,{rounded:"lg"},{activator:a(({props:p})=>[w.value?N("",!0):(d(),C(l,O({key:0,icon:"",variant:"text",size:"30",class:"bg-blue-200"},p),{default:a(()=>[s(m(y),{icon:"ph:dots-three-outline-fill"})]),_:2},1040))]),default:a(()=>[s(u,{rounded:"lg"},{default:a(()=>[n.isWorkspacePremium?(d(),C(i,{key:0,rounded:!1},{default:a(()=>[De,f("div",Ae,[(d(!0),g(S,null,F(U.slice(0,4),p=>(d(),C(l,{onClick:()=>I(p),flat:"",style:W({backgroundColor:p}),class:"h-8 cursor-pointer flex w-12 rounded-lg"},null,8,["onClick","style"]))),256))]),f("div",Ee,[(d(!0),g(S,null,F(U.slice(4,8),p=>(d(),C(l,{onClick:()=>I(p),flat:"",style:W({backgroundColor:p}),class:"h-8 cursor-pointer flex w-12 rounded-lg"},null,8,["onClick","style"]))),256))]),s(l,{onClick:e[2]||(e[2]=()=>I(null)),class:"w-full mt-2",variant:"tonal"},{default:a(()=>[$(" Remove list color ")]),_:1})]),_:1})):N("",!0),s(i,{onClick:e[3]||(e[3]=p=>D.value=!0),disabled:n.isDeleteLoading,loading:n.isDeleteLoading,"base-color":"error",density:"compact",rounded:!1},{prepend:a(()=>[s(m(y),{icon:"ph:trash",width:"25"})]),default:a(()=>[$(" Delete this list ")]),_:1},8,["disabled","loading"])]),_:1})]),_:2},1024),w.value?(d(),C(l,{key:2,icon:"",variant:"tonal",color:"primary",size:"35",class:"mx-1"},{default:a(()=>[s(m(y),{icon:"ph:check"})]),_:1})):N("",!0)])])]),_:2},1040)]),_:1},8,["text"]),f("div",Be,[f("div",Ie,[(d(),C(m(we),{ref_key:"el",ref:Y,group:"cards",class:"space-y-3 relative",modelValue:m(c),"onUpdate:modelValue":e[5]||(e[5]=v=>he(c)?c.value=v:null),animation:150,dragClass:"drag",ghostClass:"ghost",onUpdate:ae,scroll:"",scrollSensitivity:300,bubbleScroll:"",onAdd:oe,key:m(Z)},{default:a(()=>[(d(!0),g(S,null,F(m(c),v=>(d(),C(m(Q),{key:v.id,listName:n.list.name,card:v,onDeleteCard:e[4]||(e[4]=p=>le(p))},null,8,["listName","card"]))),128))]),_:1},8,["modelValue"]))]),K((d(),g("div",Ne,[k.value?(d(),g("div",{key:1,class:"flex flex-col gap-2 px-1 pt-2 pb-2",onKeypress:e[10]||(e[10]=H(v=>P(),["enter"])),onKeydown:e[11]||(e[11]=H(v=>k.value=!1,["esc"]))},[s(o,{"single-line":"",modelValue:A.value,"onUpdate:modelValue":e[7]||(e[7]=v=>A.value=v),placeholder:"Enter a title for this card",rows:"2","no-resize":"","hide-details":""},null,8,["modelValue"]),f("div",$e,[s(l,{color:"primary",loading:E.value,disabled:E.value,onClick:e[8]||(e[8]=()=>P())},{default:a(()=>[$(" Add ")]),_:1},8,["loading","disabled"]),s(l,{variant:"text",icon:"",size:"35",onClick:e[9]||(e[9]=()=>k.value=!1)},{default:a(()=>[s(m(y),{icon:"ph:x",width:"25"})]),_:1})])],32)):(d(),C(l,{key:0,class:"w-full my-1 flex justify-start p-1",height:"40",variant:"text",onClick:e[6]||(e[6]=()=>k.value=!0)},{default:a(()=>[f("div",Se,[s(m(y),{icon:"ph:plus",width:"20"})]),Fe]),_:1}))])),[[j,()=>k.value=!1]])]),s(ue,{width:"500",modelValue:D.value,"onUpdate:modelValue":e[14]||(e[14]=v=>D.value=v)},{default:a(()=>[s(m(J),{title:"Are you sure you want to delete this list?",text:"All cards in this list will be deleted","action-btn-text":"Delete",onCancel:e[12]||(e[12]=()=>D.value=!1),onDelete:e[13]||(e[13]=()=>t.$emit("deleteList",n.list.id))})]),_:1},8,["modelValue"])]),_:1},8,["color","id"])}}},Te=ve(ze,[["__scopeId","data-v-6cd624ba"]]);export{Te as default};
