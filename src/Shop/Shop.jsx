import { Link } from "react-router-dom";
import 'tailwindcss/tailwind.css'
const Shop = () => {
    // welcoming page
    return(
        <>
            <p style={{textAlign: "center",fontSize:"50px",alignContent:"center"}}>Welcome to My Shopping App</p>
            <p style={{textAlign: "center",fontSize:"30px",alignContent:"center"}}><Link style={{textDecoration:"none",color:"blue"}} to="/products">Click here to see products</Link></p>
        </>
    )
}

export default Shop;