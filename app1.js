d3.csv("data/2021.csv",function(data){
    for(let i=0;i<data.length;i++){
let val=data[i]['Neighbors']
if(val==null) continue
console.log(val)
val=val.split(" ")
console.log(val)}
})