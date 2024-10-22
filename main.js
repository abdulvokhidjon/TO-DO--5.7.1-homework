(() => {
  "use strict";
  function e() {
    const e = localStorage.getItem("todo.todo-items");
    return null === e
      ? [
          { title: "Complete online JavaScript course", isFinished: !0 },
          { title: "Jog around the park 2x", isFinished: !1 },
          { title: "10 minutes meditation", isFinished: !1 },
          { title: "Read for 1 hour", isFinished: !1 },
          { title: "Pick up groceries", isFinished: !1 },
          { title: "Complete Todo App on Frontend Mentor", isFinished: !1 },
        ]
      : "[]" === e
      ? []
      : JSON.parse(e);
  }
  function t(e) {
    localStorage.setItem("todo.todo-items", JSON.stringify(e));
  }
  function o(o, c) {
    const l = document.createElement("li");
    l.classList.add("todo-list__item");
    const s = (function () {
      const e = document.querySelectorAll("label");
      if (0 === e.length) return 1;
      const t = [...e].map((e) => {
        const t = e.attributes[0].nodeValue;
        return parseInt(t.replace("item", ""));
      });
      return (
        t.sort(function (e, t) {
          return e - t;
        }),
        t.pop() + 1
      );
    })();
    (l.innerHTML = `\n                <input id="item${s}" type="checkbox" class="item__checker">\n                <label for="item${s}">${o}</label>\n                <button class="item__remove" aria-label="Click to clear this todo"></button>\n                `),
      !0 === c && (l.querySelector("input").checked = "True"),
      (function (e) {
        const t = document.querySelector(".main__todo-list"),
          o = t.querySelector("[class$=action]");
        t.insertBefore(e, o);
      })(l),
      l.querySelector(".item__remove").addEventListener("click", (e) => {
        const t = e.target.parentNode;
        e.target.classList.add("item__remove--active"), i(t);
      }),
      l.querySelector("input").addEventListener("click", (o) => {
        n(o.target, o.target.parentElement),
          (function (o, i) {
            const n = e();
            n.forEach((e) => {
              e.title === o && (e.isFinished = i);
            }),
              t(n);
          })(o.target.nextElementSibling.textContent, o.target.checked),
          setTimeout(() => {
            r(document.querySelector(".filter__btn--active").outerText);
          }, "750");
      });
  }
  function i(o) {
    setTimeout(() => {
      o.classList.add("todo-list__item--hidden"),
        (function (o) {
          const i = e();
          i.forEach((e, t) => {
            e.title === o && i.splice(t, 1);
          }),
            t(i);
        })(o.children[1].textContent),
        setTimeout(() => {
          o.remove(), c();
        }, "700");
    }, "550");
  }
  function n(e, t) {
    e.checked
      ? t.classList.add("todo-list__item--completed")
      : t.classList.remove("todo-list__item--completed");
  }
  function r(e) {
    const t = document.querySelectorAll(
        ".todo-list__item:not(.todo-list__item--completed)"
      ),
      o = document.querySelectorAll(".todo-list__item--completed"),
      i = document.querySelectorAll(".todo-list__item");
    i.forEach((e) => {
      e.classList.add("todo-list__item--hidden");
    }),
      ("All" === e ? i : "Active" === e ? t : o).forEach((e) => {
        e.classList.remove("todo-list__item--hidden");
      }),
      c();
  }
  function c() {
    document.querySelector(".count__displayer").textContent =
      document.querySelectorAll(
        ".todo-list__item:not(.todo-list__item--completed)"
      ).length;
  }
  function l() {
    return null === localStorage.getItem("todo.theme")
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : localStorage.getItem("todo.theme");
  }
  function s(e) {
    document.querySelector(":root").setAttribute("color-scheme", e);
  }
  var d;
  document.querySelector("form").addEventListener("submit", (i) => {
    i.preventDefault();
    const n = i.target[0].value;
    "" !== n &&
      ((i.target[0].value = ""),
      o(n, !1),
      (function (o) {
        const i = e();
        i.push(o), t(i);
      })({ title: n, isFinished: !1 }));
  }),
    window.addEventListener("DOMContentLoaded", () => {
      s(l());
    }),
    (d = l()),
    document
      .querySelector(".header__theme-toggle")
      .addEventListener("click", (e) => {
        let t;
        "dark" === d
          ? ((d = "light"),
            e.target.setAttribute("aria-label", d),
            (t = document.querySelector(".header__switch--on")))
          : ((d = "dark"),
            e.target.setAttribute("aria-label", d),
            (t = document.querySelector(".header__switch--off"))),
          (t.currentTime = 0),
          t.play(),
          localStorage.setItem("todo.theme", `${d}`),
          s(d);
      }),
    e().forEach((e) => o(e.title, e.isFinished)),
    document.querySelectorAll("[type=checkbox").forEach((e) => {
      n(e, e.parentElement);
    }),
    (function () {
      const e = document.querySelectorAll(".filter__btn");
      e.forEach((t) =>
        t.addEventListener("click", (t) => {
          const o = t.target.outerText;
          e.forEach((e) => e.classList.remove("filter__btn--active")),
            t.target.classList.add("filter__btn--active"),
            r(o);
        })
      ),
        c(),
        document
          .querySelector(".clear-completed-todo__btn")
          .addEventListener("click", (e) => {
            document
              .querySelectorAll(".todo-list__item--completed")
              .forEach((e) => i(e));
          });
    })();
})();
