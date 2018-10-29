    const charInsert = "+";
    // Function to create search word for food items with white space
    function insertAt(foodItem, index, length) {
        return foodItem.substr(0, index) +charInsert+ foodItem.substr(index + charInsert.length, length);
    };
    // Function to construct search URL, run ajax GET and to display gif results
    function searchAPI(foodItem) {
        $("#food-display").empty();
        // Construct search URL
        do {
            if (foodItem.indexOf(' ') >= 0) {
                var i = foodItem.indexOf(' ');
                var l = foodItem.length;

                var foodItem = insertAt(foodItem, i, l);
                console.log(foodItem);
            }
        } while (foodItem.indexOf(' ') >= 0);

        var searchURL = "https://api.giphy.com/v1/gifs/search?q=" + foodItem + "&limit=10&api_key=7oTyXu2gGqOZyxsnrtP77BxVPvhdVI92"
        console.log(searchURL);

        $.ajax({
            url: searchURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            var results = response.data;
            console.log(results);
            // Display gifs
            for (var i = 0; i < results.length; i++) {
                // Creating and storing a div tag
                var foodDiv = $("<div>");

                foodDiv.addClass("food-images");
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
                // Creating and storing an image tag
                var foodImage = $("<img>").attr("src", results[i].images.fixed_height_still.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-state", "still").addClass("gif");
                // Appending the paragraph and image tag to the animalDiv
                foodDiv.append(p).append(foodImage);
                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#food-display").append(foodDiv);
              }
              // Play and pause gifs
              $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
    
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                  } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                  }
              });
        }); // Closing .then promise
    };

    var topics =
        ["pizza",
        "cheeseburger",
        "hot dog",
        "taco",
        "bacon",
        "doughnut",
        "french fries",
        "steak",
        "spaghetti",
        "pretzel",
        "ribs",
        "fried chicken",
        "egg roll",
        "grilled cheese",
        "fajitas",
        "popcorn",
        "california roll",
        "mac n cheese",
        "buffalo wings",
        "nachos"];
    // Dynamically create initial buttons
    for (var i = 0; i < 20; i++) {
        $("#button-display").append($("<button>").text(topics[i]).addClass("food-btn btn btn-primary m-2").attr("data-name", topics[i]));
    };
    // Add a new button and run API GET function
    $("#add-food-btn").on("click", function(event) {
        event.preventDefault()

        var foodItem = $("#new-food-item").val().trim();
        console.log(foodItem);

        if (foodItem != '') {
            $("#button-display").append($("<button>").text(foodItem).addClass("food-btn btn btn-primary m-2").attr("data-name", foodItem).on("click", function(){searchAPI(foodItem)}));
        }
    });
    // Run API GET function
    $(".food-btn").on("click", function(event) {
        event.preventDefault()

        var foodItem = $(this)[0].dataset.name;
        console.log(foodItem);
    
        searchAPI(foodItem);
    }); // Closing food button onclick