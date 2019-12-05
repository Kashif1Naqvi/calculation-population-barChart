d3.csv('cal.csv').then(data=>{
  data.forEach(d => {
   d.population = + d.population // it's mean all peoples
  });
  render(data)
})

const render =(data) =>{
 let positions = { height:500, width: 900}
 let margin = {top:80,right:20,left:90,bottom:70}
 let barwidth = positions.width - margin.left - margin.right
 let barHeight = positions.height - margin.top - margin.bottom
 let xValue = d => d.population
 let yValue = d => d.country
 let tickFormat = number => d3.format(".3s")(number).replace("G","B")
 const xScale = d3.scaleLinear().domain([0,d3.max(data,xValue)]).range([0,barwidth])
 const xAxis = d3.axisBottom(xScale).tickSize(-barHeight).tickFormat(tickFormat)
 const yScale = d3.scaleBand()
  .domain(data.map(yValue))
  .range([0,barHeight])
 const yAxis = d3.axisLeft(yScale)
 const tooltip = d3.select("#line").append("g").attr("translate",`translate(0,${positions.height})`).attr("class","tooltip")
 const svg = d3.select("#line").append("svg").attr("height",positions.height).attr("width",positions.width)

 let g = svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);
 let rect = g.selectAll("rect").data(data).enter().append("rect")
    .attr("width",0)
    .attr("y",d=>yScale(yValue(d)))
    .attr("height",yScale.bandwidth())
    .attr("stroke","white")
    .attr("stroke-width",3)
    .on("mouseover",function(d,i){
      tooltip.html(`<div>${d.country} Population:${tickFormat(d.population)}</div>`)
             .style("top",(d3.event.pageY )  + "px")
             .style("right",(d3.event.pageX) + "px").style("display","block")
    })
    .on("mouseout",function(d,i){
      tooltip.style("display","none")
    })
    

    rect.transition()
    .attr("width",d=>xScale(xValue(d)))
    .duration(function(d,i){
      if(i <= 0){ 
          return positions.width * 2
      }else if (i<=1) {
          return  positions.height *3
      }else if (i<=2) {
          return positions.height *4
      }else if (i<=3) {
        return positions.height *5
      }
      else if (i<=1000 ) {
        return positions.height *6
      }
    })
    
let xGroup = g.append("g").call(xAxis).attr('transform', `translate(0,${barHeight})`)
            xGroup.select(".domain").remove()
let yGroup = g.append("g").call(yAxis)
    yGroup.select(".domain").remove()

let text = g.append("text")
  .attr("x",0)
  .attr("y", positions.width/positions.height - 11)
  .text("")
  .attr("transform","rotate(-270) rotate(80)")
  .attr("text-anchor","middle")
  .attr("class","title")

  text.transition()
    .attr("x",(positions.width ) / 2)
    .text("Top 10 countries population 2019")
    .attr("transform","rotate(0)")
    .duration(barwidth * 3)
}
