export const z = (host, root) => host.appendChild(root()());
export const y = factory => (options = {}) => {
  let state = {};
  let constructor;
  let setState = newState => {
    Object.assign(state, newState);
    requestAnimationFrame(() => constructor());
  };
  return () => {
    constructor = factory({
      props: options.props,
      children: options.children,
      state,
      setState
    });
    return constructor();
  };
};
export const x = (name, options = {}) => {
  let node;
  return () => {
    let { props = {}, children = [] } = options;

    children = children.map(c => {
      const result = c instanceof Function ? c() : c;
      return result instanceof Function ? result() : result;
    });

    if (!node) {
      node = document.createElement(name);
    }

    Object.keys(props)
      .filter(name => name[0] === "$" && props[name] instanceof Function)
      .forEach(name => (props[name.substr(1)] = props[name]()));

    Object.assign(node, props);

    const existingChildren = Array.from(node.childNodes);
    if (existingChildren.length) {
      existingChildren.forEach(ec => {
        if (!children.includes(ec)) {
          node.removeChild(ec);
        }
      });
      children.forEach((c, index) => {
        if (!existingChildren.includes(c)) {
          const existingClosestSibling = children.find(
            (_c, _index) => _index > index && existingChildren.includes(_c)
          );
          c = c instanceof Node ? c : document.createTextNode(c);
          if (existingClosestSibling) {
            node.insertBefore(c, existingClosestSibling);
          } else {
            node.appendChild(c);
          }
        }
      });
    } else if (children.length) {
      node.append(...children);
    }
    return node;
  };
};
