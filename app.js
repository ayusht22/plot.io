var b1=document.getElementById("b1")
var b2=document.getElementById('b2')
var b3=document.getElementById('b3')

let buttonState="2019.csv"




func= function(){
d3.csv('data/'+buttonState,function(data){

   
    console.log(data)
  

    x=[]
    y=[]
    states=[]
    sgds=[]
    stateColors=[]
    images=[]
    for(let i=0;i<data.length;i++){
        x.push(data[i]['MDS Col 1'])
        y.push(data[i]['MDS Col 2'])
        states.push(data[i]['State/UT'])
        let stateName=data[i]['State/UT'].toLowerCase()
        stateName=stateName.split(' ')
        stateName=stateName.join('')
      
        if(stateName=='madhyapradesh'||stateName=='puducherry'||stateName=='goa'){
            images.push(
                {
                    "source": "icons/"+stateName+".png",
                    "xref": "x",
                    "yref": "y",
                    "x":parseFloat(data[i]['MDS Col 1'])+0.01,  
                    "y": data[i]['MDS Col 2']-0.01,
                    "sizex": 0.04,
                    "sizey": 0.04,
                    "xanchor": "right",
                    "yanchor": "bottom" 
                   
                  })        

        }
        else {images.push(
        {
            "source": "icons/"+stateName+".png",
            "xref": "x",
            "yref": "y",
            "x":parseFloat(data[i]['MDS Col 1'])+0.01,  
            "y": data[i]['MDS Col 2']-0.01,
            "sizex": 0.06,
            "sizey": 0.06,
            "xanchor": "right",
            "yanchor": "bottom" 
           
          })}






        tempColors=[]
        temp=[]

        for(let j=1;j<17;j++){
            
            if(buttonState!='2019.csv'&&j==14)continue;
            else if(buttonState=='2019.csv'&&(j==12||j==13||j==14))continue;
            let val=data[i]['SDG '+j]
            temp.push(val)
            if(val<50){
                tempColors.push('#ea9393')
            }
            else if(val<65){
                tempColors.push('#ffbf86')
            }
            else{
                tempColors.push('#95cf95')
            }
            
        }
        stateColors.push(tempColors)
        sgds.push(temp)
    }
   
    console.log(images)

  


    var types = ['square','square','circle','circle'];
    var colors = ['#87ceeb','#95cf95','#ffbf86','#ea9393'];

    var pos=[
    [
        0,
        0,
        1,
        1,
    ],
    [
        0,
        0,
        0.99,
        0.99,
    ],
    
    [
        -0.90,
        -0.90,
        0.90,
        0.90
    ],
    [
        -0.49,
        -0.49,
        0.49,
        0.49
    ]
  
    ]

    let title='<b>SDG GOVERNANCE MAP</b><br><br>'
    let template=
    "<b>%{text}</b><br><br>" +
    "SDG1: %{customdata["+0+"]}<br>" +
    "SDG2: %{customdata["+1+"]}<br>" +
    "SDG3: %{customdata["+2+"]}<br>" +
    "SDG4: %{customdata["+3+"]}<br>" +
    "SDG5: %{customdata["+4+"]}<br>" +
    "SDG6: %{customdata["+5+"]}<br>" +
    "SDG7: %{customdata["+6+"]}<br>" +
    "SDG8: %{customdata["+7+"]}<br>" +
    "SDG9: %{customdata["+8+"]}<br>" +
    "SDG10: %{customdata["+9+"]}<br>" +
    "SDG11: %{customdata["+10+"]}<br>" +
    "SDG12: %{customdata["+11+"]}<br>" +
    "SDG13: %{customdata["+12+"]}<br>" +
    "SDG15: %{customdata["+13+"]}<br>" +
    "SDG16: %{customdata["+14+"]}<br>" +
    "<extra></extra>"


    if(buttonState=='2019.csv'){
        title+='2018-19 data'
        template=
        "<b>%{text}</b><br><br>" +
        "SDG1: %{customdata["+0+"]}<br>" +
        "SDG2: %{customdata["+1+"]}<br>" +
        "SDG3: %{customdata["+2+"]}<br>" +
        "SDG4: %{customdata["+3+"]}<br>" +
        "SDG5: %{customdata["+4+"]}<br>" +
        "SDG6: %{customdata["+5+"]}<br>" +
        "SDG7: %{customdata["+6+"]}<br>" +
        "SDG8: %{customdata["+7+"]}<br>" +
        "SDG9: %{customdata["+8+"]}<br>" +
        "SDG10: %{customdata["+9+"]}<br>" +
        "SDG11: %{customdata["+10+"]}<br>" +
        "SDG15: %{customdata["+11+"]}<br>" +
        "SDG16: %{customdata["+12+"]}<br>" +
        "<extra></extra>"

    }
    else if(buttonState=='2020.csv'){
        title+='2019-20 data'
    }
    else {
        title+='2020-21 data'
    }
    var layout = {
        width:1500,
        height:800,
        xaxis: {range: [-0.1, 1.1], showgrid: false},
        yaxis: {range: [0, 1.1], showgrid: false}, 
        shapes: [],
        hovermode:'closest',
        margin: {
            l: 100,
            r: 100,
            b: 100,
    
            pad: 4
          },
        title:{
            text:title
        },
        images:images
          
        }

for (var i = 0; i <2; i +=1) {
    layout.shapes.push({
        type: types[i],
        x0:  pos[i][0],
        y0:  pos[i][1],
        x1:  pos[i][2],
        y1:  pos[i][3],
        fillcolor: colors[i],
        line: {
            color: colors[i]
        },
        layer: 'below'
    })
 
}





hoverinfo=[]

hoverinfo.push(states)







var zoneLine = [
    
    {
        
        mode:'lines',
        fill: 'tozeroy',
        fillcolor:'#ffbf86',
        showlegend:false,
        line:{
            shape:'spline',
            color:'#ffbf86',
        },
        x:[0,0.55,0.6,0.62,0.64],
        y:[0.64,0.64,0.6,0.5,0],
        hoverinfo:'none'
    },
    {
    
    mode:'lines',
    fill: 'tozeroy',
    fillcolor:'#ea9393',
    showlegend:false,
    hoverinfo:'none',
    line:{
        shape:'spline',
        color:'#ea9393',
    },
    x:[0,0.40,0.45,0.475,0.49],
    y:[0.49,0.49,0.45,0.3,0],
    

    },]
        
    
var dataPoints=[]

        
        dataPoints.push({
            mode: 'markers',
            
            marker:{
                size:3,
                color: '#87ceeb'
            },
            x:x,
            y:y,
            customdata:sgds,
            text:states,
                hovertemplate:template,
        
            showlegend:false
            
            })

  
   
      
var legends=[
    {
    x: ['b'],
    y: [0.0001],
    legendgroup: 'AS',
    marker: {
    color: '#ea9393',
        line: {color: 'transparent'}
    },
    name: 'ASPIRANT',
    type: 'bar',
    xaxis: 'x',
    yaxis: 'y'
    },

    {
    x: ['b'],
    y: [0.0001],
    legendgroup: '#ffbf86',
    marker: {
    color: '#ffbf86',
        line: {color: 'transparent'}
    },
    name: 'PERFORMER',
    type: 'bar',
    xaxis: 'x',
    yaxis: 'y'
    },

    {
    x: ['b'],
    y: [0.0001],
    legendgroup: '#95cf95',
    marker: {
    color: '#95cf95',
        line: {color: 'transparent'}
    },
    name: 'FRONT RUNNER',
    type: 'bar',
    xaxis: 'x',
    yaxis: 'y'
    },

    {
    x: ['b'],
    y: [0.0001],
    legendgroup: '#87ceeb',
    marker: {
    color: '#87ceeb',
        line: {color: 'transparent'}
    },
    name: 'ACHIEVER',
    type: 'bar',
    xaxis: 'x',
    yaxis: 'y'
    }
    
]
data.push(zoneLine[0],zoneLine[1])

for(let i=0;i<dataPoints.length;i++){
    data.push(dataPoints[i])
}
for(let i=0;i<legends.length;i++){
    data.push(legends[i])
}

data.push(
    {
    type:'scatter',
    
    showlegend:false,
   
    hovertemplate:"%{x},%{y}"+"<extra></extra>",
    x:[0,
        0.4891538561,
        0.5500690729,
        0.6401176296,
        0.990165558,
        1],
    y:[0,
        0.4913119535,
        0.5498896166,
        0.6398174257,
        0.9897464388,
        1]
    
    }
)
Plotly.newPlot(myDiv, data, layout);

})

}

func()

b1.addEventListener('click',()=>{
    buttonState="2019.csv"
    var myDiv = document.getElementById('myDiv');
    
    
    func()
    })
    
    b2.addEventListener('click',()=>{
        buttonState="2020.csv"
        var myDiv = document.getElementById('myDiv');
        
        func()
        })
    b3.addEventListener('click',()=>{
        buttonState="2021.csv"
        var myDiv = document.getElementById('myDiv');
     
        func()
    })

