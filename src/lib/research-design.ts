/** Illustrative fixtures for the design system; these are not research findings. */
export const researchDesign={
 version:'2.0',
 typography:{display:{desktop:56,mobile:36,weight:600},section:{desktop:36,mobile:28,weight:600},card:19,body:17,metadata:10},
 charts:{canvas:'#f1f3fc',coral:'#fd5638',graphite:'#2d3139',emerald:'#10b981',amber:'#f59e0b',water:'#0072b2',uncertaintyOpacity:.12,radarScenarioOpacity:.18,radarBaselineOpacity:.22},
 spectral:{vegetation:'#10b981',water:'#0072b2',thermal:'#fd5638',radar:'#6366f1'},
 analyticalGrid:{columns:16,gutter:24,unit:8,maxWidth:1760,mobileColumns:4},
 correlation:{variables:['NDVI','PRECIP','ALBEDO','SOIL M.','LST','BIOM.'],values:[[1,.78,-.64,.69,-.82,.89],[.78,1,-.52,.88,-.71,.74],[-.64,-.52,1,-.41,.67,-.58],[.69,.88,-.41,1,-.79,.61],[-.82,-.71,.67,-.79,1,-.86],[.89,.74,-.58,.61,-.86,1]]},
 temporal:[62,65,64,70,74,77,78,85].map((value,index)=>({period:index+1,value,lower:value-4,upper:value+4})),
 radar:{dimensions:['Governança','Água','Biodiversidade','Conformidade','Uso do solo','Carbono'],baseline:[54,68,42,65,70,58],scenario:[74,84,62,80,86,73]},
 density:{x:[0,10,20,30,40,50,60,70,80,90,100],series:[[0,.02,.1,.35,.7,1,.72,.38,.12,.02,0],[0,0,.01,.05,.2,.5,.85,1,.75,.3,0],[0,0,0,.02,.1,.25,.55,.82,1,.65,0]]},
} as const;
export const googleMapStyle=[
 {featureType:'water',elementType:'geometry',stylers:[{color:'#cad6e2'}]},
 {featureType:'landscape',elementType:'geometry',stylers:[{color:'#f4f5f8'}]},
 {featureType:'road',elementType:'geometry',stylers:[{color:'#e2e5ec'}]},
 {featureType:'road',elementType:'labels.text.fill',stylers:[{color:'#676a73'}]},
 {featureType:'poi',stylers:[{visibility:'off'}]},
 {featureType:'administrative',elementType:'geometry.stroke',stylers:[{color:'#a7a9b0'},{weight:.8}]},
];
export const mapLibreStyle={version:8,name:'Serra Research — illustrative cartography',sources:{territories:{type:'geojson',data:{type:'FeatureCollection',features:[{type:'Feature',properties:{demo:true},geometry:{type:'Polygon',coordinates:[[[-46.69,-23.59],[-46.68,-23.59],[-46.68,-23.58],[-46.69,-23.58],[-46.69,-23.59]]]}}]}}},layers:[{id:'canvas',type:'background',paint:{'background-color':'#f4f5f8'}},{id:'territory-fill',type:'fill',source:'territories',paint:{'fill-color':'#fd5638','fill-opacity':.15}},{id:'territory-outline',type:'line',source:'territories',paint:{'line-color':'#b83b24','line-width':1.5}}]};
export function researchDesignCsv(){
 const rows=[['example','dimension','series','value','lower','upper'],...researchDesign.correlation.values.flatMap((row,i)=>row.map((value,j)=>['correlation',researchDesign.correlation.variables[i],researchDesign.correlation.variables[j],value,'',''])),...researchDesign.temporal.map(row=>['temporal',row.period,'illustrative',row.value,row.lower,row.upper]),...researchDesign.radar.dimensions.flatMap((dimension,i)=>[['radar',dimension,'baseline',researchDesign.radar.baseline[i],'',''],['radar',dimension,'scenario',researchDesign.radar.scenario[i],'','']]),...researchDesign.density.series.flatMap((series,i)=>series.map((value,j)=>['density',researchDesign.density.x[j],`series-${i+1}`,value,'','']))];
 return '# Synthetic design examples; not scientific evidence\n'+rows.map(row=>row.map(value=>JSON.stringify(String(value))).join(',')).join('\n')+'\n';
}
