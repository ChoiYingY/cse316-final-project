import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn || auth.isGuest){
        console.log("HomeScreen");
        return <HomeScreen />
    }
    else{
        console.log("SplashScreen");
        return <SplashScreen />
    }
}