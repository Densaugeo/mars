PanelUI = {};

// Daisy-chainable element maker
PanelUI.forgeElement = function(/*string*/ tagName, /*Object*/ properties, /*Array*/ children) {
  var element = document.createElement(tagName);
  for(var i in properties) {
    element[i] = properties[i];
  }
  if(children) {
    for(var i = 0, endi = children.length; i < endi; ++i) {
      element.appendChild(children[i]);
    }
  }
  return element;
}
var fE = PanelUI.forgeElement;

/**
 * Makes a sidebar. Buttons added to the sidebar can be triggered by clicks or keyboard shortcuts 1-9, 0, -, and =
 * 
 * Icons come from Font Awesome and are specified in the faClass option
 * 
 * var sidebar = new PanelUI.Sidebar();
 * sidebar.addButton({buttonName: 'do_stuff', faClass: 'fa-question', title: 'Tooltip text', repeatable: false});
 * sidebar.on('do_stuff', function() {console.log('Doing stuff')});
 * sidebar.on('trigger', function(e) {console.log(e.buttonName === 'do_stuff')});
 */
PanelUI.Sidebar = function() {
  EventEmitter.call(this);
  
  this.domElement = fE('div', {id: 'sidebar'});
  this.children = this.domElement.children;
  document.body.appendChild(this.domElement);
  
  this.keyCodesToButtonIndices = {49: 0, 50: 1, 51: 2, 52: 3, 53: 4, 54: 5, 55: 6, 56: 7, 57: 8, 58: 9, 48: 10, 173: 11, 61: 12};
  this.buttonIndicesToKeyChars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
  
  with(this) this.addButton = function(/*Object*/ options) {
    options = options || {};
    
    var element = fE('i', {
      buttonName: options.buttonName || 'Not yet named',
      className : 'fa ' + 'button ' + (options.faClass || 'fa-question'),
      title     : (options.title || 'Not yet described') + '\n\nKey: ' + buttonIndicesToKeyChars[children.length],
      repeatable: options.repeatable || false,
    });
    
    domElement.appendChild(element);
  }
  
  with(this) domElement.addEventListener('click', function(/*Event*/ e) {
    if(e.target !== domElement) {
      emit('trigger', {buttonName: e.target.buttonName});
      emit(e.target.buttonName);
    }
  });
  
  with(this) document.addEventListener('keydown', function(/*Event*/ e) {
    var index = keyCodesToButtonIndices[e.keyCode];
    
    if(children[index]) {
      if(children[index].repeatable || !children[index].classList.contains('button_keypress')) {
        children[index].classList.add('button_keypress');
        emit('trigger', {buttonName: children[index].buttonName});
        emit(children[index].buttonName);
      }
    }
  });
  
  with(this) document.addEventListener('keyup', function(/*Event*/ e) {
    var index = keyCodesToButtonIndices[e.keyCode];
    
    if(children[index]) {
      children[index].classList.remove('button_keypress');
    }
  });
}
PanelUI.Sidebar.prototype = Object.create(EventEmitter.prototype);
PanelUI.Sidebar.prototype.constructor = PanelUI.Sidebar;

/**
 * Makes a panel. Includes draggability and close button
 * 
 * var panel = new PanelUI.Panel({id: 'css_id', heading: 'Your heading here', startOpen: true, closeButton: true});
 */
PanelUI.Panel = function(/*Object*/ options) {
  this.domElement = fE('div', {id: options.id, className: 'panel'}, [
    fE('div', {className: 'panel_heading', textContent: options.heading || 'Heading', title: 'Click and drag to move panel'}),
  ]);
  
  if(options.closeButton != false) {
    this.domElement.appendChild(
      this.closeButton = fE('i', {className: 'fa fa-close panel_close button', title: 'Close panel'})
    );
  }
  
  this.draggie = new Draggabilly(this.domElement, {handle: '.panel_heading'});
  
  this.open = function() {
    document.body.appendChild(this.domElement);
  }
  
  this.close = function() {
    document.body.removeChild(this.domElement);
  }
  
  this.isOpen = function() {
    return this.domElement.parentElement === document.body;
  }
  
  if(localStorage['dragger_' + this.domElement.id + '_top']) {
    this.domElement.style.top  = localStorage['dragger_' + this.domElement.id + '_top' ];
    this.domElement.style.left = localStorage['dragger_' + this.domElement.id + '_left'];
  }
  
  if(options.startOpen != false) {
    this.open();
  }
  
  if(options.closeButton != false) {
    with(this) domElement.addEventListener('mouseenter', function(/*Event*/ e) {
      closeButton.style.visibility = 'visible';
    });
    
    with(this) domElement.addEventListener('mouseleave', function(/*Event*/ e) {
      closeButton.style.visibility = 'hidden';
    });
    
    with(this) closeButton.addEventListener('click', function(/*Event*/ e) {
      close();
    });
  }
  
  with(this) draggie.on('dragEnd', function() {
    localStorage['dragger_' + domElement.id + '_top' ] = domElement.style.top ;
    localStorage['dragger_' + domElement.id + '_left'] = domElement.style.left;
  });
}
