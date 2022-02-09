

$.get("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=yOeY6cD6IMQAe4DVAqGHLUl9JwXWRJv0", function (data){ //hämtar data från NYT API

    console.log(data.results.books); //lägger bokdata i console
    console.log(data); //lägger datan i console
    var books = data.results.books; //skapar variabel books
    books.forEach(CreateCards); //loop som skapar bokdivar/cards
});

    function CreateCards(item){ //funktion för att skapa cards
        var card = $("<div></div>").attr("class", "card"); //variabel för card diven
        var img = $("<img></img>").attr("src", item.book_image).attr("class", "card-img"); //variabel för bok omslag
        var cardField = $("<div></div>").attr("class", "card-body"); //variabel för ttextbox 
        var title= $("<h5></h5>").attr("class", "card-title").text(item.title); //variabel för titel
        var author= $("<h6></h6>").attr("class", "card-author").text("Author: "+item.author); //variabel för författare
        var description= $("<p></p>").attr("class", "card-text").text(item.description); //variabel för sammanfattning
        var buttonDiv =$('<a>Buy</a>' ).attr({ class:"btn btn-primary", href:item.amazon_product_url}); //variabel för köpknappen
        
        //Nedan kod fixar positioner och lägger element i andra element
        card.append(img); 
        card.append(author);
        card.append(cardField);
        cardField.append(title);
        cardField.append(description);
        buttonDiv.appendTo(cardField)

        var x = card.appendTo("body"); //Skapar return variabel som lägger cards i 

       

        $.get(`https://booksrun.com/api/v3/price/buy/${item.primary_isbn10}?key=gthyr7evmc9pbqqo05hu`, function(dat){ //Hämtar data från Booksrun API

            //Nedan kod länkar buy knappen till respektive boks Amazon länk.
            const buy = dat.result.offers.booksrun.new.price; 
            var Price = (buy == undefined) ? "Out of Stock" : `${dat.result.offers.booksrun.new.price} $`;
            (buy == undefined) ? $( buttonDiv ).remove() : false;
    
            //Nedan kod skapar textruta och lägger in hämtad pris data från API
            var priceDiv = $('<p id="price"></p>').attr({ class:"card-text btn btn-primary"}).text(Price);
            priceDiv.appendTo( cardField);
    
        });

    return x; //Returnerar x värdet 

}




