$( "#submit_classes" ).click(function() {
    data = []
    $("input:checkbox[name=available_class]:checked").each(function(){
        data.push($(this).val());
    });
    chrome.storage.sync.set({"learn_classes": data });
    chrome.tabs.getSelected(null, function(tab) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, {code: code});
    });
});

var classList = $('#available_classes')


// Add a button to the page for each supplied color
function getClasses(buttonColors) {
    chrome.storage.sync.get("learn_classes", (data1) => {
        chrome.storage.sync.get('available_classes', (data2) => {
            for (i in data2.available_classes){
                    var li = $('<div>')
                        .addClass('form-check')
                        .appendTo(classList);
                    var input = $('<input>')
                        .attr('class', 'form-check-input')
                        .attr('type', 'checkbox')
                        .attr('name', 'available_class')
                        .attr('id', data2.available_classes[i] )
                        .attr('value', data2.available_classes[i])
                        .appendTo(li);

                    if ($.inArray(data2.available_classes[i], data1.learn_classes) != -1){
                        input.prop('checked', true);
                    }
                    $('<label>')
                            .attr('class', 'form-check-label')
                            .attr('for', data2.available_classes[i])
                            .text(data2.available_classes[i])
                            .appendTo(li);
                    }
            })
    });
}
getClasses();
