var inoreaderCounter = document.getElementById('inoreader-counter');
self.port.on('updateinfo',function(text){
    inoreaderCounter.textContent = text;
});
function updateCounter(){
    self.port.emit('updateCounter');
    setTimeout(updateCounter, 300000);    
}
document.getElementById('inoreader-icon').onclick = function() {
  self.port.emit('gotoReader');
}
updateCounter();