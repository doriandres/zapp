import { x, y, z } from "./zapp";

const Mirror = y(({ state, setState }) =>
  x("div", {
    children: [
      x("h2", { children: ["Mirror"] }),
      x("input", {
        props: {
          oninput() {
            setState({ text: this.value });
          }
        }
      }),
      x("div", { children: [() => state.text || ""] })
    ]
  })
);

const Counter = y(({ props, state, setState }) =>
  x("div", {
    children: [
      x("h2", { children: ["Counter"] }),
      () => `Value: ${state.counter || props.default}`,
      x("br"),
      x("button", {
        props: {
          $className: () => `flash ${state.counter || props.default}`,
          onclick() {
            setState({ counter: (state.counter || props.default) + 1 });
          }
        },
        children: ["Click me!"]
      })
    ]
  })
);

const ToDo = y(({ state, setState }) =>
  x("div", {
    children: [
      x("h2", { children: ["ToDo"] }),
      x("form", {
        props: {
          onsubmit(event) {
            event.preventDefault();
            this.reset();
            if (state.text) {
              setState({
                items: [...(state.items || []), state.text],
                text: ""
              });
            }
          }
        },
        children: [
          x("input", {
            props: {
              placeholder: "Add todo",
              oninput() {
                setState({ text: this.value });
              }
            }
          }),
          x("input", {
            props: {
              type: "submit",
              value: "Add"
            }
          })
        ]
      }),
      () =>
        !state.items || !state.items.length
          ? ""
          : x("ul", {
              children: state.items.map(item => x("li", { children: [item] }))
            })
    ]
  })
);

const App = y(() =>
  x("div", {
    children: [
      Mirror(),
      x("hr"),
      Counter({ props: { default: 5 } }),
      x("hr"),
      ToDo()
    ]
  })
);
z(document.getElementById("app"), App);
