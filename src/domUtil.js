const domUtil = (function () {

    const removeElementChildren = (element) => {

        Array.from(element.children).forEach(child => child.remove());

    }

    return { removeElementChildren };

})();



export { domUtil };