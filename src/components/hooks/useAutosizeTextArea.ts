import { useEffect } from "react";


const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {

  useEffect(() => {
    if (textAreaRef) {
      // reset the height momentarily
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      // Then set the height directly, outside the render loop
      // if (textAreaRef != undefined) {
      textAreaRef.style.height = scrollHeight + "px";
      // }
    }
  }, [textAreaRef, value]);


}

export default useAutosizeTextArea;