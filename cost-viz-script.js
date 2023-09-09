document.addEventListener("DOMContentLoaded", () => {
  //chart labels
  const labels = [
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023"
  ];

  //randomly generated data
  const datasets = {
    Netflix: {
      data: [7.09, 8.93, 9.67, 10.91, 8.42, 9.87, 10.69, 8.72, 7.28],
      BRcolor: PLATFORM_COLORS["Netflix"],
      PTBGcolor: PLATFORM_COLORS["Netflix"],
      PTBRcolor: PLATFORM_COLORS["Netflix"]
    },
    "Amazon Prime": {
      data: [6.67, 7.04, 14.03, 16.66, 11.38, 17.6, 15.51, 18.47, 16.42],
      BRcolor: PLATFORM_COLORS["Amazon Prime"],
      PTBGcolor: PLATFORM_COLORS["Amazon Prime"],
      PTBRcolor: PLATFORM_COLORS["Amazon Prime"]
    },
    "Apple TV": {
      data: [10.33, 10.1, 10.61, 10.95, 10.1, 10.46, 9.05, 9.1, 10.37],
      BRcolor: PLATFORM_COLORS["Apple TV"],
      PTBGcolor: PLATFORM_COLORS["Apple TV"],
      PTBRcolor: PLATFORM_COLORS["Apple TV"]
    },
    Hulu: {
      data: [6.77, 6.97, 17.1, 16.73, 6.57, 9.47, 18.41, 15.21, 16.2],
      BRcolor: PLATFORM_COLORS["Hulu"],
      PTBGcolor: PLATFORM_COLORS["Hulu"],
      PTBRcolor: PLATFORM_COLORS["Hulu"]
    },
    "HBO Max": {
      data: [7.11, 13.23, 7.11, 18.96, 17.69, 14.0, 9.74, 16.7, 9.08],
      BRcolor: PLATFORM_COLORS["HBO Max"],
      PTBGcolor: PLATFORM_COLORS["HBO Max"],
      PTBRcolor: PLATFORM_COLORS["HBO Max"]
    },
    Crunchyroll: {
      data: [14.02, 15.5, 12.67, 16.75, 18.16, 12.5, 18.19, 6.78, 6.45],
      BRcolor: PLATFORM_COLORS["Crunchyroll"],
      PTBGcolor: PLATFORM_COLORS["Crunchyroll"],
      PTBRcolor: PLATFORM_COLORS["Crunchyroll"]
    },
    "Disney+": {
      data: [10.32, 16.53, 14.53, 16.03, 8.76, 16.46, 7.68, 8.19, 17.66],
      BRcolor: PLATFORM_COLORS["Disney+"],
      PTBGcolor: PLATFORM_COLORS["Disney+"],
      PTBRcolor: PLATFORM_COLORS["Disney+"]
    },
    "Paramount+": {
      data: [11.38, 17.44, 7.0, 18.6, 14.0, 15.45, 15.65, 13.81, 9.13],
      BRcolor: PLATFORM_COLORS["Paramount+"],
      PTBGcolor: PLATFORM_COLORS["Paramount+"],
      PTBRcolor: PLATFORM_COLORS["Paramount+"]
    },
    Peacock: {
      data: [10.93, 11.59, 11.85, 10.15, 10.41, 10.61, 12.56, 12.36, 11.27],
      BRcolor: PLATFORM_COLORS["Peacock"],
      PTBGcolor: PLATFORM_COLORS["Peacock"],
      PTBRcolor: PLATFORM_COLORS["Peacock"]
    }
  };

  //initialize chart
  const chartContainer = document.getElementById("chart-container");
  const ctx = document.getElementById("chart").getContext("2d");
  Chart.defaults.font.family = "Lexend";
  Chart.defaults.plugins.tooltip.borderColor = "rgba(0,0,0,0.1)";
  Chart.defaults.plugins.tooltip.titleColor = "black";
  Chart.defaults.plugins.tooltip.backgroundColor = "white";
  Chart.defaults.plugins.tooltip.borderWidth = "1";
  Chart.defaults.plugins.tooltip.bodyColor = "black";
  let chart;

  //update + redraw chart with new data
  function updateChart() {
    const checkedDatasets = Array.from(
      document.getElementsByClassName("dataset-checkbox")
    )
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
    const data = {
      labels: labels,
      datasets: checkedDatasets.map((dataset) => ({
        label: dataset,
        data: datasets[dataset].data.slice(0, labels.length),
        backgroundColor: datasets[dataset].BGcolor,
        borderColor: datasets[dataset].BRcolor,
        pointBackgroundColor: datasets[dataset].PTBGcolor,
        pointBorderColor: datasets[dataset].PTBRcolor,
        pointRadius: 6
      }))
    };
    if (chart) {
      chart.data = data;
      chart.update();
    } else {
      chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          plugins: {
            tooltip: {
              displayColors: false,
              //tooltip callbacks
              callbacks: {
                labelTextColor: function (context) {
                  return context.dataset.borderColor;
                },
                label: function (context) {
                  const checkedDatasets = Array.from(
                    document.getElementsByClassName("dataset-checkbox")
                  )
                    .filter((checkbox) => checkbox.checked)
                    .map((checkbox) => checkbox.value);
                  return (
                    context.dataset.label +
                    ": $" +
                    context.dataset.data[context.dataIndex] +
                    "/month"
                  );
                }
              }
            }
          },
          scales: {
            y: {
              title: {
                display: true,
                text: "Average Monthly Cost (dollars)"
              }
            },
            x: {
              title: {
                display: true,
                text: "Year"
              }
            }
          }
        }
      });
    }
  }

  //update chart if any checkbox state changes
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", updateChart);
  });

  //update chart after initial data arrives
  updateChart();

  var platformsChecked = false;

  //toggle all platform checkboxes on/off
  function togglePlatformCheckboxes() {
    var checkboxes = document.querySelectorAll('input[class="dataset-checkbox"]');
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = platformsChecked;
    });
    platformsChecked = !platformsChecked;
    updateChart();
  }
});
