const dataFile = "/resources/data/samples.json";

function buildMetadata(sampleName) {
    d3.json(dataFile).then((samples) => {
        var panel = d3.select("#sample-metadata");
        // Clear the current metadata
        panel.html("");

        // Find the specific sample id in the metadata
        let sampleData = samples.metadata.find(o => o.id === +sampleName);
        console.log(sampleData);

        // Add each key value pair to the metadata panel
        Object.entries(sampleData).forEach(([key, value]) => {
            panel.append("h6").text(`${key}:${value}`);
        });
    });
}

function init() {
    // Get the dropdown box element
    var selector = d3.select("#selDataset");

    // Use the the names in the data to populate the dropdown
    d3.json(dataFile).then((samples) => {
        samples.names.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        
        // Populate the charts with the first sample name
        buildMetadata(samples.names[0]);
    });
}

// Fetch data when the option is changed
function optionChanged(newSample) {
    console.log(newSample);
}

// Initialize the Dashboard
init();