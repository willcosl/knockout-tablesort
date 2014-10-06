ko.bindingHandlers.sort = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var asc = false;
        var indicator = $('<i class="sortHeader fa fa-sort"></i>');
        var value = valueAccessor();
        var prop = value.prop;
        var data = value.arr;
        var sortOnLoad = value.sortOnLoad;

        $(element).append(indicator);
        element.style.cursor = 'pointer';
        
        element.onclick = function () {
            
            asc = !asc;

            data.sort(function (left, right) {
                var rec1 = left;
                var rec2 = right;

                if (!asc) {
                    rec1 = right;
                    rec2 = left;
                }

                var props = prop.split('.');
                for (var i in props) {
                    var propName = props[i];
                        rec1 = ko.utils.unwrapObservable(rec1[propName]);
                        rec2 = ko.utils.unwrapObservable(rec2[propName]);
                }
                return rec1 == rec2 ? 0 : (rec1 < rec2 ? -1 : 1);
            });

            $(".sortHeader").removeClass("fa-sort-asc fa-sort-desc").addClass("fa-sort");  //Clear all sort headers back to sort
            if (asc) {
                $(indicator).removeClass("fa-sort").addClass("fa-sort-asc");
            } else {
                $(indicator).removeClass("fa-sort").addClass("fa-sort-desc");
            }
            
        };
        if (sortOnLoad) {
            element.click();
        }
    }
};