

var b1=document.getElementById("b1")
var b2=document.getElementById('b2')
var b3=document.getElementById('b3')

let buttonState="2019.csv"

plotData=[]
clusterTraces={}


func= function(){
d3.csv('data/'+buttonState,function(data){

   
   
  
    //extract data and store it in the desired format
    x=[]
    y=[]
    states=[]
    sgds=[]
    stateColors=[]
    images=[]
    indexMap={}
    clusterTraces={}
    neighbors=[]
    for(let i=0;i<data.length;i++)
    {
        x.push(data[i]['MDS Col 1'])
        y.push(data[i]['MDS Col 2'])
        states.push(data[i]['State/UT'])
        let stateName=data[i]['State/UT'].toLowerCase()
        stateName=stateName.split(' ')
        stateName=stateName.join('')
        indexMap[stateName]=i
        
        let n=data[i]['Neighbors']
       console.log(n)
        if(n!=null) 
        {
        n=n.split(" ")
        neighbors.push(n)
        console.log(n)
        }
        else
        {
            neighbors.push(null)
        }

        if(stateName=='tripura'||stateName=='jharkhand'||stateName=='lakshadweep'){
            images.push(
                {
                    "source": "icons/"+stateName+".png",
                    "xref": "x",
                    "yref": "y",
                    "x":parseFloat(data[i]['MDS Col 1'])+0.01,  
                    "y": data[i]['MDS Col 2']-0.008,
                    "sizex": 0.03,
                    "sizey": 0.03,
                    "xanchor": "right",
                    "yanchor": "bottom" 
                   
                  })        

        }
        else if(buttonState=='2021.csv'){
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
            "sizex": 0.03,
            "sizey": 0.03,
            "xanchor": "right",
            "yanchor": "bottom" 
           
          })}



        
        tempColors=[]
        temp=[]
        // store the sdg values depending upon the year 
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


    images.push(
        {
            "source": "icons/red.png",
            "xref": "x",
            "yref": "y",
            "x":0.52   ,  
            "y": 0.36000000000000004 ,
            "sizex": 0.04,
            "sizey": 0.04,
            "xanchor": "right",
            "yanchor": "bottom" 
           
          })
        images.push(
        {
            "source": "icons/yellow.png",
            "xref": "x",
            "yref": "y",
            "x":0.52  ,  
            "y": 0.6799999999999999,
            "sizex": 0.04,
            "sizey": 0.04,
            "xanchor": "right",
            "yanchor": "bottom" 
            
            })
        images.push(
        {
            "source": "icons/green.png",
            "xref": "x",
            "yref": "y",
            "x":0.835 ,  
            "y": 1,
            "sizex": 0.04,
            "sizey": 0.04,
            "xanchor": "right",
            "yanchor": "bottom" 
            
            })
        images.push(
            {
                "source": "icons/blue.png",
                "xref": "x",
                "yref": "y",
                "x":1.018,  
                "y": 1,
                "sizex": 0.04,
                "sizey": 0.04,
                "xanchor": "right",
                "yanchor": "bottom" 
                
                })

    
    
    for(let i=0;i<neighbors.length;i++)
    {
        if(neighbors[i]==null)continue;
        let stateName=states[i]
        clusterTraces[stateName]=[]
        console.log(stateName)
        for(let j=0;j<neighbors[i].length;j++){
            
            curr_x=[]
            curr_y=[]

            curr_x.push(x[i])
            curr_y.push(y[i])
            neighbors[i][j]=neighbors[i][j].toLowerCase()
            let ind =indexMap[neighbors[i][j]]
            curr_x.push(x[ind])
            curr_y.push(y[ind])
            clusterTraces[stateName].push([curr_x,curr_y])
        }

        
        
    }
    
    console.log(clusterTraces)

    

    var types = ['square','square','circle','circle'];
    var colors = ['#87ceeb','#95cf95','#ffbf86','#ea9393'];

    var pos=[
    [
        0,
        0,
        1,
        1,
    ],
  
  
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
        xaxis: {range: [-0.1, 1.2],showgrid:false,'zeroline': false,visible:false},
        yaxis: {range: [0, 1.2],showgrid:false,'zeroline': false,visible:false}, 
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
        images:images,
        annotations:[
            {text:'<b>SDG1- No Poverty<b><br>'+
            '<b>SDG2- Good Health and<br> Well-being<b><br>'+
            '<b>SDG3- Quality Education <b><br>'+
            '<b>SDG4- Clean Water and Sanitation <b><br>'+
            '<b>SDG5- Gender Equality <b><br>'+
            '<b>SDG6- Clean Water and Sanitation <b><br>'+
            '<b>SDG7- Affordable and Clean Energy <b><br>'+
            '<b>SDG8- Decent Work and<br> Economic Growth <b><br>'+
            '<b>SDG9- Industry, Innovation<br> and Infrastructure<b><br>'+
            '<b>SDG10- Reduced Inequality <b><br>'+
            '<b>SDG11- Sustainable Cities and<br> Communities <b><br>'+
            '<b>SDG12- Responsible Consumption and<br> Production <b><br>'+
            '<b>SDG13- Climate Action <b><br>'+
            '<b>SDG14- Life Below Water <b><br>'+
            '<b>SDG15- Life on Land <b><br>'+
            '<b>SDG16- Peace and Justice <br>Strong Institutions<b><br>',
            align:'left',
            showarrow:false,
            xref:'paper',
            yref:'paper',
            x:1.14,
            y:0.8,
            
            bordercolor:'black',
            borderwidth:1}
        ]
          
        }

for (var i = 0; i <0; i +=1) {
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
        fillcolor:'#87ceeb',
        showlegend:false,
        hoverinfo:'none',
        line:{
            shape:'spline',
            color:'#87ceeb'
        },
        x:[-0.01,
            0.66 ,
            0.9,
            0.95,
            1.01, 
            
            1.01,
            1.01,
           0.98
            
             ] 
            ,
        y:[1.04,
            1.04 ,
            1.04,
            1.04,
            1.04 , 
            1.04,
            0,
 
],
        
    
        },
    
    {
    
        mode:'lines',
        fill: 'tozeroy',
        fillcolor:'#95cf95',
        showlegend:false,
        hoverinfo:'none',
        line:{
            shape:'spline',
            color:'#95cf95',
        },
        x:[-0.01,
            0.40692307692307694 ,
            0.8200000000000001,
            0.99,

            1.01,
            1.01,
            1.01,
            1.01,
            1.01
          
        ],
        y:[1,
            1,
            1 ,
            1,
            0.94,
            0.92,
            0.7,
            0.5,
            0

    ],
        
    
        },

    {
    
        mode:'lines',
        fill: 'tozeroy',
        fillcolor:'#ffbf86',
        showlegend:false,
        hoverinfo:'none',
        line:{
            shape:'spline',
            color:'#ffbf86',
        },
        x:[
            -0.01,
            0.6184615384615384 ,
            0.7384615384615386,
            0.7
        ],
        y:[
            0.8584615384615384 ,
            0.8584615384615384,
            0.8184615384615385,
            0
       ],
        
    
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
        x:
        [
            -0.01,
            0 ,
            0 ,
            0.08 ,
            0.8123076923076922 ,
            0.5923076923076923 ,
            0.4223076923076923 ,
            0.027692307692307683 ,
            0
        ],
        y:
        [
            0,
            0.2276923076923077 ,
            0,
            0 ,
            0,
            0.5823076923076922 ,
            0.6423076923076922 ,
            0.2676923076923077 ,
            0

        ]
        
    },

    
   
   
]
        
    
var dataPoints=[]

        
        dataPoints.push({
            mode: 'markers+text',
            
            marker:{
                size:3,
                color: '#87ceeb'
            },
            x:x,
            y:y,
            customdata:sgds,
            text:states,
                hovertemplate:template,
        
            showlegend:false,
            textfont : {
                family:'Times New Roman'
              },
              textposition: 'bottom bottom',
            
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
    },

   
]
plotData.push(zoneLine[0],zoneLine[1],zoneLine[2],zoneLine[3])

for(let i=0;i<dataPoints.length;i++){
    plotData.push(dataPoints[i])
}
for(let i=0;i<legends.length;i++){
    plotData.push(legends[i])
}

plotData.push(
    {
    type:'scatter',
    
    showlegend:false,
    
    line:{
        shape:'spline',
        color:'black'
    },
    hovertemplate:"%{x},%{y}"+"<extra></extra>",
    x:[0,
        0.52 ,   
        0.52 ,  
        0.8199999999999998 ,     
        1   ],
    y:[0,
        0.36000000000000004,
        0.6799999999999999,
        1,
        1
    ]
    
    }
)

/*for(let i=0;i<clusterTraces.length;i++){
data.push(
    {
        
        mode:'lines',        
        
        showlegend:false,
        line:{
            shape:'spline',
            
        },
        x:clusterTraces[i][0],
        y:clusterTraces[i][1],
        hoverinfo:'none'
    }
)}*/
Plotly.newPlot(myDiv, plotData, layout);

myDiv.on('plotly_click', function(data)
{   
    var stateName=data.points[0].text
    for(let i=0;i<clusterTraces[stateName].length;i++)
    {
        plotData.push(
            {
                
                mode:'lines',        
                
                showlegend:false,
                line:{
                    shape:'spline',
                },
                x:clusterTraces[stateName][i][0],
                y:clusterTraces[stateName][i][1],
                hoverinfo:'none'
            })
        
    }
    Plotly.react(myDiv, plotData, layout);

  //  func()
});


})

}

func()

b1.addEventListener('click',()=>{
    buttonState="2019.csv"
    var myDiv = document.getElementById('myDiv');
    plotData=[]
    
    func()
    })
    
    b2.addEventListener('click',()=>{
        buttonState="2020.csv"
        var myDiv = document.getElementById('myDiv');
        plotData=[]
        func()
        })
    b3.addEventListener('click',()=>{
        buttonState="2021.csv"
        var myDiv = document.getElementById('myDiv');
        plotData=[]
        func()
    })
var myDiv = document.getElementById('myDiv');




