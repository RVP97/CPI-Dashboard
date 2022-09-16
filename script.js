d3.json("https://www.econdb.com/api/series/CPIUS/?format=json").then((data) => {
  let cpiValues = data.data.values;
  let newArr = [];
  cpiValues.forEach((element, index) => {
    if (index != 0) {
      let pastNumber = cpiValues[index - 1];
      let currentNumber = element;
      newArr.push(((currentNumber - pastNumber) / pastNumber) * 100);
    }
  });
  console.log(newArr);

  let cpiDates = data.data.dates;
  let trace = {
    x: cpiDates,
    y: cpiValues,
    name: "CPI Value",
  };
  let percentageTrace = {
    x: cpiDates,
    y: newArr,
    name: "CPI % Increase",
    // mode: "markers",
    // marker: {
    //   size: newArr.map((mark) => Math.abs(mark * 20)),
    //   color: newArr,
    // },
  };
  let layout = {
    title: "US - CPI % Change vs Unemployment Rate",
    yaxis: { title: "CPI Axis" },
    yaxis2: {
      title: "Unemployment Axis",
      overlaying: "y",
      side: "right",
    },
  };
  d3.json("https://www.econdb.com/api/series/URATEUS/?format=json").then(
    (uData) => {
      let urValues = uData.data.values;
      let urDates = uData.data.dates;
      let urTrace = {
        x: urDates,
        y: urValues,
        name: "Unemployment Rate",
        yaxis: "y2",
      };
      Plotly.newPlot("cpi", [percentageTrace, urTrace], layout);
    }
  );
});
