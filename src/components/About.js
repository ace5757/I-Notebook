import React  from 'react'
//import noteContext from '../context/notes/noteContext'


const About = () => {
  return (
    <div>
      This is about page   
    </div>
    )
  }
  
  export default About
  
  // const a = useContext(noteContext)        //using context api
  // //using useffect to call update function after our base page has rendered
  // useEffect(()=>{
    //    a.update()
    //    // eslint-disable-next-line
    // }, [])

    // const About = () => {
    //   return (
    //     <div>
    //       This is about {a.state.name} and he is in {a.state.class} class    
    //     </div>
    //     //accesing name from object
    //     )
    //   }