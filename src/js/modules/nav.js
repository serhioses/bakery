import $ from 'jquery';

import { doc } from '@app-utils/selectors';

class Nav {
  constructor(trigger, target, overlay) {
    this.trigger = $(trigger);
    this.target = $(target);
    this.overlay = overlay ? $(overlay) : null;

    this.toggle = this.toggle.bind(this);

    doc.on('click', trigger, this.toggle);

    if (this.overlay) {
      doc.on('click', overlay, this.toggle);
    }
  }

  toggle() {
    this.trigger.toggleClass('js-nav-trigger-active');
    this.target.toggleClass('js-nav-active');
    this.overlay && this.overlay.toggleClass('js-nav-overlay-active');
  }
}

export { Nav };
