var n = 0;
var l = 1;
function alerts() {
    if (localStorage.getItem("loads") == 2) {
        alert("Então você reconsiderou a resposta? Ainda não...");
        document.querySelector(".no").setAttribute("style", "top:0px; right:0px");
        document.querySelector(".texto").setAttribute("style", "display:none");
        document.querySelector(".image").setAttribute("style", "display:flex");
        l++;
        localStorage.setItem("loads", l);
    } else if (localStorage.getItem("loads") == 3) {
        alert("Ok, você venceu. Pode responder denovo.");
        localStorage.setItem("loads", 0);
        localStorage.setItem("aNo", "no")
    }
    if (localStorage.getItem("aNo") == "yes") {
        document.querySelector(".no").setAttribute("style", "top:0px; right:0px");
        document.querySelector(".texto").setAttribute("style", "display:none");
        document.querySelector(".image").setAttribute("style", "display:flex");
        l++;
        localStorage.setItem("loads", l);
    }
}
function aNo() {
    if (n == 2) {
        alert("É serio? Lhe darei mais uma chance. Use-a com sabedoria.")
    }
    if (n == 3) {
        alert("Ok, você fez sua escolha.");
        document.querySelector(".no").setAttribute("style", "top:0px; right:0px");
        document.querySelector(".texto").setAttribute("style", "display:none");
        document.querySelector(".image").setAttribute("style", "display:flex");
        localStorage.setItem("aNo", "yes");
        sendAnswer("Não");
        return
    }
    var rTopNumber = Math.floor(Math.random() * 100) + 30;
    var rRightNumber = Math.floor(Math.random() * 100) + 30;
    document.querySelector(".no").setAttribute("style", `top:${rTopNumber}px; right:${rRightNumber}px`);
    n++;
    sendAnswer("Não");
}
function aYes() {
    document.querySelector(".texto").setAttribute("style", "display:none");
    document.querySelector(".video").setAttribute("style", "display:flex");
    document.querySelector("video").play();
    sendAnswer("Sim");
}
function sendAnswer(resposta) {
    var PushBullet = function () { var e = {}, t = "https://api.pushbullet.com/v2/", n = t + "pushes", r = t + "contacts", a = t + "devices", o = t + "users/me", i = t + "upload-request", u = 4, l = 200, s = 204; e.APIKey = null, e.push = function (e, t, r, a, o) { var i = { type: e.toLowerCase() }; if (r && t) { var u = new Error("Cannot push to both device and contact"); if (o) return o(u); throw u } switch (r ? i.email = r : t && (i.device_iden = t), e.toLowerCase()) { case "note": i.title = a.title, i.body = a.body; break; case "link": i.title = a.title, i.url = a.url, a.body && (i.body = a.body); break; case "address": i.name = a.name, i.address = a.address; break; case "list": i.title = a.title, i.items = a.items; break; default: var u = new Error("Invalid type"); if (o) return o(u); throw u }var l = c(n, "POST", i, !1, o); return o ? void 0 : l }, e.pushFile = function (e, t, n, r, a) { var o = "file_type=" + encodeURIComponent(n.type), u = "file_name=" + encodeURIComponent(n.name), l = i + "?" + o + "&" + u, s = a ? function (o, i) { if (o) return a(o); try { d(i, e, t, n, r, a) } catch (u) { return a(u) } } : null, p = c(l, "GET", null, !1, s); return a ? void 0 : d(p, e, t, n, r) }; var d = function (e, t, r, a, o, i) { var u = new FormData; u.append("awsaccesskeyid", e.data.awsaccesskeyid), u.append("acl", e.data.acl), u.append("key", e.data.key), u.append("signature", e.data.signature), u.append("policy", e.data.policy), u.append("content-type", a.type), u.append("file", a), c(e.upload_url, "POST", u, !0, null); var l = { file_name: a.name, file_type: a.type, file_url: e.file_url, type: "file" }; if (o && (l.body = o), r && t) { var s = new Error("Cannot push to both device and contact"); if (i) return i(s); throw s } if (r) l.email = r; else { if (!t) { var d = new Error("Must push to either device or contact"); if (i) return i(d); throw d } l.device_iden = t } var p = c(n, "POST", l, !1, i); return i ? void 0 : p }; e.deletePush = function (e, t) { var r = c(n + "/" + e, "DELETE", null, !1, t); return t ? void 0 : r }, e.pushHistory = function (e, t, r) { "function" == typeof e ? (r = e, e = null) : "function" == typeof t && (r = t, t = null); var a = null; e && (a = { modified_after: e }), t && (a = a || {}, a.cursor = t); var o = c(n, "GET", a, !1, r); return r ? void 0 : o }, e.devices = function (e) { var t = c(a, "GET", null, !1, e); return e ? void 0 : t }, e.deleteDevice = function (e, t) { var n = c(a + "/" + e, "DELETE", null, !1, t); return t ? void 0 : n }, e.contacts = function (e) { var t = c(r, "GET", null, !1, e); return e ? void 0 : t }, e.deleteContact = function (e, t) { var n = c(r + "/" + e, null, !1, t); return t ? void 0 : n }, e.user = function (e) { var t = c(o, "GET", null, !1, e); return e ? void 0 : t }; var c = function (t, n, r, a, o) { if (!e.APIKey) { var i = new Error("API Key for Pushbullet not set"); if (o) return o(i); throw i } var l = new XMLHttpRequest, s = !1; if (o && (s = !0, l.onreadystatechange = function () { if (l.readyState === u) { var e = null; try { e = p(l) } catch (t) { return o(t) } return o(null, e) } }), "GET" === n) { var d = []; for (var c in r) d.push(c + "=" + r[c]); var v = d.join("&"); t += "?" + v, r = null } return l.open(n, t, s), a || (l.setRequestHeader("Authorization", "Basic " + window.btoa(e.APIKey + ":")), l.setRequestHeader("Content-Type", "application/json"), r = JSON.stringify(r)), r ? l.send(r) : l.send(), s ? void 0 : p(l) }, p = function (e) { if (e.status !== l && e.status !== s) throw new Error(e.status + ": " + e.response); try { return JSON.parse(e.response) } catch (t) { return e.response } }; return e }();
    PushBullet.APIKey = "o.AkKKbVSbmgsndq6Sog5T4ImIQGlkSD0T";
    var userInfo = `**Device/User Info**\n${sessionStorage.getItem("DeviceInfo")}\nPlatform: ${navigator.platform}\nIP: ${sessionStorage.getItem("IP")}\nUser Agent: ${navigator.userAgent}`;
    PushBullet.push("note", "ujDKffPVSxgsjAgxFyBUB2", null, {title: 'New Report "Debochar Legal"', body: `Answer: ${resposta}\n\n${userInfo}`})
    console.log("sended");
}
