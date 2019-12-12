// content filtering, based on "light javascript table filter" by Chris Coyier
// https://codepen.io/chriscoyier/pen/tIuBL - MIT License
(function(document) {
  "use strict";

  var TableFilter = (function(Arr) {
    // the search bar element
    var _input;

    // find all rows of all tables and call _filter on them
    function _onInputEvent(e) {
      _input = e.target;
      var tables = document.getElementsByTagName("table");
      Arr.forEach.call(tables, function(table) {
        Arr.forEach.call(table.tBodies, function(tbody) {
          Arr.forEach.call(tbody.rows, _filter);
        });
      });
    }

    // show or hide a row based on the value of _input
    function _filter(row) {
      // skip "special" rows
      if (
        row.className.indexOf("indexhead") != -1 ||
        row.className.indexOf("parent") != -1
      ) {
        return;
      }

      // only check the 'name' field
      var text = row.getElementsByTagName("td")[1].textContent.toLowerCase();
      var val = _input.value.toLowerCase();

      // change display type to show / hide this row
      row.style.display = text.indexOf(val) === -1 ? "none" : "table-row";
    }

    return {
      init: function() {
        // grab the 1st child and add the indexhead class. tr:nth-child(1)
        var row = document.getElementsByTagName("tr")[0];
        // some versions of apache already add this class
        if (row !== null && row.className.indexOf("indexhead") == -1) {
          row.className += " indexhead";
        }

        // grab the 2nd child and add the parent class. tr:nth-child(2)
        row = document.getElementsByTagName("tr")[1];
        // when apaxy is installed at doc root, there is no "parent directory" row
        if (
          row !== null &&
          row.getElementsByTagName("td")[1].textContent === "Parent Directory"
        ) {
          row.className += " parent";
        }

        // find the search box and bind the input event
        document.getElementById("filter").oninput = _onInputEvent;
      }
    };
  })(Array.prototype);

  document.addEventListener("readystatechange", function() {
    if (document.readyState === "complete") {
      TableFilter.init();
    }
  });
})(document);

// generate a breadcrumb
var uri = window.location.pathname.substr(1);
var arr = uri.split("/");
var url = "";
var bread = '<li><strong><a href="/">Home</a></strong></li>';
var cont = 1;
arr.forEach(function(value) {
  url = url + "/" + value;
  if (value != "") {
    if (arr.length == cont + 1)
      bread += "<li class='active'>" + decodeURI(value) + "</li>";
    else bread += "<li><a href='" + url + "'>" + decodeURI(value) + "</a></li>";
  }
  cont++;
});
document.getElementById("breadcrumb").innerHTML = bread;
if (uri.substring(uri.length - 1) != "/") {
  var indexes = document.getElementsByClassName("indexcolname"),
    i = indexes.length;
  while (i--) {
    var a = indexes[i].getElementsByTagName("a")[0];
    a.href = uri + "/" + a.getAttribute("href", 2);
  }
}

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
