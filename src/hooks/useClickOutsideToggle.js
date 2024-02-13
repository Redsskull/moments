import React, { useEffect, useRef } from "react";

const useClickOutsideToggle = () => {
    const [expanded, setExpanded] = React.useState(false);
    const ref = useRef(null);
    useEffect(() => {
      const checkIfClickedOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setExpanded(false);
        }
      };
      document.addEventListener("mouseup", checkIfClickedOutside);
      return () => {
        document.removeEventListener("mouseup", checkIfClickedOutside);
      };
    }, [ref]);

  return {expanded, setExpanded, ref};
    
}

export default useClickOutsideToggle
