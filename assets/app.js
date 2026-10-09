(function(){
'use strict';
var button=document.getElementById('launch'), message=document.getElementById('message'), frame=document.getElementById('runner-frame');
var m=/PlayStation\s+4[\/ ](\d+)\.(\d{1,2})(?!\d)/i.exec(navigator.userAgent||'');
var fw=m?parseInt(m[1],10)+'.'+(m[2].length===1?'0':'')+m[2]:null;
var supported=['9.00','9.03','9.04','9.50','9.51','9.60','10.00','10.01','10.50','10.70','10.71','11.00','11.02','11.50','11.52','12.00','12.02','12.50','12.52','13.00','13.02','13.04','13.50','13.52'].indexOf(fw)!==-1;
var ac=window.applicationCache, ready=false, running=false;
function say(t){message.textContent=t;}
function available(t){ready=true;say(supported?t+' · اضغط X للتشغيل':t+' · افتح الموقع من PS4 بإصدار مدرج');}
function start(){
 if(running||!supported||!ready)return;
 running=true;document.body.className='running';document.getElementById('runner').hidden=false;
 say('جارٍ التشغيل… تابع نتيجة الأداة. لا تضغط مرة ثانية.');
 frame.src='host/index.html';frame.focus();
}
button.addEventListener('click',start);
document.addEventListener('keydown',function(e){if(e.keyCode===13||e.keyCode===32){e.preventDefault();start();}});
button.focus();
if(!ac){available('الحفظ الأوفلاين غير متاح بهذا المتصفح');return;}
ac.addEventListener('checking',function(){if(!ready)say('جارٍ فحص الملفات المحفوظة…');});
ac.addEventListener('downloading',function(){if(!running)say('جارٍ حفظ الموقع للأوفلاين… أبقِ الإنترنت متصلًا');});
ac.addEventListener('progress',function(e){if(!running&&e.total)say('حفظ ملفات الأوفلاين: '+Math.round(e.loaded/e.total*100)+'%');});
ac.addEventListener('cached',function(){available('اكتمل حفظ الموقع للأوفلاين');});
ac.addEventListener('noupdate',function(){available('الملفات محفوظة للأوفلاين');});
ac.addEventListener('updateready',function(){say('اكتمل تحديث الملفات — أعد فتح الصفحة لتطبيق التحديث');});
ac.addEventListener('error',function(){if(ac.status===1)available('النسخة المحفوظة جاهزة');else available('لم يكتمل الحفظ — التشغيل يحتاج الإنترنت');});
ac.addEventListener('obsolete',function(){ready=false;say('الحفظ غير متاح — اتصل بالإنترنت وأعد تحميل الصفحة');});
if(ac.status===1)available('الملفات محفوظة للأوفلاين');
if(ac.status===4)say('تحديث محفوظ — أعد فتح الصفحة لتطبيقه');
})();