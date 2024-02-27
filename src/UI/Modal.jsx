import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({children,open,className = '',onClose}) {
  const dialog = useRef();

  // useEffect(() => {
  //   // Using useEffect to sync the Modal component with the DOM Dialog API
  //   // This code will open the native <dialog> via it's built-in API whenever the <Modal> component is rendered
  //   const modal = dialog.current;
  //   modal.showModal();

  //   return () => {
  //     modal.close(); // needed to avoid error being thrown
  //   };
  // }, []);

  // return createPortal(
  //   <dialog className="modal" ref={dialog} onClose={onClose}>
  //     {children}
  //   </dialog>,
  //   document.getElementById('modal')
  // );

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    }
    if (!open) {
      dialog.current.close();
    }
  }, [open])
  // useEffect(()=>{
  //     const modal = dialog.current;

  //     if(open){
  //         modal.showModal();
  //     }
  //     return () => modal.close();
  // },[open]);

  return (
    createPortal(<dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>{children}</dialog>, document.getElementById('modal'))
  );
}
