(this["webpackJsonpto-do-app"]=this["webpackJsonpto-do-app"]||[]).push([[0],{25:function(t,n,e){},27:function(t,n,e){},45:function(t,n,e){"use strict";e.r(n);var o=e(0),c=e(2),r=e.n(c),a=e(17),i=e.n(a),u=(e(25),e(8)),s=e.n(u),l=e(18),d=e(6),f=e(3),b=(e(27),e(19)),h=e.n(b).a.create({baseURL:"https://todo-app-rs.herokuapp.com/todos"}),j=function(t){var n=t.content,e=t.id,c=t.isDone,r=t.markComplete,a=t.deleteTodo,i=t.todos,u=t.setTodos;return Object(o.jsxs)("div",{className:"entry todo-list__entry",children:[Object(o.jsx)("input",{type:"checkbox",className:"checkbox entry__checkbox",id:e,name:n,checked:c,onChange:function(){return r(e,c)}}),Object(o.jsx)("input",{type:"text",className:"label entry__label",value:n,style:{textDecoration:!0===c?"line-through":""},onChange:function(t){return function(t,n){var e=Object(f.a)(i),o=t;e.forEach((function(t){t.id===n&&(t.content=o),h.put("/".concat(n),{content:t.content}).then((function(t){return console.log(t)})).catch((function(t){return console.error(t)}))})),u(e)}(t.target.value,e)}}),Object(o.jsx)("button",{onClick:function(){return a(e)},className:"button entry__button",children:"x"})]},e)},p=function(t){var n=Object(c.useState)(""),e=Object(d.a)(n,2),r=e[0],a=e[1];return Object(o.jsxs)("form",{onSubmit:function(n){n.preventDefault(),r&&(h.post("",{content:r.toString(),isDone:!1}).then((function(n){t.addTodo(n.data),console.log("POST RESPONSE",n)})).catch((function(t){console.log("POST ERROR",t)})),a(""))},children:[Object(o.jsx)("button",{type:"button",className:"button todo-form__button",id:"chevron",onClick:t.allDone,children:">"}),Object(o.jsx)("input",{type:"text",className:"input todo-header__input",value:r,placeholder:"What needs to be done?",onChange:function(t){return a(t.target.value)}})]})};var O=function(){var t=Object(c.useState)([]),n=Object(d.a)(t,2),e=n[0],r=n[1];Object(c.useEffect)((function(){(function(){var t=Object(l.a)(s.a.mark((function t(){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,h();case 2:n=t.sent,r(n.data);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()().catch((function(t){return console.error(t)}))}),[]);var a=Object(c.useReducer)((function(t,n){switch(n.type){case"SHOW_ALL":return"ALL";case"SHOW_ACTIVE":return"ACTIVE";case"SHOW_COMPLETED":return"COMPLETED";case"CLEAR_COMPLETED":return"CLEAR";default:throw new Error}}),"ALL"),i=Object(d.a)(a,2),u=i[0],b=i[1],O=e.filter((function(t){return"ALL"===u||("ACTIVE"===u&&!t.isDone||(!("COMPLETED"!==u||!t.isDone)||!("CLEAR"!==u||!t.isDone)))}));return Object(o.jsxs)("div",{className:"App",children:[Object(o.jsx)("div",{className:"title todo-header__title",children:Object(o.jsx)("h1",{children:"todos"})}),Object(o.jsx)(p,{addTodo:function(t){var n=[].concat(Object(f.a)(e),[{id:t.id,content:t.content,isDone:t.isDone}]);r(n)},allDone:function(){var t=Object(f.a)(e);t.forEach((function(n){!0!==n.isDone&&h.put("/".concat(n.id),{isDone:"true"}).then((function(t){console.log("PUT",t.data)})).catch((function(t){return console.error(t)})),n.isDone=!0,r(t)}))}}),Object(o.jsx)("div",{className:"todo-list",children:O.map((function(t){return Object(o.jsx)(j,{id:t.id,content:t.content,editTodo:function(n){return function(t,n){var o=Object(f.a)(e);e.forEach((function(e){e.id===t&&(e.content=n,h.put("/".concat(t),{content:n.toString()}).then((function(t){console.log("edit todo",t.data)})).catch((function(t){console.error(t)}))),r(o)}))}(t.id)},isDone:t.isDone,markComplete:function(n){return function(t,n){var o=Object(f.a)(e);o.forEach((function(n){n.id===t&&!0!==n.isDone?h.put("/".concat(t),{isDone:"true"}).then((function(t){console.log("PUT",t.data),n.isDone=!0,r(o)})).catch((function(t){return console.error(t)})):n.id===t&&!1!==n.isDone&&h.put("/".concat(t),{isDone:"false"}).then((function(t){console.log("PUT",t.data),n.isDone=!1,r(o)})).catch((function(t){return console.error(t)}))}))}(t.id)},deleteTodo:function(n){return function(t){var n=[];e.forEach((function(e){e.id!==t?n.push(e):e.id===t&&h.delete("/".concat(t)).then((function(t){console.log("deletetodo",t.data),r(n)})).catch((function(t){console.error(t)}))}))}(t.id)},todos:e,setTodos:r},t.id)}))}),Object(o.jsxs)("div",{className:"todo-footer",children:[Object(o.jsxs)("label",{className:"label todo-footer__label",children:[function(){var t=0;return e.forEach((function(n){n.isDone||t++})),t}()," items left"]}),Object(o.jsx)("button",{type:"button",className:"button button-all todo-footer__button",onClick:function(){b({type:"SHOW_ALL"})},children:"All"}),Object(o.jsx)("button",{type:"button",className:"button button-active todo-footer__button",onClick:function(){b({type:"SHOW_ACTIVE"})},children:"Active"}),Object(o.jsx)("button",{type:"button",className:"button button-completed todo-footer__button",onClick:function(){b({type:"SHOW_COMPLETED"})},children:"Completed"}),function(){var t=0;return e.forEach((function(n){n.isDone&&t++})),0!==t}()?Object(o.jsx)("button",{type:"button",className:"button button-clear todo-footer__button",onClick:function(){var t=[];e.forEach((function(n){n.isDone?n.isDone&&h.delete("/".concat(n.id)).then((function(t){console.log("deletetodo",t.data)})).catch((function(t){console.error(t)})):t.push(n)})),r(t)},children:"Clear Completed"}):null]})]})},m=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,46)).then((function(n){var e=n.getCLS,o=n.getFID,c=n.getFCP,r=n.getLCP,a=n.getTTFB;e(t),o(t),c(t),r(t),a(t)}))};i.a.render(Object(o.jsx)(r.a.StrictMode,{children:Object(o.jsx)(O,{})}),document.getElementById("root")),m()}},[[45,1,2]]]);
//# sourceMappingURL=main.b2e627df.chunk.js.map