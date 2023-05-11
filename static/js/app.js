
//function that populates themetadata

function demoInfo(sample)
{
    console.log(sample);

    d3.json("samples.json").then((data) => {
        //grab all metadata
        let metaData = data.metadata;

        // filter based on value of the sample - returns 1 result in an array
        let result = metaData.filter(sampleResult => sampleResult.id == sample);

        // access index 0 from the array
        let resultData = result[0];
        //console.log(resultData);

        // clear the metadata
        d3.select("#sample-metadata").html("");


        // use object.entries to get the value key pairs
        Object.entries(resultData).forEach(([key,value]) =>{
            //add to the sample metadata
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
        });



    });
}
// function that builds the graph

function buildBarChart(sample)
{
    //console.log(sample);
    //let data = d3.json("samples.json");
    //console.log(data);


    d3.json("samples.json").then((data) => {
        //grab all sampledata
        let sampleData = data.samples;      
        
        
        // filter based on value of the sample - returns 1 result in an array
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        
        
        // access index 0 from the array
        let resultData = result[0];
        

        //get otu_ids,lables and sample_values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
       

        //build the bar chart
        // get the y ticks
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0,10);
        let textLabels = otu_labels.slice(0,10);
       

        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textLabels.reverse(),
            type: "bar",
            orientation: "h"
        }

        let layout = {
            title: "Top 10 Belly Button Bacteria" 
        };

        Plotly.newPlot("bar", [barChart], layout);



    });
}

//function to build bubble chart
function buildBubbleChart(sample)
{
    d3.json("samples.json").then((data) => {
        //grab all sampledata
        let sampleData = data.samples;      
        
        
        // filter based on value of the sample - returns 1 result in an array
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        
        
        // access index 0 from the array
        let resultData = result[0];
        

        //get otu_ids,lables and sample_values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
       

        //build the bubble chart
        
       

        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }

        let layout = {
            title: " Bacteria Cultures Per Sample",
            hovermode: "closet",
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", [bubbleChart], layout);



    });

}



// function that initialize the dashboard

function intialize()
{
    //let data = d3.json("samples.json");
    //console.log(data);
    // access the dropdown selector from the index.html
    var select = d3.select("#selDataset");

    // use d3.json to get the data
    d3.json("samples.json").then((data) => {

        let sampleNames = data.names;
        //console.log(sampleNames);

        // use foreach to create option for each sample in selector.
        sampleNames.forEach((sample) =>{
            select.append("option")
                 .text(sample)
                 .property("value",sample);
        });
         //pass in the information for first sample
         let sample1 = sampleNames[0];

         // call the function to build metadata
         demoInfo(sample1);

         // call the function to build bar chart
         buildBarChart(sample1)

         // call the function to build Bubble chart
         buildBubbleChart(sample1);      
      
         
    

    });

   


}

// function that updates the dashboard

function optionChanged(item)
{
    //call the update to metadata
    demoInfo(item);
    // call the function to build the bar chart
    buildBarChart(item);
    // call the function to build bubble chart
    buildBubbleChart(item);

}
// call the initialize function
intialize();



