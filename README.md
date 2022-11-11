# pageVisibility
page visibility hook for server side rendering react component


# import like below
import {usePageVisibility} from '../utils/isVisible';


# use guide

 const {isVisible} = usePageVisibility();
 
 
   useEffect(()=> {
   // your code here
    console.log({isVisible})
    
  } , [isVisible])
 
