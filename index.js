d3.csv('cal.csv').then(data=>{
  data.forEach(d => {
   d.population = +d.population * 1000 // it's mean all peoples
  });
  render(data)
})

const render =(data) =>{
 let positions = { height:600, width: 900}
 let margin = {top:20,right:20,left:90,bottom:30}
 let barwidth = positions.width - margin.left - margin.right
 let barHeight = positions.height - margin.top - margin.bottom
 let xValue = d => d.population
 let yValue = d => d.country
 const xScale = d3.scaleLinear().domain([0,d3.max(data,xValue)]).range([0,barwidth])
 const xAxis = d3.axisBottom(xScale).tickSize(-innerHeight)
 const yScale = d3.scaleBand()
  .domain(data.map(yValue))
  .range([0,barHeight])
 const yAxis = d3.axisLeft(yScale)

 const svg = d3.select("#line").append("svg").attr("height",positions.height).attr("width",positions.width).style("background-color","white")
 
 let g = svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);
 g.selectAll("rect").data(data).enter().append("rect")
    .attr("width",d=>xScale(xValue(d)))
    .attr("height",yScale.bandwidth())
    .attr("y",d=>yScale(yValue(d)))
    .attr("stroke","red")
    .attr("stroke-width",3);
let xGroup = g.append("g").call(xAxis).attr('transform', `translate(0,${innerHeight-111})`)
let yGroup = g.append("g").call(yAxis)
}