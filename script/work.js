var $projectcards = $(".project-cards").isotope({
    itemSelector: '.card-item',
    layoutMode: 'fitRows'
})

$(".filter-links-container .button").on("click", function(){
    $(".filter-links-container .button").removeClass("active");
    $(this).addClass("active");
})