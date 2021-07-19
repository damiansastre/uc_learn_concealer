$(document).ready(function(){
    chrome.storage.sync.get("learn_classes", (data) => {
        papers = data.learn_classes
        available_classes = []
        $('*[data-parent-key="mycourses"]').each(function (index) {
            data = $(this).find('.media-body')
            console.log(data.text())
                console.log('Available tab', data.text())
                available_classes.push(data.text());
                if ($.inArray(data.text(), papers) != -1) {
                    console.log('Hiding', data.text())
                    data.parent().parent().parent().parent().hide();
                }
                chrome.storage.sync.set({"available_classes": available_classes});
        })
    });
})
