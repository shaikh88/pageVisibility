import React, {useCallback, useRef} from "react";




export function usePageVisibility() {

  const [isVisible, setIsVisible] = React.useState(undefined);  
  const isMounted = useRef(false);

  const getBrowserVisibilityProp = useCallback(()=> {
    if (typeof document.hidden !== "undefined") {
      // Opera 12.10 and Firefox 18 and later support
      return "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      return "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      return "webkitvisibilitychange";
    }
  })
  
  const  getBrowserDocumentHiddenProp = useCallback(()=> {
    if (typeof document.hidden !== "undefined") {
      return "hidden";
    } else if (typeof document.msHidden !== "undefined") {
      return "msHidden";
    } else if (typeof document.webkitHidden !== "undefined") {
      return "webkitHidden";
    }
  })
  

  const getIsDocumentHidden = useCallback(()=> {
    return !document[getBrowserDocumentHiddenProp()];
  })

  const onVisibilityChange = () => {
    const isDocHidden = getIsDocumentHidden()
    setIsVisible(isDocHidden);
  }

  React.useEffect(() => {
    if(isMounted.current){
      const visibilityChange = getBrowserVisibilityProp();
      document.addEventListener(visibilityChange, onVisibilityChange, false);
    }else{
      isMounted.current = true;
      onVisibilityChange();
    }
    return () => {
      if(isMounted.current){
        const visibilityChange = getBrowserVisibilityProp();
        document.removeEventListener(visibilityChange, onVisibilityChange);
      }
    };
  },[]);

  return {isVisible};
}
