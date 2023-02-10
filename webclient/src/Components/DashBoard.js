import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function DashBoard() {
  let navigate=useNavigate();
  let storeObj=useSelector((store)=>{
   return store
  })
  // console.log(storeObj[1].data[0]);
  if(storeObj[1].type === true){
  }else{
    return navigate('/');
  }
  return (
    <div>
      <h1>Dash Board</h1>
      <h1>Welcom {storeObj[1].data[0].userName}</h1>
      <img src={storeObj[1].data[0].profilePic} alt='profile pic'></img>
    </div>
  )
}

export default DashBoard