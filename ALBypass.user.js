(function (){window.history.replaceState&&window.history.replaceState(null,null,window.location.href);var messageError,linkCantBypass,listOfAcceptDomains=GM_getValue("domains",""),retry=3,green_icon=GM_getValue("green_icon",""),green_icon1=GM_getValue("green_icon1",""),grey_icon=GM_getValue("grey_icon",""),red_icon=GM_getValue("red_icon",""),autoFCB="auto(faucet|claim|bitco).(in|org)",gist_id="8f5a3bd519f0ebf94708ad624ffd76d2",delayOn=GM_getValue("delayOn","[]"),update_delayOn=GM_getValue("update_delayOn",!0);function getIcons(){fetch("https://gist.githubusercontent.com/Harfho/63966e7f7145a5607e710a4cdcb31906/raw/ALBypass_icons.json").then(e=>e.ok?e.json():Promise.reject(e)).then(e=>{var t=e.green_icon,o=e.green_icon1,a=e.grey_icon,e=e.red_icon;GM_setValue("green_icon",t),GM_setValue("green_icon1",o),GM_setValue("grey_icon",a),GM_setValue("red_icon",e)}).catch(e=>{console.log("can't get Icons because of ",e),window.location.reload(!0)})}function favicon(e){GM_addElement(document.getElementsByTagName("head")[0],"link",{href:e,rel:"icon",type:"image/png"})}function waitForKeyElements(e,o,t,a,n){void 0===t&&(t=!0),void 0===a&&(a=300),void 0===n&&(n=-1);var s="function"==typeof e?e():document.querySelectorAll(e),i=s&&0<s.length;i&&s.forEach(function(e){var t="data-userscript-alreadyFound";e.getAttribute(t)||(o(e)?i=!1:e.setAttribute(t,!0))}),0===n||i&&t||(--n,setTimeout(function(){waitForKeyElements(e,o,t,a,n)},a))}function getdelayPages(){GM_xmlhttpRequest({method:"GET",url:"https://gist.github.com/Harfho/"+gist_id+"/raw/delaypage.txt?timestamp=' + (+new Date())",revalidate:!1,nocache:!0,onload:e=>{let t=e.responseText.replace(/[^\w\d.,-]/gi,"").split(",").filter(e=>e),o=t.map(e=>e.replace(/'/gi,'"').toLowerCase());GM_setValue("delayOn",JSON.stringify(o))},onerror:e=>{}})}function delayHost(e){if(e=new URL(e).host,delayOn.includes(e))return!0}function update_delaypage(e=null){var t=GM_getValue("delayOn"),t=JSON.parse(t),o="Bearer "+(o=atob("Z2hwXzFVMGhPMTFodTZ6eWxaZ0hMWW5qWFdMTjE1d3V5NjBZN0l6Rw==")),a=new Headers({accept:"application/vnd.github.v3+json",Authorization:o,"Content-Type":"application/json"}),o=JSON.stringify({files:{"delaypage.txt":{content:JSON.stringify(t)}}});fetch("https://api.github.com/gists/"+gist_id,{method:"PATCH",headers:a,body:o,redirect:"follow"}).then(e=>e.text()).then(e=>{console.log("Done",t),window.close()}).catch(e=>{console.log("error",e)}),GM_notification({title:"!Bypass-- "+e,text:"push "+e+" to delaypage list on github",timeout:1e4,ondone:()=>{}})}function addDelayorClose(e){try{var t=/.*action is marked as suspicious.*/gi.test(e.innerText.toLowerCase()),o=(/.*already visited this link.*/gi.test(e.innerText.toLowerCase()),new URL(document.referrer).host)}catch(e){o=""}var a;t?(delayOn=GM_getValue("delayOn"),delayOn=JSON.parse(delayOn),a=GM_getValue("previousHost",""),o&&0==delayOn.includes(o)?(delayOn.push(o),GM_setValue("delayOn",JSON.stringify(delayOn)),update_delaypage(o)):a&&0==delayOn.includes(a)&&(delayOn.push(a),GM_setValue("delayOn",JSON.stringify(delayOn)),update_delaypage(a))):window.close()}function OnPhone(){0==GM_getValue("OnPhone",!1)?GM_setValue("OnPhone",!0):GM_setValue("OnPhone",!1),window.location.reload()}function AllowToSendEmail(){0==GM_getValue("AllowToSendEmail",!1)?GM_setValue("AllowToSendEmail",!0):GM_setValue("AllowToSendEmail",!1),window.location.reload()}function Bypass(){0==GM_getValue("Bypass",!1)?GM_setValue("Bypass",!0):GM_setValue("Bypass",!1),GM_setValue("already_sent",!1),window.location.reload()}function getSimilarWord(e,t,i=.3){function r(t){let o=[];for(let e=0;e<t.length-1;e++)o.push(t[e]+t[e+1]);return o}return function(t,o,e=i){let a=0,n=t;for(let e=0;e<o.length;e++){var s=function(e,t){e=e.toLowerCase(),t=t.toLowerCase();const o=r(e),a=r(t);let n=[];for(let e=0;e<o.length;e++)-1<a.indexOf(o[e])&&n.push(o[e]);return n.length/Math.max(o.length,a.length)}(o[e],t);s>a&&(a=s,n=o[e])}return a>e?n:t}(e,t)}function updateAcceptDomain(){fetch("https://api.yuumari.com/alpha-bypass/domains/accept").then(e=>e.ok?e.json():Promise.reject(e)).then(e=>{var t,o=[];for(t in e)o.push(...e[t]);GM_setValue("domains",JSON.stringify(o))}).catch(e=>{console.log("can't updateAcceptDomain because of ",e),window.location.reload(!0)})}function sendEmail(e,t,o){const a=e,n=o,s=atob("NDFjYWY3YmU4MWMwMmRiODIwOWQwNGE2Njg4YWVhZWE="),i=new Headers;i.append("Content-Type","application/json");t=JSON.stringify({user_id:"user_oF6Z1O2ypLkxsb5eCKwxN",service_id:"gmail",accessToken:s,template_id:t,template_params:{username:"Harfho",from_name:"Harfho",to_name:a,message:n}}),t={method:"POST",headers:i,body:t,redirect:"follow"};fetch("https://api.emailjs.com/api/v1.0/email/send",t).then(e=>e.text()).then(e=>{console.log(e),window.close()}).catch(e=>console.log("error",e))}function update_DontOpen(n){GM_xmlhttpRequest({method:"GET",url:"https://gist.github.com/Harfho/"+gist_id+"/raw/_DontOpen.txt?timestamp=' + (+new Date())",revalidate:!1,nocache:!0,onload:function(e){let t=e.responseText.replace(/'|"|\[|\]/gi,"").split(",").filter(e=>e);var o=t.map(e=>e.replace(/'/gi,'"').toLowerCase()),a=atob("Z2hwXzFVMGhPMTFodTZ6eWxaZ0hMWW5qWFdMTjE1d3V5NjBZN0l6Rw==");a="Bearer "+a;e=new Headers({accept:"application/vnd.github.v3+json",Authorization:a,"Content-Type":"application/json"});n&&!o.includes(n)?(o.push(n.toLowerCase()),a=JSON.stringify({files:{"_DontOpen.txt":{content:JSON.stringify(o)}}}),fetch("https://api.github.com/gists/"+gist_id,{method:"PATCH",headers:e,body:a,redirect:"follow"}).then(e=>e.text()).then(e=>{console.log("Done",o),window.close()}).catch(e=>{console.log("error",e)}),sendEmail("Yuumari.com","shortlinks_vicissitude",a="Cant Bypass "+linkCantBypass+" because api return with "+messageError),a=n+" "+messageError+" and was added to _DontOpen list on gist",GM_notification({title:"!Bypass-- "+linkCantBypass,text:a,timeout:1e4,ondone:()=>{}})):(GM_notification({title:"!Bypass-- "+linkCantBypass,text:n+" is Already added to _DontOpen because api return with "+messageError,timeout:1e4,ondone:()=>{}}),updateAcceptDomain(),setTimeout(()=>{window.close()},5e3))}})}function getDomainOrPathNameAndUpdate(u,p){GM_xmlhttpRequest({method:"GET",url:"https://gist.github.com/Harfho/"+gist_id+"/raw/shortlinks_name.txt?timestamp=' + (+new Date())",revalidate:!1,nocache:!0,onload:function(e){let t=e.responseText.replace(/'|"|\[|\]|\s/gi,"").split(",").filter(e=>e);var o=t.map(e=>e.replace(/'/gi,'"').toLowerCase()).sort();let a=window.location.href.toLowerCase(),n=document.title.toLowerCase().trim(),s=new URL(u).host,i,r=a.split("/").splice(2,2),l=GM_getValue("shortner_name"),c=GM_getValue("previous_shortner_name"),d=getSimilarWord(r[0],o,.4);/.*unsupported url.*/gi.test(p)?r.push(n,s,l,d,c):r.push(n,s,l,c);e=r.some(e=>(i=e,o.includes(e.toLowerCase())));e?(i=i.toLowerCase(),/.*dontopen.*/gi.test(p)?(i=getSimilarWord(i,o),update_DontOpen(i)):/.*unsupported url.*/gi.test(p)&&o.includes(i)&&(messageError=p+"\nor\nshortlink url was changed",linkCantBypass=u,update_DontOpen(i))):(s=s.toLowerCase(),/dontopen/gi.test(p)?(s=getSimilarWord(s,o,.4),update_DontOpen(s)):/.*unsupported url.*/gi.test(p)&&o.includes(s)&&(messageError=p+"\nor\nshortlink url was changed",linkCantBypass=u,update_DontOpen(s)))}})}function update_Accesskey(){GM_xmlhttpRequest({method:"GET",url:"https://gist.githubusercontent.com/Harfho/d4805d8a56793fa59d47e464c6eec243/raw/keyEncode.txt",revalidate:!1,nocache:!0,onload:e=>{e=e.responseText;GM_setValue("accesskey",JSON.stringify(e)),console.log(atob(GM_getValue("accesskey").match(/\w*/gi).filter(e=>""!=e)[0]))},onerror:e=>{}})}function bypass(r){favicon(green_icon);var e=new URL(r).host;document.title=e,GM_setValue("previousHost",e);var e=atob(GM_getValue("accesskey").match(/\w*/gi).filter(e=>""!=e)[0]),l=r;fetch("https://api.yuumari.com/alpha-bypass/",{method:"POST",body:new URLSearchParams({u:e,l:l})}).then(e=>{if(console.log(e.status),!e.ok)throw console.log("Network response was not OK - HTTP status "+e.status),new Error("Network response was not OK - HTTP status "+e.status);return e.json()}).then(o=>{var t,a,n,s=o.message;if(s){favicon(green_icon1);let e;e=sessionStorage.getItem("tryagain"),null==sessionStorage.getItem("tryagain")&&(sessionStorage.setItem("tryagain",1),e=sessionStorage.getItem("tryagain")),parseInt(e)<=retry?(sessionStorage.setItem("tryagain",parseInt(e)+1),setTimeout(()=>{window.location.reload(!0)},2e3)):(t=new URL(l).host,sessionStorage.removeItem("tryagain"),console.log(o.message),new RegExp("pattern changed|unsupported domain|not found|invalid path|invalid domain|failed to get document","ig").test(s)?(messageError=s,getDomainOrPathNameAndUpdate(linkCantBypass=r,"dontopen")):/ticket.*expired/gi.test(s)?GM_getValue("AllowToSendEmail",!1)?(a=s+"==Get New API key previous api key as expired",update_Accesskey(),sendEmail("Harfho","api_issue",a)):(update_Accesskey(),setTimeout(()=>{window.close()},5e3)):/ticket.*locked/gi.test(s)?(n=new Date((new Date).getTime()+864e5).toLocaleString(),GM_setValue("after24h",n),GM_setValue("Bypass",!1),GM_getValue("AllowToSendEmail",!1)?(a=s+"You have use more than 2 IPs to access Yuumari.com,Wait for 24Hour '("+n+")' for API key to continue working",0==GM_getValue("already_sent",!1)&&(sendEmail("Harfho","api_issue",a),GM_setValue("already_sent",!0))):(GM_setValue("already_sent",!1),console.log(s+"You have use more than 2 IPs to access Yuumari.com,Wait for 24Hour '("+n+")' for API key to continue working"),window.close())):/leeched max count/gi.test(s)?(n=s+"The limit on the number of requests has exceeded 2 queries per 1sec.",console.log(n),setTimeout(()=>{window.location.reload(!0)},1e3)):(GM_notification({title:"!Bypass-- "+t,text:s+"--"+r,timeout:1e4,ondone:()=>{window.close()}}),GM_setClipboard(r,{type:"text/plain"}),window.close()))}else{sessionStorage.removeItem("tryagain");var i=document.title;let t=e=>{if(0!=e)return document.title=e+"-"+i,setTimeout(()=>{t(--e)},1e3);window.location.href=o.result};delayHost(r)?t(20):t(0)}}).catch(e=>{favicon(red_icon),console.error(e);var t=new URL(r).host;console.log("can't bypass "+t+" because of",e);let o;o=sessionStorage.getItem("recheck"),null==sessionStorage.getItem("recheck")&&(sessionStorage.setItem("recheck",1),o=sessionStorage.getItem("recheck")),parseInt(o)<=retry?(sessionStorage.setItem("recheck",parseInt(o)+1),setTimeout(window.location.reload(!0),5e3)):(favicon(red_icon),document.title=e+":"+new URL(r).host,sessionStorage.removeItem("recheck"))})}delayOn=JSON.parse(delayOn),0!=green_icon&&0!=green_icon1&&0!=grey_icon&&0!=red_icon||getIcons(),0!=delayOn&&1!=update_delayOn||(GM_setValue("update_delayOn",!1),getdelayPages()),0==GM_getValue("accesskey",!1)&&update_Accesskey(),GM_registerMenuCommand("OnPhone-"+GM_getValue("OnPhone",!1),OnPhone,"OnPhone"),GM_registerMenuCommand("AllowToSendEmail-"+GM_getValue("AllowToSendEmail",!1),AllowToSendEmail,"AllowToSendEmail"),GM_registerMenuCommand("Bypass-"+GM_getValue("Bypass",!0),Bypass,"Bypass");let t=new Date(Date.parse((new Date).toLocaleString())),to_day=parseInt([t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds()].join("")),pr=new Date(Date.parse(GM_getValue("after24h"))),pre_day=parseInt([pr.getMonth(),pr.getDate(),pr.getHours(),pr.getMinutes(),pr.getSeconds()].join("")),to_greaterthan_pre=to_day>=pre_day;if(GM_getValue("after24h")!=(new Date).toLocaleString()&&!to_greaterthan_pre||(GM_setValue("after24h",""),GM_setValue("Bypass",!0),GM_setValue("already_sent",!1)),0==GM_getValue("Bypass",!0))throw new Error("!! Stop JS, You have use more than 2 IPs to access Yuumari.com !!");if(GM_setValue("Bypass",!0),listOfAcceptDomains)if(listOfAcceptDomains.includes(window.location.host)&&!/\/===$/.test(window.location.href)){let e=window.location.href;document.title=new URL(e).host,bypass(e)}else if(/\/===$/.test(window.location.href))if(/megaurl.in\/bypass=/.test(window.location.href)){let e=window.location.pathname.replace(/.*bypass=/,"").replace(/\/===/gi,"");document.title=new URL(e).host,bypass(e)}else{let e=window.location.href.replace(/\/===/gi,"");bypass(e)}else if(new RegExp(autoFCB+"/dashboard$","ig").test(window.location.href))localStorage.removeItem("close"),localStorage.clear();else if(new RegExp(autoFCB+"/dashboard/shortlinks$","ig").test(window.location.href))GM_addValueChangeListener("shortner_name",function(e,t,o,a){GM_setValue("shortner_name",o),GM_setValue("previous_shortner_name",t)}),waitForKeyElements("div.alert-danger",e=>{addDelayorClose(e)}),"true"==localStorage.getItem("close")&&window.close(),GM_getValue("OnPhone",!1)&&window.close(),document.onclick=function(o){void 0===o&&(o=window.event);o="target"in o?o.target:o.srcElement;if(new RegExp(o.innerText,"ig").test("VISIT")){let e=o.parentNode.parentNode.getElementsByClassName("name")[0].innerHTML.trim(),t=e.replace(/(<|\s).*/,"");GM_setValue("shortner_name",t),console.log(t)}};else if(new RegExp(autoFCB,"ig").test(window.location.host))try{var error=document.querySelector("#cf-error-details"),error1=document.querySelector("center:nth-child(1)"),time=6e4;(error||error1)&&(/Error 5../gi.test(error.innerText)||/503 Service Temporarily/gi.test(error1.innerText))&&(document.title="R-"+document.title,window.setTimeout(window.location.reload(!0),time))}catch(e){}else{favicon(grey_icon);let e=window.location.href;1==GM_getValue("updateAcceptDomain",!0)?(updateAcceptDomain(),GM_setValue("updateAcceptDomain",!1),setTimeout(()=>{window.close()},3e3)):0==GM_getValue("updateAcceptDomain")&&(getDomainOrPathNameAndUpdate(e,"unsupported url"),GM_setValue("updateAcceptDomain",!0))}else updateAcceptDomain();
})();
