(() => {
  let animating = false;

  window.addEventListener("scroll", () => {
    if (!animating) {
      window.requestAnimationFrame(() => {
        didScroll(window.scrollY);
        animating = false;
      });

      animating = true;
    }
  });

  const didScroll = (scrollY) => {
    const headings = Array.from(document.querySelectorAll("h2")).map(
      (element) => {
        const { id, offsetTop, offsetHeight } = element;
        const anchor = document.querySelector(
          `.table-of-contents a[href='#${id}']`
        );

        return {
          id,
          anchor,
          offsetTop: offsetTop - offsetHeight,
        };
      }
    );

    const current =
      headings.filter((x) => scrollY > x.offsetTop).pop() || headings[0];

    headings
      .filter((x) => x.id !== current.id)
      .forEach((x) => {
        x.anchor?.closest("li").classList.remove("active");
      });

    const li = current.anchor?.closest("li");
    li?.classList.add("active");
  };

  didScroll(window.scrollY);
})();
