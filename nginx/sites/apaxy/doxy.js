var doxy = (function() {
    var e,
      t,
      n = [],
      r = -1,
      a = 1,
      i = [],
      l = function() {
        var a = o("pre")[0] || o("ul")[0],
          l = a.innerHTML,
          p = -1 !== l.toLowerCase().indexOf("<hr>"),
          f = p
            ? a.innerHTML.split(/<hr>/i)
            : a.innerHTML.replace(/<[\/]{0,1}(li|LI)[^><]*>/g, ""),
          v = p ? f[1].split("\n") : f.split("\n"),
          g = s();
        o("h1")[0].innerHTML = u();
        var m = ["<table>"];
        if (p) {
          var w = f[0].match(/<a [^>]+>([^<]+)<\/a>/gi);
          for (var y in w)
            w[y] = w[y]
              .toString()
              .replace(
                />$/,
                g.C === ["N", "M", "S"][y]
                  ? "D" === g.O
                    ? "> &#8673;"
                    : "> &#8675;"
                  : ">"
              );
          (w =
            "<th>" +
            w[0] +
            "</th><th>" +
            w[1] +
            '</th><th class="last">' +
            w[2] +
            "</th>"),
            m.push('<thead class="head"><tr>' + w + "</tr></thead>");
        }
        m.push("<tbody>");
        for (var L = v.length - 1, b = 0; L > b; b++) {
          var C = h(v[b]),
            M = C.match(/<a [^>]+>([^<]+)<\/a>/i),
            T = h(C.slice(M[0].length)).split(/  +/g);
          if ((T.unshift(M[0]), T && T[0])) {
            var H = M[1],
              x =
                '/"' === M[0].match(/href="([^"]*")/g)[0].slice(-2)
                  ? " dir"
                  : "",
              E = [],
              S = " " + H.replace(/[^A-Z0-9]+/gi, "");
            (S = " ParentDirectory" === S ? S : ""),
              i.push(b),
              n.push(H.toLowerCase());
            for (var D = 0; 3 > D; D++)
              (T[D] = 0 === D && x ? c(T[D]) : T[D]),
                E.push(
                  '<td class="cell' +
                    (2 == D ? " last" : "") +
                    '">' +
                    (T[D] || "") +
                    "</td>"
                );
            m.push('<tr class="row' + x + S + '">' + E.join("") + "</tr>");
          }
        }
        m.push("</tbody></table>"), (a.innerHTML = "");
        var k = m.join("");
        (o("#contents").innerHTML = k),
          (e = o("#search")),
          (t = o(".row")),
          (document.onkeydown = function(n) {
            n = n || window.event;
            var a = n.keyCode || n.which,
              l = o(".row.active")[0];
            l && (l.className = l.className.replace(" active", "")),
              (40 === a || 38 === a) &&
                ((r += 40 === a ? 1 : -1),
                (r = r > i.length - 1 ? i.length - 1 : r),
                (r = 0 > r ? 0 : r),
                (t[i[r]].className += " active"),
                e.blur(),
                n.preventDefault ? n.preventDefault() : (n.returnValue = !1)),
              13 === a &&
                -1 !== r &&
                ((document.location = t[
                  i[r]
                ].firstChild.firstChild.getAttribute("href")),
                n.preventDefault ? n.preventDefault() : (n.returnValue = !1));
          }),
          e.addEventListener
            ? e.addEventListener("input", d)
            : e.attachEvent("onkeyup", d),
          ie7 &&
            ((e.placeholder = "Filter"),
            (e.onfocus = function() {
              this.value == this.placeholder &&
                ((this.value = ""), (e.style.cssText = ""));
            }),
            (e.onblur = function() {
              0 == this.value.length &&
                ((this.value = this.placeholder),
                (e.style.cssText = "color:#CCC"));
            }),
            e.onblur());
      },
      o = function(e) {
        return "#" === e.charAt(0)
          ? document.getElementById(e.slice(1))
          : document.querySelectorAll(e);
      },
      c = function(e) {
        var t = document.createElement("div");
        t.innerHTML = e;
        var n = t.children[0],
          r = n.innerHTML,
          a = "&gt;" === r.substr(-4, 4);
        return (
          a && (r = r.slice(0, -3)),
          "Parent Directory" !== r && (r = r.slice(0, -1)),
          (n.innerHTML = "<i></i>" + r),
          t.innerHTML
        );
      },
      s = function() {
        var e = {};
        window.location.href.replace(/[?;]+([^=;]+)=([^;]*)/gi, function(
          t,
          n,
          r
        ) {
          e[n] = r;
        });
        return e;
      },
      u = function() {
        var e = window.location,
          t = "/" === e.pathname ? e.host : e.pathname,
          n = t.split("/").length - 3;
        if (-2 === n) return (a = 0), t;
        var r,
          i = 0;
        return (r = new RegExp("^(.*?://[^/]+?/)([^?#:@]*)", "").exec(e.href))
          ? '<a href="http://' +
              e.host +
              '">&bull;</a>/' +
              r[2].replace(
                new RegExp("([^/]+)(?:\\.[^\\.]+$|/)", "g"),
                function(e, t, a, l) {
                  return i === n
                    ? (n > 0 ? "/" : "") +
                        "<span>" +
                        decodeURIComponent(t) +
                        "</span>"
                    : (i++,
                      (a > 0 ? "/" : "") +
                        '<a href="' +
                        r[1] +
                        l.substring(0, a) +
                        e +
                        '">' +
                        decodeURIComponent(t) +
                        "</a>");
                }
              )
          : "";
      },
      h = function(e) {
        return e.replace(/^\s+|\s+$/g, "");
      },
      d = function(l) {
        var o = h(e.value.toLowerCase());
        (r = -1), (i = []);
        for (var c = a; c < n.length; c++) {
          var s = n[c].indexOf(o),
            u = -1 !== s;
          u && i.push(c),
            (t[c].style.display = u
              ? ie7
                ? "inline-block"
                : "table-row"
              : "none");
        }
      };
    return { init: l, search: d };
  })(),
  ie7 = /(MSIE\ [0-7]\.\d+)/.test(navigator.userAgent);
!(function(e, t) {
  ie7 &&
    ((e = document),
    (t = e.createStyleSheet()),
    (e.querySelectorAll = function(n, r, a, i, l) {
      for (
        l = e.all,
          r = [],
          n = n.replace(/\[for\b/gi, "[htmlFor").split(","),
          a = n.length;
        a--;

      ) {
        for (t.addRule(n[a], "k:v"), i = l.length; i--; )
          l[i].currentStyle.k && r.push(l[i]);
        t.removeRule(0);
      }
      return r.reverse();
    }));
})(),
  (window.onload = doxy.init);
