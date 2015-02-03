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
 * sidebar.addButton({buttonName: 'do_stuff', faClass: 'fa-question', title: 'Tooltip text'});
 * sidebar.on('do_stuff', function() {console.log('Doing stuff')});
 * sidebar.on('trigger', function(e) {console.log(e.buttonName === 'do_stuff')});
 */
PanelUI.Sidebar = function() {
  EventEmitter.call(this);
  
  this.domElement = fE('div', {id: 'sidebar', tabIndex: 1, accessKey: '1'});
  this.children = this.domElement.children;
  document.body.appendChild(this.domElement);
  this.domElement.title = 'Key: ' + this.domElement.accessKeyLabel;
  
  this.keyCodesToButtonIndices = {49: 0, 50: 1, 51: 2, 52: 3, 53: 4, 54: 5, 55: 6, 56: 7, 57: 8, 58: 9, 48: 10, 173: 11, 61: 12};
  this.buttonIndicesToKeyChars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
  
  with(this) this.addButton = function(/*Object*/ options) {
    options = options || {};
    
    var element = fE('i', {
      className : 'fa ' + 'button ' + (options.faClass || 'fa-question'),
      title     : (options.title || 'Not yet described') + '\n\nKey: ' + buttonIndicesToKeyChars[children.length],
      tabIndex  : 0,
    });
    
    element.addEventListener('click', function(/*Event*/ e) {
      emit('trigger', {buttonName: options.buttonName});
      emit(options.buttonName);
    });
    
    domElement.appendChild(element);
  }
  
  with(this) document.addEventListener('keydown', function(/*Event*/ e) {
    if(!e.altKey && !e.ctrlKey && !e.shiftKey && e.keyCode === 13 && e.target.classList.contains('button')) {
      e.target.dispatchEvent(new MouseEvent('click'));
    }
  });
  
  with(this) document.addEventListener('keydown', function(/*Event*/ e) {
    var index = keyCodesToButtonIndices[e.keyCode];
    
    if(!e.altKey && !e.ctrlKey && !e.shiftKey && children[index]) {
      children[index].dispatchEvent(new MouseEvent('click'));
    }
  });
}
PanelUI.Sidebar.prototype = Object.create(EventEmitter.prototype);
PanelUI.Sidebar.prototype.constructor = PanelUI.Sidebar;

/**
 * Makes a panel. Includes draggability and close button
 * 
 * var panel = new PanelUI.Panel({id: 'css_id', heading: 'Your heading here', startOpen: true, closeButton: true, accessKey: 'a'});
 */
PanelUI.Panel = function(/*Object*/ options) {
  this.domElement = fE('div', {id: options.id, className: 'panel', tabIndex: 0, accessKey: options.accessKey || ''}, [
    fE('div', {className: 'panel_heading', textContent: options.heading || 'Heading', title: 'Click and drag to move panel'}),
  ]);
  
  this.domElement.title = (options.heading || 'Heading') + (options.accessKey ? '\n\nAccess Key: ' + options.accessKey.toUpperCase() : '');
  
  this.keyCuts = {};
  
  if(options.closeButton != false) {
    this.domElement.appendChild(
      this.closeButton = fE('i', {className: 'fa fa-close panel_close button', title: 'Close panel\n\nKey: Q'})
    );
    
    this.keyCuts[81] = this.closeButton; // Q is for quit
  }
  
  this.draggie = new Draggabilly(this.domElement, {handle: '.panel_heading'});
  
  if(localStorage['dragger_' + this.domElement.id + '_top']) {
    this.domElement.style.top  = localStorage['dragger_' + this.domElement.id + '_top' ];
    this.domElement.style.left = localStorage['dragger_' + this.domElement.id + '_left'];
  }
  
  if(options.startOpen != false) {
    this.open();
  }
  
  with(this) domElement.addEventListener('keydown', function(e) {
    if(!e.altKey && !e.ctrlKey && !e.shiftKey && keyCuts[e.keyCode]) {
      e.stopPropagation();
      
      keyCuts[e.keyCode].dispatchEvent(new MouseEvent('click'));
    }
  });
  
  if(options.closeButton != false) {
    with(this) closeButton.addEventListener('click', function(/*Event*/ e) {
      close();
    });
  }
  
  with(this) draggie.on('dragEnd', function() {
    localStorage['dragger_' + domElement.id + '_top' ] = domElement.style.top ;
    localStorage['dragger_' + domElement.id + '_left'] = domElement.style.left;
  });
}

PanelUI.Panel.prototype.open = function() {
  document.body.appendChild(this.domElement);
}

PanelUI.Panel.prototype.close = function() {
  document.body.removeChild(this.domElement);
}

PanelUI.Panel.prototype.isOpen = function() {
  return this.domElement.parentElement === document.body;
}
