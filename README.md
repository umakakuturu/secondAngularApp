expandContainer(event) {
    var target = event.currentTarget;

    let lobWrapElement = this._elementRef.nativeElement.querySelector('.lob_wrap');
    if (lobWrapElement) {
        let lowWrapChildren = lobWrapElement.querySelectorAll('li.lob.active');
        for (let i = 0; i < lowWrapChildren.length; i++) {
            lowWrapChildren[i].classList.remove('active');
        }
        let lowWrapSubChildren = lobWrapElement.querySelectorAll('li.sub_lob.active');
        for (let i = 0; i < lowWrapSubChildren.length; i++) {
            lowWrapSubChildren[i].classList.remove('active');
        }
    }

    if (target) {
        let targetElement = this._elementRef.nativeElement.querySelector(target.getAttribute('href'));
        if (targetElement) {
            let planElement = targetElement.closest('.plan');
            let children = planElement.parentNode.children;
            children.forEach((sibling) => {
                if (sibling !== planElement) {
                    let sElement = sibling.querySelector('.sub_lob');
                    if (sElement) {
                        sElement.style.display = 'none';
                    }
                }
            });

            let targetElementChildren = targetElement.parentNode.children;
            targetElementChildren.forEach((c) => {
                if (c !== targetElement && c.classList.contains('sub_lob')) {
                    c.style.display = 'none';
                    c.style.maxHeight = 'none';
                    c.style.transition = 'max-height 0.5s ease-out';
                    c.style.overflow = 'hidden';
                    c.style.display = 'block';
                    c.style.maxHeight = c.scrollHeight + 'px';
                }
            });

            targetElement.parentNode.classList.add('active');
        }
    }
}
