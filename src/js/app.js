const dataFile = "/resources/data/samples.json";

function buildMetadata(sampleName) {
    d3.json(dataFile).then((samples) => {
        let panel = d3.select("#sample-metadata");
        // Clear the current metadata
        panel.html("");

        // Find the specific sample id in the metadata
        let sampleData = samples.metadata.find(o => o.id === +sampleName);
        
        // Add each key value pair to the metadata panel
        Object.entries(sampleData).forEach(([key, value]) => {
            let h6 = panel.append("h6").style("font-size", "10px");
            h6.append("span").text(`${key.toUpperCase()}: `).style("font-weight", "bold");
            h6.append("span").text(`${value}`);
        });
        
        // build the gauge for bonus
        buildGauge(sampleData.wfreq);
    });
}

function buildCharts(sampleName) {
    d3.json(dataFile).then((samples) => {
        // Find the specific sample id in the sample data
        let sampleData = samples.samples.find(o => o.id == +sampleName);
        
        const otuIDs = sampleData.otu_ids;
        const otuLabels = sampleData.otu_labels;
        const sampleValues = sampleData.sample_values;

        // Make the bubble plot
        let bubbleLayout = {
            margin: { t: 0 },
            hovermode: "closests",
            xaxis: { title: "OTU ID" },
            yaxis: { title: "VALUES" },
            showlegend: false
        }

        let bubbleData = [
            {
                x: otuIDs,
                y: sampleValues,
                text: otuLabels,
                mode: "markers",
                marker: {
                    size: sampleValues,
                    color: otuIDs,
                    colorscale: "Earth"
                }
            }
        ]

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        // Build the horizontal bar chart of top ten.
        let barData = [
            {
                x: sampleValues.slice(0, 10).reverse(),
                y: otuIDs.slice(0, 10).map(d => 'OTU ' + d).reverse(),
                hovertext: otuLabels.slice(0, 10).reverse(),
                hoverinfo: "hovertext",
                orientation: 'h',
                type: "bar"
            }
        ];

        let barLayout = {
            margin: { t: 0, l: 80}
        };

        Plotly.newPlot("bar", barData, barLayout);
    })
}

function init() {
    // Get the dropdown box element
    let selector = d3.select("#selDataset");

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
        buildCharts(samples.names[0]);
    });
}

// Fetch data when the option is changed
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

// Initialize the Dashboard
init();