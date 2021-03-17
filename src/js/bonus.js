function buildGauge(wfreq) {
    // Enter the washing frequency between 0 and 180
    // 180/9 = 20
    let level = +wfreq * 20;

    // Do some maths to figure out the needle
    let needleRadius = 0.75;
    let needleBase = 0.03;
    let needleRadians = ((180 - level) * Math.PI) / 180;
    let x = needleRadius * Math.cos(needleRadians);
    let y = needleRadius * Math.sin(needleRadians);
    let x1 = needleBase * Math.cos(needleRadians + Math.PI / 2);
    let y1 = needleBase * Math.sin(needleRadians + Math.PI / 2);
    let x2 = -x1;
    let y2 = -y1;

    // Path for needle
    let path = `M ${x1},${y1} L ${x2},${y2} L ${x},${y} Z`;

    let gaugeLabels = ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""];

    let data = [
        {
            // Place a circle in the center this is actually part of the needle
            // but also will display the actual wash freq on hover.
            type: "scatter",
            x: [0],
            y: [0],
            marker: { size: 12, color: "rgb(139, 0, 0)" },
            showlegend: false,
            text: wfreq,
            hoverinfo: "text"
        },
        {
            values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
            rotation: 90,
            text: gaugeLabels,
            textinfo: "text",
            textposition: "inside",
            marker: {
                colors: [
                    "rgba(0,105,11,.5)",
                    "rgba(10,120,22,.5)",
                    "rgba(14,127,0,.5)",
                    "rgba(110,154,22,.5)",
                    "rgba(170,202,42,.5)",
                    "rgba(202,209,95,.5)",
                    "rgba(210,206,145,.5)",
                    "rgba(232,226,202,.5)",
                    "rgba(240, 230,215,.5)",
                    "rgba(255,255,255,0)"
                ]
            },
            labels: gaugeLabels,
            hoverinfo: "label",
            hole: 0.5,
            type: "pie",
            showlegend: false
        }
    ]

    let layout = {
        shapes: [
            {
                type: "path",
                path: path,
                fillcolor: "rgb(139, 0, 0)",
                line: {
                    color: "rgb(139, 0, 0)"
                }
            }
        ],
        title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
        height: 500,
        width: 500,
        xaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
        },
        yaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
        }
    }

    Plotly.newPlot("gauge", data, layout);
}