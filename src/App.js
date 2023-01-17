import React,{useState} from 'react'
import "./App.css";
import SidebarItem from './components/SidebarItem';
import Slider from './components/Slider';
import * as htmltoimage from "html-to-image";
import * as download from "downloadjs";


const DEFAULT_OPTIONS =[
  {
    name:"Brightness",
    property:"brightness",
    value:100,
    range:{
      min:0,
      max:200,
    },
    unit:"%",
   
  },
  {
    name:"Contrast",
    property:"contrast",
    value:100,
    range:{
      min:0,
      max:200,
    },
    unit:"%",
   
  },
  {
    name:"Saturation",
    property:"saturate",
    value:100,
    range:{
      min:0,
      max:200,
    },
    unit:"%",
   
  },
  {
    name:"Grayscale",
    property:"grayscale",
    value:0,
    range:{
      min:0,
      max:100,
    },
    unit:"%",
   
  },
  {
    name:"Sepia",
    property:"sepia",
    value:0,
    range:{
      min:0,
      max:100,
    },
    unit:"%",
   
  },
  {
    name:"Hue Rotate",
    property:"hue-rotate",
    value:0,
    range:{
      min:0,
      max:360,
    },
    unit:"deg",
   
  },
  {
    name:"Blur",
    property:"blur",
    value:0,
    range:{
      min:0,
      max:20,
    },
    unit:"px",
  },

]


export const App = () => {
  const [image ,setImage] =useState(null);
  const [options , setOptions]=useState(DEFAULT_OPTIONS)
  const [selectedindex , setSelectedindex] = useState(0)

  const selectOption = options[selectedindex];

  
  const handleChange = (event)=>{
    console.log(event.target.files[0]);
    const ObjectUrl = URL.createObjectURL(event.target.files[0]);
    setImage(ObjectUrl);
  };

  const applyfilters =()=>{
    const filters = options.map((option)=>{
      return `${option.property}(${option.value}${option.unit})`;
    });
    return {
      filter:filters.join(" "),
      backgroundImage : `url(${image})`,
      
    }
  };
  const sliderChange =({target})=>{
    setOptions((prevOptions)=>{
      return prevOptions.map((option,index)=>{
        if(index!==selectedindex) return option;
        return{...option,value:target.value};
      })
    })
  };

  const downloadImage =()=>{
    htmltoimage.toPng(document.getElementById('image')).then((dataurl)=>{
      download(dataurl,`${Date.now()}.png`)
    })

  };
  return (
    <div className='container'>
      {
        image ? (
        <div className='main-image' id='image' style={applyfilters()}/>
        ):(
        <div className='upload-image'>
          <h1>Photoshop Clone</h1>
          <label>
            Select image
          <input type="file" accept='image/*' onChange={handleChange}/>
          </label>
          
        </div>
        )}
        <div className='sidebar'>
          {
            options.map((option , index)=>{
              return (
                <SidebarItem 
                key={index} 
                name={option.name} 
                active={index===selectedindex} 
                handleClick ={()=> setSelectedindex(index)} />
              )
            })
          }
          <button onClick={downloadImage} className="download">Download</button>
        </div>
        <Slider 
        min={selectOption.range.min}
        max={selectOption.range.max} 
        value={selectOption.value}
        handleChange={sliderChange}
        />
    </div>
  )
}

export default App ;